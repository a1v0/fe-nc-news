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
                                        addVoteToComment(
                                            comment.comment_id,
                                            true
                                        );
                                    }}
                                >
                                    ⬆️like
                                </Link>
                                <Link
                                    onClick={() => {
                                        addVoteToComment(
                                            comment.comment_id,
                                            false
                                        );
                                    }}
                                >
                                    ⬇️dislike
                                </Link>
                                <p>{comment.votes} votes</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
