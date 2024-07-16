import axios from "axios";
import { useEffect, useReducer, useState } from "react";

// Use this hook to interact with the database via the server
// You need to provide an api endpoint upon first calling the hook in your component
// update this url and http method using the setEndpointConfig function.
export default function useMongoDb(url) {

    // store the database result internally
    const [dbResult, setDbResult] = useState('');
    const [endpointConfig, dispatch] = useReducer(reducer, { url: url, method: "get" });

    // reducer which creates the endpoint configuration
    function reducer(state, action) {
        switch (action.method) {
            case "post":
                return state = { url: action.url, method: "post" };

            case "get":
                return state = { url: action.url, method: "get" };

            case "put":
                return state = { url: action.url, method: "put" };

            case "delete":
                return state = { url: action.url, method: "delete" };
        }
    }

    // this dispatches a call to update the enpoint and http method
    function setEndpointConfig(method, url) {
        console.log('updading config');
        dispatch({ url: url, method: method });
    }

    // this makes database queries based on the endpoint configuration
    // it observes the endpointConfig, which defines both the endpoint and http method.
    useEffect(() => {
        if (endpointConfig.url) {
            console.log(JSON.stringify(endpointConfig));
            switch (endpointConfig.method) {
                case "post":
                    axios.post(endpointConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "get":
                    console.log(endpointConfig.url);
                    axios.get(endpointConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "put":
                    axios.put(endpointConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "delete":
                    axios.delete(endpointConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

            }
        }
    }, [endpointConfig])

    // return the result 
    return [dbResult, setEndpointConfig];
}