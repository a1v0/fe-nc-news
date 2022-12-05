import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";

export default function Nav() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
        });
    }, []);

    return (
        <div className="Nav">
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
            <div>
                User stuff (show login/signin if not logged in, otherwise user
                menu)
            </div>
        </div>
    );
}
