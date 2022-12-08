import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api";

export default function Login() {
    const { setLoggedInUser } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getUsers()
            .then((users) => {
                setUsers(users);
            })
            .catch((err) => {
                console.log("ERROR!", err);
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
        <>
            <h1 className="Login">Log in to AVC News</h1>
            <article className="Login">
                <section>
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
                                                {user.username} &ndash;{" "}
                                                {user.name}
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
                </section>
                <section>
                    <h2>Wanna sign up?</h2>
                    <p>
                        Signing up gives you full membership benefits, including
                        being able to post comments.
                    </p>
                    <p>
                        [currently you cannot sign up because our API hasn't got
                        a suitable endpoint]
                    </p>
                </section>
            </article>
        </>
    );
}
