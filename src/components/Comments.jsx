import React, { useEffect, useState } from "react";
import { getComments } from "../api";

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
                    const timeStamp = new Date(comment.created_at);
                    return (
                        <li key={comment.comment_id}>
                            <p className="comment">{comment.body}</p>
                            <p className="details">
                                {comment.author} at{" "}
                                {timeStamp.toLocaleDateString()}
                            </p>
                            <div className="upvotes">⬆️</div>
                            <div className="downvotes">⬇️</div>
                            <p className="details">{comment.votes} votes</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
