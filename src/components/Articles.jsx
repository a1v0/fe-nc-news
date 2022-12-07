import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../api";
import cookingPhoto from "../misc/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg";
import codingPhoto from "../misc/markus-spiske-cvBBO4PzWPg-unsplash.jpg";
import footballPhoto from "../misc/thomas-serer-r-xKieMqL34-unsplash.jpg";

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
                        <li key={article.article_id}>
                            <Link to={`/articles/${article.article_id}`}>
                                <img src={photoSrc} alt={photoAlt} />
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
