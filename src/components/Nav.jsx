import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";

export default function Nav() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
            setIsLoading(false);
        });
    }, []);

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
            <div>
                User stuff (show login/signin if not logged in, otherwise user
                menu)
            </div>
        </div>
    );
}
