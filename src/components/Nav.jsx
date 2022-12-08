import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getTopics } from "../api";
import { UserContext } from "../contexts/UserProvider";

export default function Nav() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getTopics()
            .then((topics) => {
                setTopics(topics);
            })
            .catch((err) => {
                console.log("ERROR!", err);
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
                                <NavLink
                                    to={`/topics/${topic.slug}`}
                                    className={({ isActive }) => {
                                        return isActive ? "selected-topic" : "";
                                    }}
                                >
                                    {topic.slug}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
            {!loggedInUser ? (
                <div className="sign-up-link">
                    <Link to="/user/login">Login / Sign Up</Link>
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
