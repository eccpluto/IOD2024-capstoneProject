import { createContext, useContext, useState } from "react";

// instantiate a context object
const UserContext = createContext();

// describe how context is used by providing an interface
export const UserProvider = (props) => {

    // track currently authenticated user (default to no user logged in)
    const [user, setUser] = useState({ email: '' });
    // pass errors like user not found etc, to context consumer
    const [errorLog, setErrorLog] = useState({ message: '' });

    // check credentials against user database
    function authenticateUser({ email, password }) {
        // if user exists and password correct, return true
        // everything else is false, should throw error here and pass upto
        // handleAuthenticateUser try catch block
        // throw "Houston, we hjave a prokblems";
        return true;
    }

    // try authenticate the user when logging in
    const handleAuthenticateUser = ({ email, password }, callback = null) => {
        //clear errorLog
        setErrorLog({ message: '' });
        // logout condition
        if (!email && !password) {
            setUser({ email: '' });
            if(callback){
                callback('Logged out');
            }
            return;
        }
        try {
            console.log(`authenticating user:\n ${user}`)
            if (authenticateUser({ email, password })) {
                setUser({
                    // email uniquely identifies user
                    email: email
                })
                if(callback) {
                    callback('Successfully logged in.')
                }
            };
        } catch (e) {
            console.error(`Unable to authenticate user: ${e}`);
            if(callback) {
                callback(`${e}`);
            }
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