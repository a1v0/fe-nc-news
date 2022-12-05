import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";

export default function Article() {
    const { article_id } = useParams();

    useEffect(() => {
        getArticle(article_id);
    }, [article_id]);

    return <div className="Article">Article</div>;
}
