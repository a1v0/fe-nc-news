import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../api";

export default function Articles() {
    const { topic_id } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticles(topic_id).then((articles) => {
            setArticles(articles);
        });
    }, [topic_id]);

    useEffect(() => {
        setIsLoading(false);
    }, [articles]);

    return (
        <ul className="Articles">
            {!isLoading ? (
                articles.map((article) => {
                    return (
                        <li key={article.article_id}>
                            <Link to={`/articles/${article.article_id}`}>
                                <img
                                    src="https://picsum.photos/600/350"
                                    alt="randomly generated image"
                                />
                                <br />
                                <strong>{article.title}</strong> <i>by</i>{" "}
                                {article.author}
                                <br />
                                <span className="Articles--topic">
                                    #{article.topic}
                                </span>
                            </Link>
                        </li>
                    );
                })
            ) : (
                <p>Loading articles...</p>
            )}
        </ul>
    );
}
