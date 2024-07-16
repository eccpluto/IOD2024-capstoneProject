import { createContext, useContext, useEffect, useRef, useState } from "react";
import useMongoDb from "../hooks/useMongoDb";

// instantiate a context object
const UserContext = createContext();

// describe how context is used by providing an interface
export const UserProvider = (props) => {

    const [user, setUser] = useState({ email: '', password: '' });                          // track authenticating user
    // const [isAuthenticated, setIsAuthenticated] = useState(false);                       // authentication flag
    const [dbResult, setEndpointConfig] = useMongoDb("http://localhost:8080/api/users");    // hook into user collection
    const isAuthorisedCallback = useRef(() => {return;});                                   // store a callback to report on authorisation, function stub here to avoid error

    // once the database returns a result, check try authenticate the user against it
    useEffect(() => {
        // if we have a result conforming to the users email, we have authentication
        if (dbResult.data && dbResult.data.email == user.email) {
            isAuthorisedCallback.current(true);

        } else {
            isAuthorisedCallback.current(false);
        };
    }, [dbResult]);

    // begin the authentication process
    const handleAuthenticateUser = ({ email, password }, authorisationCallback, messageCallback = null) => {
        // logout condition
        if (!email && !password) {
            setUser({ email: '', password: '' });
            if (messageCallback) {
                messageCallback('Logged out');
            }
            return;
        }
        try {
            console.log(`querying database for user:\n ${email}`);
            messageCallback('Logging in..')
            // ref to callback to be called on re-render after dbResult returns
            isAuthorisedCallback.current = authorisationCallback;
            // setup database query, on re-render tryAuthenticateUser will run
            setEndpointConfig('get', `http://localhost:8080/api/users?email=${email}&password=${password}`);
            // store user email
            setUser({ email: email });
        } catch (e) {
            console.error(`Issue authenticating user: ${e}`);
            if (messageCallback) {
                messageCallback(`${e}`);
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