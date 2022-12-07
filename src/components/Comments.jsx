import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    addVoteToComment,
    deleteComment,
    getComments,
    postComment
} from "../api";
import { UserContext } from "../contexts/UserProvider";

export default function Comments({ article_id }) {
    const { loggedInUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        getComments(article_id).then((comments) => {
            comments = comments.map((comment) => {
                comment.voteLimiter = 0; // used to prevent a user from up/downvoting by more than one per load
                return comment;
            });
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
        if (event.target[0].value) {
            event.target[1].disabled = true;
            postComment(article_id, {
                article_id,
                body: event.target[0].value,
                username: loggedInUser.username
            }).then((comment) => {
                comment.created_at = Date.now();
                comment.voteLimiter = 0;
                const updatedComments = [comment, ...comments];
                setComments(updatedComments);
                event.target[0].value = "";
                event.target[1].disabled = false;
            });
        }
    };

    const handleDelete = (comment_id) => {
        deleteComment(comment_id).then(() => {
            const updatedComments = comments.filter((comment) => {
                return comment.comment_id !== comment_id;
            });
            setComments(updatedComments);
        });
    };

    return (
        <div className="Comments">
            <h2>Have your say!</h2>
            {!isLoading ? (
                <ul>
                    <li>
                        {!loggedInUser ? (
                            <p>
                                You must be{" "}
                                <Link to="/user/login">
                                    <strong>logged in</strong>
                                </Link>{" "}
                                to post a comment.
                            </p>
                        ) : (
                            <form
                                onSubmit={(event) => {
                                    handleSubmit(event);
                                }}
                            >
                                <textarea placeholder="Add a comment..."></textarea>
                                <button type="submit">Add Comment</button>
                            </form>
                        )}
                    </li>
                    {comments.map((comment) => {
                        const elapsedTime = Date.now() - comment.created_at;
                        const elapsedDays = elapsedTime / 86400000; // amount of milliseconds in a day
                        let elapsedTimeString = "";
                        if (elapsedDays > 365) {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays / 365
                            )} year${
                                Math.floor(elapsedDays / 365) > 1 ? "s" : ""
                            } ago`;
                        } else if (elapsedDays < 1) {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays / 24
                            )} hour${
                                Math.floor(elapsedDays / 24) !== 1 ? "s" : ""
                            } ago`;
                        } else {
                            elapsedTimeString = `${Math.floor(
                                elapsedDays
                            )} day${
                                Math.floor(elapsedDays) !== 1 ? "s" : ""
                            } ago`;
                        }

                        return (
                            <li key={comment.comment_id}>
                                <p className="title">
                                    <strong>{comment.author}</strong>,{" "}
                                    {elapsedTimeString}
                                    {loggedInUser?.username ===
                                    comment.author ? (
                                        <Link
                                            className="delete"
                                            onClick={() => {
                                                handleDelete(
                                                    comment.comment_id
                                                );
                                            }}
                                        >
                                            [delete]
                                        </Link>
                                    ) : null}
                                </p>
                                <p className="comment">{comment.body}</p>
                                <div className="votes">
                                    <Link
                                        className={
                                            comment.voteLimiter === 1
                                                ? "voted"
                                                : null
                                        }
                                        onClick={() => {
                                            if (comment.voteLimiter < 1) {
                                                ++comment.voteLimiter;
                                                ++comment.votes;
                                                handleVote(
                                                    comment.comment_id,
                                                    true
                                                );
                                            } else if (
                                                comment.voteLimiter === 1
                                            ) {
                                                --comment.voteLimiter;
                                                --comment.votes;
                                                handleVote(
                                                    comment.comment_id,
                                                    false
                                                );
                                            }
                                        }}
                                    >
                                        ⬆️like
                                        {comment.voteLimiter === 1 ? "d" : ""}
                                    </Link>
                                    <Link
                                        className={
                                            comment.voteLimiter === -1
                                                ? "voted"
                                                : null
                                        }
                                        onClick={() => {
                                            if (comment.voteLimiter > -1) {
                                                --comment.voteLimiter;
                                                --comment.votes;
                                                handleVote(
                                                    comment.comment_id,
                                                    false
                                                );
                                            } else if (
                                                comment.voteLimiter === -1
                                            ) {
                                                ++comment.voteLimiter;
                                                ++comment.votes;
                                                handleVote(
                                                    comment.comment_id,
                                                    true
                                                );
                                            }
                                        }}
                                    >
                                        ⬇️dislike
                                        {comment.voteLimiter === -1 ? "d" : ""}
                                    </Link>
                                    <p>
                                        {comment.votes} vote
                                        {comment.votes === 1 ? "" : "s"}
                                    </p>
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
