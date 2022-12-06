import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import PlaceholderImage from "../misc/elementor-placeholder-image.jpg";
import Comments from "./Comments";

export default function Article() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        getArticle(article_id).then((article) => {
            setArticle(article);
        });
    }, [article_id]);

    return (
        <>
            <article className="Article">
                <h1>{article.title}</h1>
                <div className="author-and-topic">
                    <p>
                        <strong>&mdash; {article.author}</strong> (author)
                    </p>
                    <p>#{article.topic}</p>
                </div>
                <section>
                    <img src={PlaceholderImage} alt="placeholder" />
                    <p className="article-body">{article.body}</p>
                </section>
            </article>
            <Comments article_id={article_id} />
        </>
    );
}
