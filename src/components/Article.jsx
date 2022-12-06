import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import PlaceholderImage from "../misc/elementor-placeholder-image.jpg";
import Comments from "./Comments";

export default function Article() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticle(article_id).then((article) => {
            setArticle(article);
        });
    }, [article_id]);

    useEffect(() => {
        setIsLoading(false);
    }, [article]);

    return (
        <>
            <article className="Article">
                {!isLoading ? (
                    <>
                        <h1>{article.title}</h1>
                        <div className="author-and-topic">
                            <p>
                                <strong>&mdash; {article.author}</strong>{" "}
                                (author)
                            </p>
                            <p>#{article.topic}</p>
                        </div>
                        <section>
                            <img src={PlaceholderImage} alt="placeholder" />
                            <p className="article-body">{article.body}</p>
                        </section>
                    </>
                ) : (
                    <p>Loading article...</p>
                )}
            </article>
            <Comments article_id={article_id} />
        </>
    );
}
