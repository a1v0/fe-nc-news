import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addVoteToComment, getComments } from "../api";

export default function Comments({ article_id }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments(article_id).then((comments) => {
            setComments(comments);
            console.log(comments);
        });
    }, [article_id]);

    const [commentError, setCommentError] = useState({});
    const ErrorMessage = () => {
        return (
            <div className="ErrorMessage">
                <div>❗</div>
                <p>Whoopsie! Something went wrong. Please try again.</p>
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

    return (
        <div className="Comments">
            <h2>Have your say!</h2>
            <ul>
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
                        elapsedTimeString = `${Math.floor(elapsedDays)} day${
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
                                        handleVote(comment.comment_id, true);
                                    }}
                                >
                                    ⬆️like
                                </Link>
                                <Link
                                    onClick={() => {
                                        --comment.votes;
                                        handleVote(comment.comment_id, false);
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
        </div>
    );
}
