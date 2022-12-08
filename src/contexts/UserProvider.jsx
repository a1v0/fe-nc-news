import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialLoggedInState =
        Object.keys(JSON.parse(window.sessionStorage.loggedInUser)).length === 0
            ? null
            : JSON.parse(window.sessionStorage.loggedInUser);
    const [loggedInUser, setLoggedInUser] = useState(initialLoggedInState);

    useEffect(() => {
        if (loggedInUser === null) {
            window.sessionStorage.loggedInUser = JSON.stringify({});
        } else {
            window.sessionStorage.loggedInUser = JSON.stringify(loggedInUser);
        }
    }, [loggedInUser]);
    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
