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
                    return <li>{comment.author}</li>;
                })}
            </ul>
        </div>
    );
}
