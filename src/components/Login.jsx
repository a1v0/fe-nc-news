import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api";

export default function Login() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [users]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoggedInUser(users[event.target[0].options.selectedIndex]);
    };

    return (
        <article className="Login">
            <h2>Are you already a user?</h2>
            {!isLoading ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Select your username:
                        <br />
                        <select>
                            {users.map((user) => {
                                return (
                                    <option key={user.username}>
                                        {user.username} &ndash; {user.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    <button type="submit">Log In!</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}

            <h2>Wanna sign up?</h2>
            <p>
                [currently you cannot sign up because our API hasn't got a
                suitable endpoint]
            </p>
        </article>
    );
}
