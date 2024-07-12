import { createContext, useContext, useState } from "react";

// instantiate a context object
const UserContext = createContext();

// describe how context is used by providing an interface
export const UserProvider = (props) => {

    // track currently authenticated user
    const [user, setUser] = useState({});

    // check credentials against user database
    function authenticateUser({ email, password }) {
        // if user exists and password correct, return true
        // everything else is false, should throw error here and pass upto
        // handleAuthenticateUser try catch block
        return false;
    }

    // try authenticate the user when logging in
    const handleAuthenticateUser = ({ email, password }) => {
        try {
            if (authenticate({ email, password })) {
                setUser({
                    // email uniquely identifies user
                    email: email
                })
            };
        } catch (e) {
            console.error(`Unable to authenticate user: ${e}`);
        }
    }

    return (
        <UserContext.Provider value={{ user, handleAuthenticateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}