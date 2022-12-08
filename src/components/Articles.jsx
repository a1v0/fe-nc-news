import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import cookingPhoto from "../misc/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg";
import codingPhoto from "../misc/markus-spiske-cvBBO4PzWPg-unsplash.jpg";
import footballPhoto from "../misc/thomas-serer-r-xKieMqL34-unsplash.jpg";
import placeholderPhoto from "../misc/elementor-placeholder-image.jpg";
import NotFound from "./NotFound";

export default function Articles() {
    const { topic_id } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortParams, setSortParams] = useSearchParams();
    const [isContentNotFound, setIsContentNotFound] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const sortCriterion = sortParams.get("sort");
        const sortOrder = sortParams.get("order");
        getArticles(topic_id, undefined, sortCriterion, sortOrder).then(
            (articles) => {
                if (articles) {
                    setIsContentNotFound(false);
                    // articles only set if an articles object is passed. Any other response would be some sort of error
                    setArticles(articles);
                } else {
                    setIsContentNotFound(true);
                }
            }
        );
        setCorrectSortSelectorIndex(sortCriterion, sortOrder);
    }, [topic_id, sortParams]);

    useEffect(() => {
        setIsLoading(false);
    }, [articles]);

    const setCorrectSortSelectorIndex = (sortCriterion, sortOrder) => {
        if (!sortCriterion) {
            ref.current.selectedIndex = 0;
        } else {
            for (let i = 1; i < ref.current.length; ++i) {
                const currentValue = JSON.parse(ref.current[i].value);
                if (
                    currentValue.sort_by === sortCriterion &&
                    currentValue.order === sortOrder
                ) {
                    ref.current.selectedIndex = i;
                    break;
                }
                ref.current.selectedIndex = 0;
            }
        }
        return;
    };

    const handleSort = (event) => {
        if (event.target.value) {
            const selectedItem = JSON.parse(event.target.value);
            setSortParams({
                sort: selectedItem.sort_by,
                order: selectedItem.order
            });
        }
    };

    return (
        <main className="Articles">
            <select onChange={handleSort} ref={ref}>
                <option value="">Sort articles by...</option>
                <option
                    value={JSON.stringify({
                        sort_by: "created_at",
                        order: "asc"
                    })}
                >
                    Date (ascending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "created_at",
                        order: "desc"
                    })}
                >
                    Date (descending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "title",
                        order: "asc"
                    })}
                >
                    Title (ascending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "title",
                        order: "desc"
                    })}
                >
                    Title (descending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "author",
                        order: "asc"
                    })}
                >
                    Author (ascending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "author",
                        order: "desc"
                    })}
                >
                    Author (descending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "comment_count",
                        order: "asc"
                    })}
                >
                    Comments (ascending)
                </option>
                <option
                    value={JSON.stringify({
                        sort_by: "comment_count",
                        order: "desc"
                    })}
                >
                    Comments (descending)
                </option>
            </select>
            <ul>
                {!isLoading ? (
                    isContentNotFound ? (
                        <NotFound missingPiece="topic" />
                    ) : (
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
                                    photoSrc = footballPhoto;
                                    photoAlt = "football stadium";
                                    break;
                                default:
                                    photoSrc = placeholderPhoto;
                                    photoAlt = "placeholder";
                                    break;
                            }
                            return (
                                <li key={article.article_id}>
                                    <Link
                                        to={`/articles/${article.article_id}`}
                                    >
                                        <img src={photoSrc} alt={photoAlt} />
                                        <br />
                                        <strong>{article.title}</strong>{" "}
                                        <i>by</i> {article.author}
                                        <br />
                                        <span className="Articles--topic">
                                            #{article.topic}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })
                    )
                ) : (
                    <p>Loading articles...</p>
                )}
            </ul>
        </main>
    );
}
