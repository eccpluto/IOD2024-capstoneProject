import axios from "axios";
import { useEffect, useState } from "react";

// Use this hook to consume data from the unpaywall api.
// observe updates to the returned data object for results
// in consuming code
export default function useUnpaywallData() {

    const API_BASE_URL = "https://api.unpaywall.org/v2";
    const API_OA = "is_oa=true";
    const API_EMAIL = "email=unpaywall_01@example.com";
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    function handleGetData(query) {
        const request = `${API_BASE_URL}/search?query=${query}&${API_OA}&${API_EMAIL}`;
        // console.log(request);
        setURL(request);
    };

    // serialise the data so that we only retain what we want in our model
    function serialiseData(data) {
        // map the data we are interested in
        const serialisedData = data.map((element) => {
            // console.log(element);
            return {
                title: element.response.title,
                url: element.response.doi_url,
                abstract: element.snippet,
                pdf_link: element.response.best_oa_location.url_for_pdf
            }
        });
        setData(serialisedData)
    };

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