import axios from "axios";

const apiConnection = axios.create({
    baseURL: "https://long-yak-baseball-cap.cyclic.app/api/"
});

export const getArticles = () => {
    return apiConnection
        .get("/articles?sort_by=article_id&order=desc")
        .then((response) => {
            return response.data.articles;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const getTopics = () => {
    return apiConnection.get("/topics").then(({ data: { topics } }) => {
        return topics;
    });
};
