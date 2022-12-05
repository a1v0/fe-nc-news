import axios from "axios";

const apiConnection = axios.create({
    baseURL: "https://long-yak-baseball-cap.cyclic.app/api/"
});

export const getArticles = (topic_id) => {
    return apiConnection
        .get("/articles?sort_by=article_id&order=desc", {
            params: { topic: topic_id }
        })
        .then(({ data: { articles } }) => {
            return articles;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const getArticle = (article_id) => {
    return apiConnection
        .get(`/articles/${article_id}`)
        .then(({ data: { article } }) => {
            console.log(article);
        });
};

export const getTopics = () => {
    return apiConnection.get("/topics").then(({ data: { topics } }) => {
        return topics;
    });
};
