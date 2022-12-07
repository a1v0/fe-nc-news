import axios from "axios";

const apiConnection = axios.create({
    baseURL: "https://long-yak-baseball-cap.cyclic.app/api/"
});

export const getArticles = (topic_id) => {
    return apiConnection
        .get("/articles?sort_by=article_id&order=desc&limit=11", {
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
            return article;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const getTopics = () => {
    return apiConnection
        .get("/topics")
        .then(({ data: { topics } }) => {
            return topics;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const getComments = (article_id) => {
    return apiConnection
        .get(`/articles/${article_id}/comments`)
        .then(({ data: { comments } }) => {
            return comments;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const postComment = (article_id, comment) => {
    return apiConnection
        .post(`/articles/${article_id}/comments`, comment)
        .then(({ data: { comment } }) => {
            return comment;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const addVoteToComment = (comment_id, isUpvote) => {
    const inc_votes = isUpvote ? 1 : -1;
    return apiConnection
        .patch(`comments/${comment_id}`, { inc_votes })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};

export const getUsers = () => {
    return apiConnection
        .get("/users")
        .then(({ data: { users } }) => {
            return users;
        })
        .catch((err) => {
            console.log("ERROR!", err);
        });
};
