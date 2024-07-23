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
    // you MUST call setEndpointConfig in consuming code to create
    // a viable configuration, before calling doExectute();
    const [requestConfig, dispatch] = useReducer(reducer, {
        menubar: "",
        url: "",
        data: {}
    });

    // flag that will activate the useEffect to execute the query
    const [toExecute, setToExecute] = useState('false');

    // reducer which creates the endpoint configuration
    function reducer(requestConfig, action) {
        console.log('hello')
        switch (action.method) {
            case "post":
                console.log('setting post request')
                return { method: "post", url: action.url, data: action.data };

            case "get":
                console.log('setting get request')
                return { method: "get", url: action.url, data: action.data };

            case "put":
                console.log('setting put request')
                return { method: "put", url: action.url, data: action.data };

            case "delete":
                console.log('setting delete request')
                return { method: "delete", url: action.url, data: action.data };

            default:
                console.log("No requestConfig provided, dbResult will be invalid.");
                return requestConfig;
        }
    }

    // this dispatches a call to update the enpoint and http method
    function setRequestConfig(method, url, data = {}) {
        console.log('Inside setRequestConfig')
        dispatch({ method: method, url: url, data: data });
    }

    // this makes database queries based on the endpoint configuration
    // it observes the endpointConfig, which defines both the endpoint and http method.
    useEffect(() => {
        console.log("inside useEffect")
        if (requestConfig.url && toExecute) {
            // console.log(JSON.stringify(requestConfig));
            switch (requestConfig.method) {
                case "post":
                    console.log(`calling axios.post: ${JSON.stringify(requestConfig)}`)
                    axios.post(requestConfig.url, requestConfig.data)
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "get":
                    console.log('inside get request')
                    console.log(requestConfig.data);
                    axios.get(requestConfig.url, { params: requestConfig.data })
                        .then(response => setDbResult(response.data))
                        .catch(err => console.log(err));
                    break;

                case "put":
                    console.log(`calling axios.put: ${JSON.stringify(requestConfig)}`)
                    axios.put(requestConfig.url, requestConfig.data)
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