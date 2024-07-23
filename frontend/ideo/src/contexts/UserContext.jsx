import { createContext, useContext, useEffect, useRef, useState } from "react";
import useMongoDb from "../hooks/useMongoDb";

// instantiate a context object
const UserContext = createContext();

export const UserProvider = (props) => {
    // default on first call is no user - this will persist with another user
    // if logged in for that session.

    const tempUser = {
        id: 1234,
        email: "tony@testuser.com",
        name: "Tony the Tiger",
        theme: "Light"
    }

    const [user, setUser] = useState(null);

    const handleUpdateUser = (user) => {
        user ?
            setUser({       // user provided (login)
                id: user._ud,
                email: user.email,
                name: user.name,
                theme: user.theme,
            }               // empty user (logout)
            ) : setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}