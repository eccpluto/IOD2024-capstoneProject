import axios from "axios";
import { useEffect, useState } from "react";

// Use this hook to consume data from the unpaywall api.
// observe updates to the returned data object for results
// in consuming code
export default function useUnpaywallData() {

    const API_BASE_URL = "https://api.unpaywall.org/v2";
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    function handleGetData(enpoint) {
        const request = API_BASE_URL + enpoint;
        console.log(request);
        setURL(request);
    }

    // serialise the data so that we only retain what we want in our model
    function serialiseData(data) {
        let serialisedData = {};
        setData(serialisedData)
    }

    // observe the url state and fetch data when change detected
    useEffect(() => {
        if (url) {
            console.log('actually fetching')
            axios.get(url)
                .then(response => serialiseData(response.data.results))
                .catch(err => console.log(err));
        }

        return () => {
            console.log("done fetching unpaywall data");
        }

    }, [url]);

    // return the data from the api request
    // a callback to to set the api request: handleGetData
    return [data, handleGetData];
}