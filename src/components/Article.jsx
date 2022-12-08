import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, getArticles } from "../api";
import Comments from "./Comments";
import cookingPhoto from "../misc/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg";
import codingPhoto from "../misc/markus-spiske-cvBBO4PzWPg-unsplash.jpg";
import footballPhoto from "../misc/thomas-serer-r-xKieMqL34-unsplash.jpg";
import placeholderPhoto from "../misc/elementor-placeholder-image.jpg";

export default function Article() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticle(article_id)
            .then((article) => {
                setArticle(article);
                return article;
            })
            .then((article) => {
                return getArticles(article.topic, 4);
            })
            .then((articles) => {
                setRelatedArticles(articles);
            });
    }, [article_id]);

    useEffect(() => {
        setIsLoading(false);
    }, [article]);

    let photoSrc, photoAlt;
    switch (article.topic) {
        case "cooking":
            photoSrc = cookingPhoto;
            photoAlt = "colourful cookery";
            break;
        case "coding":
            photoSrc = codingPhoto;
            photoAlt = "messy computer code";
            break;
        case "football":
            photoSrc = footballPhoto;
            photoAlt = "football stadium";
            break;
        default:
            photoSrc = placeholderPhoto;
            photoAlt = "placeholder";
            break;
    }

    return (
        <main className="article-parent">
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
                            <img src={photoSrc} alt={photoAlt} />
                            <p className="article-body">{article.body}</p>
                        </section>
                    </>
                ) : (
                    <p>Loading article...</p>
                )}
                {!isLoading ? (
                    <aside className="related-content">
                        <h2>Related Content</h2>
                        <ul>
                            {relatedArticles.map((relatedArticle) => {
                                if (
                                    relatedArticle.article_id ===
                                    Number(article_id)
                                ) {
                                    return null;
                                }

                                return (
                                    <li key={relatedArticle.article_id}>
                                        <Link
                                            to={`/articles/${relatedArticle.article_id}`}
                                        >
                                            {relatedArticle.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>
                ) : (
                    <p>Loading related content...</p>
                )}
            </article>
            <Comments article_id={article_id} />
        </main>
    );
}
