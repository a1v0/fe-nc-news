import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import cookingPhoto from "../misc/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg";
import codingPhoto from "../misc/markus-spiske-cvBBO4PzWPg-unsplash.jpg";
import footballPhoto from "../misc/thomas-serer-r-xKieMqL34-unsplash.jpg";

export default function Articles() {
    const { topic_id } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortParams, setSortParams] = useSearchParams();

    const ref = useRef(null);

    useEffect(() => {
        const sortCriterion = sortParams.get("sort");
        const sortOrder = sortParams.get("order");
        getArticles(topic_id, undefined, sortCriterion, sortOrder).then(
            (articles) => {
                setArticles(articles);
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
        } else if (!sortOrder || sortOrder === "asc") {
            if (sortCriterion === "created_at") {
                ref.current.selectedIndex = 1;
            } else if (sortCriterion === "title") {
                ref.current.selectedIndex = 3;
            } else if (sortCriterion === "author") {
                ref.current.selectedIndex = 5;
            } else {
                ref.current.selectedIndex = 0;
            }
        } else if (sortOrder === "desc") {
            if (sortCriterion === "created_at") {
                ref.current.selectedIndex = 2;
            } else if (sortCriterion === "title") {
                ref.current.selectedIndex = 4;
            } else if (sortCriterion === "author") {
                ref.current.selectedIndex = 6;
            } else {
                ref.current.selectedIndex = 0;
            }
        }
    };

    const handleSort = (event) => {
        const selectedItem = event.target.value;
        const sortOrder = selectedItem.includes("ascending") ? "asc" : "desc";
        let sortCriterion;

        switch (selectedItem.split(" ")[0]) {
            case "Date":
                sortCriterion = "created_at";
                break;
            case "Title":
                sortCriterion = "title";
                break;
            case "Author":
                sortCriterion = "author";
                break;
            default:
                break;
        }

        setSortParams({
            sort: sortCriterion,
            order: sortOrder
        });
    };

    return (
        <main className="Articles">
            <select onChange={handleSort} ref={ref}>
                <option>Sort articles by...</option>
                <option>Date (ascending)</option>
                <option>Date (descending)</option>
                <option>Title (ascending)</option>
                <option>Title (descending)</option>
                <option>Author (ascending)</option>
                <option>Author (descending)</option>
            </select>
            <ul>
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
        </main>
    );
}
