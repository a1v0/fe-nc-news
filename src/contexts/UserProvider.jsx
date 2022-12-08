import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // console.log(JSON.parse(window.sessionStorage.loggedInUser));
    // const initialLoggedInState = Object.keys(window.sessionStorage.loggedInUser)
    //     .length
    //     ? JSON.parse(window.sessionStorage.loggedInUser)
    //     : null;
    // const [loggedInUser, setLoggedInUser] = useState(initialLoggedInState);
    const [loggedInUser, setLoggedInUser] = useState(null);

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
