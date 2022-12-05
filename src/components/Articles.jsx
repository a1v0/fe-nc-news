import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import PlaceholderImage from "../misc/elementor-placeholder-image.jpg";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        getArticles().then((articles) => {
            setArticles(articles);
        });
    }, []);
    return (
        <ul className="Articles">
            {articles.map((article) => {
                return (
                    <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
                            <img src={PlaceholderImage} alt="placeholder" />
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
            })}
        </ul>
    );
}
