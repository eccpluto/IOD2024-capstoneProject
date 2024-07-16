import { createContext, useContext, useEffect, useState } from "react";
import { UserDataService } from "../services";
import useMongoDb from "../hooks/useMongoDb";

// instantiate a context object
const UserContext = createContext();

// describe how context is used by providing an interface
export const UserProvider = (props) => {

    // track currently authenticated user (defaults to and empty string, no user authenticated)
    const [user, setUser] = useState({ email: '', password: '' });
    // authentication flag
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // hook into user collection, which the developer can alter http methods and endpoints via setEndpointConfig
    const [dbResult, setEndpointConfig] = useMongoDb(`http://localhost:8080/api/users`);

    // once the database returns a result, check try authenticate the user against it
    useEffect(() => {
        console.log('doing a useEffect')
        console.log(JSON.stringify(user));

        // if we have a result conforming to the users emial, we have authentication
        if (dbResult.data && dbResult.data.email == user.email) {
            console.log(`setting is authenticated from userContext:`);
            setIsAuthenticated(true);

        } else {
            console.log(`setting NOTE is authenticated from userContext:`);
            setIsAuthenticated(false);

        };
    }, [dbResult]);

    // begin the authentication process
    const handleAuthenticateUser = ({ email, password }, callback = null) => {
        // clear errorLog
        setErrorLog({ message: '' });
        // logout condition
        if (!email && !password) {
            setUser({ email: '', password: '' });
            if (callback) {
                callback('Logged out');
            }
            return;
        }
        try {
            console.log(`querying database for user:\n ${email}`);
            callback('Logging in..')
            // setup database query, on re-render tryAuthenticateUser will run
            setEndpointConfig('get', `http://localhost:8080/api/users?email=email&password=password`);
            // store user email
            setUser({ email: email });
        } catch (e) {
            console.error(`Issue authenticating user: ${e}`);
            if (callback) {
                callback(`${e}`);
            }
        }
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, handleAuthenticateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}