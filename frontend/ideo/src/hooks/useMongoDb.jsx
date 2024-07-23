import axios from "axios";
import { useEffect, useReducer, useState } from "react";

// Use this hook to interact with the database via the server:
// 1. consume hook
// 2. call setRequestConfig() from consumer
// 3. call doExecute() from consumer
// 4. setup a useEffect that allows you to observe the dbResult.
export default function useMongoDb() {

    const [dbResult, setDbResult] = useState();

    // the requestConfig object descibes the database request.
    // you MUST call setEndpointConfig in consumeing code to create
    // a viable configuration, before calling doExectute();
    const [requestConfig, dispatch] = useReducer(reducer, { url: "", method: "", data: null });

    // flag that will activate the useEffect to execute the query
    const [toExecute, setToExecute] = useState('false');

    // reducer which creates the endpoint configuration
    function reducer(requestConfig, action) {
        console.log('hello')
        switch (action.method) {
            case "post":
                console.log('setting post request')
                return requestConfig = { url: action.url, method: "post", data: action.data };

            case "get":
                console.log('setting get request')
                return requestConfig = { url: action.url, method: "get", data: action.data };

            case "put":
                console.log('setting put request')
                return requestConfig = { url: action.url, method: "put", data: action.data };

            case "delete":
                console.log('setting delete request')
                return requestConfig = { url: action.url, method: "delete", data: action.data };

            default:
                console.log("No requestConfig provided, dbResult will be invalid.");
                break;
        }
    }

    // this dispatches a call to update the enpoint and http method
    function setRequestConfig(method, url, data = null) {
        dispatch({ url: url, method: method, data: data });
    }

    // this makes database queries based on the endpoint configuration
    // it observes the endpointConfig, which defines both the endpoint and http method.
    useEffect(() => {
        if (requestConfig.url && toExecute) {
            // console.log(JSON.stringify(requestConfig));
            switch (requestConfig.method) {
                case "post":
                    console.log(`calling axios.post: ${JSON.stringify(requestConfig)}`)
                    axios.post(requestConfig.url, requestConfig.data )
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "get":
                    console.log(JSON.stringify(requestConfig));
                    axios.get(requestConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "put":
                    axios.put(requestConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "delete":
                    axios.delete(requestConfig.url)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;
            }
        }

        return () => {
            console.log("Setting execution flag to false.");
            setToExecute(false);
        }

    }, [toExecute]);

    function doExecute() {
        console.log("Setting execution flag to true.");
        setToExecute(true);
    }

    // return the databse response result: dbResult
    // a callback to set the request: setRequestConfig
    // a callback to to initiate the request: doExecute
    return [dbResult, setRequestConfig, doExecute];
}