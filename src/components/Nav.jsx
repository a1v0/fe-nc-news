import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";
import { UserContext } from "../contexts/UserProvider";

export default function Nav() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getTopics().then((topics) => {
            setTopics(topics);
        });
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [topics]);

    return (
        <div className="Nav">
            {!isLoading ? (
                <ul>
                    {topics.map((topic) => {
                        return (
                            <li key={topic.slug}>
                                <Link to={`/topics/${topic.slug}`}>
                                    {topic.slug}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
            {!loggedInUser ? (
                <div>
                    <Link to="/user/login">Login or Sign Up!</Link>
                </div>
            ) : (
                <div className="user-greeting">
                    <p>
                        What-ho, {loggedInUser.name}!<br />(
                        <Link
                            onClick={() => {
                                setLoggedInUser(null);
                            }}
                        >
                            Log out
                        </Link>
                        )
                    </p>
                    <img
                        src={loggedInUser.avatar_url}
                        className="avatar"
                        alt={`${loggedInUser.name}'s avatar`}
                    />
                </div>
            )}
        </div>
    );
}
