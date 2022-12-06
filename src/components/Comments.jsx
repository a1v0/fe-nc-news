import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addVoteToComment, getComments, postComment } from "../api";

export default function Comments({ article_id }) {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        getComments(article_id).then((comments) => {
            setComments(comments);
        });
    }, [article_id]);

    useEffect(() => {
        setIsLoading(false);
    }, [comments]);

    const [commentError, setCommentError] = useState({});
    const ErrorMessage = () => {
        return (
            <div className="ErrorMessage">
                <div>❗</div>
                <p>
                    Whoopsie! Something went wrong. Please try again. (You may
                    be overloading the server with too many votes.)
                </p>
            </div>
        );
    };

    const handleVote = (comment_id, isUpvote) => {
        addVoteToComment(comment_id, isUpvote)
            .then(() => {
                const updatedCommentError = { ...commentError };
                updatedCommentError[comment_id] = false;
                setCommentError(updatedCommentError);
            })
            .catch(() => {
                const updatedCommentError = { ...commentError };
                updatedCommentError[comment_id] = true;
                setCommentError(updatedCommentError);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postComment(article_id, {
            article_id,
            body: event.target[0].value
            // username
        });
    };

    return (
        <div className="Comments">
            <h2>Have your say!</h2>
            {!isLoading ? (
                <ul>
                    <li>
                        <form
                            onSubmit={(event) => {
                                handleSubmit(event);
                            }}
                        >
                            <textarea></textarea>
                            <button type="submit">Post Comment</button>
                        </form>
                    </li>
                    {comments.map((comment) => {
                        const elapsedTime = Date.now() - comment.created_at;
                        const elapsedDays = elapsedTime / 86400000; // amount of milliseconds in a day
                        let elapsedTimeString = "";
                        if (elapsedDays > 365) {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays / 365
                            )} year${
                                Math.floor(elapsedDays / 365) > 1 ? "s" : null
                            } ago`;
                        } else if (elapsedDays < 1) {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays / 24
                            )} hour${
                                Math.floor(elapsedDays / 24) > 1 ? "s" : null
                            } ago`;
                        } else {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays
                            )} day${
                                Math.floor(elapsedDays) > 1 ? "s" : null
                            } ago`;
                        }

                        return (
                            <li key={comment.comment_id}>
                                <p className="title">
                                    <strong>{comment.author}</strong>,{" "}
                                    {elapsedTimeString}
                                </p>
                                <p className="comment">{comment.body}</p>
                                <div className="votes">
                                    <Link
                                        onClick={() => {
                                            ++comment.votes;
                                            handleVote(
                                                comment.comment_id,
                                                true
                                            );
                                        }}
                                    >
                                        ⬆️like
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            --comment.votes;
                                            handleVote(
                                                comment.comment_id,
                                                false
                                            );
                                        }}
                                    >
                                        ⬇️dislike
                                    </Link>
                                    <p>{comment.votes} votes</p>
                                </div>
                                {commentError[comment.comment_id] ? (
                                    <ErrorMessage />
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading comments...</p>
            )}
        </div>
    );
}
