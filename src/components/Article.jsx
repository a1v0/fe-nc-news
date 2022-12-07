import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import Comments from "./Comments";
import cookingPhoto from "../misc/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg";
import codingPhoto from "../misc/markus-spiske-cvBBO4PzWPg-unsplash.jpg";
import footballPhoto from "../misc/thomas-serer-r-xKieMqL34-unsplash.jpg";

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
        // if anything goes awry, the default will render a football photo
        default:
            photoSrc = footballPhoto;
            photoAlt = "football stadium";
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
            </article>
            <Comments article_id={article_id} />
        </main>
    );
}
