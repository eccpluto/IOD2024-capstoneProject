import axios from "axios";
import { useEffect, useState } from "react";

// Use this hook to consume data from the unpaywall api.
// observe updates to the returned data object for results
// in consuming code
export default function useUnpaywallData() {

    const API_BASE_URL = "https://api.unpaywall.org/v2";
    const API_OA = "is_oa=true";
    const API_EMAIL = "email=unpaywall_01@example.com";

    // store the actual data
    const [data, setData] = useState(null);
    // const [url, setURL] = useState(null);

    // store error
    const [error, setError] = useState(null);

    //loading flage
    const [loading, setLoading] = useState(false);

    // function handleGetData(query) {
    //     const request = `${API_BASE_URL}/search?query=${query}&${API_OA}&${API_EMAIL}`;
    //     // console.log(request);
    //     setURL(request);
    // };

    // serialise the data so that we only retain what we want in our model
    function serialiseData(data) {
        // map the data we are interested in
        const serialisedData = data.map((element) => {
            // console.log(element);
            return {
                name: element.response.title,
                url: element.response.doi_url,
                abstract: element.snippet,
                pdf_link: element.response.best_oa_location.url_for_pdf
            }
        });
        setData(serialisedData)
    };

    // observe the url state and fetch data when change detected
    // useEffect(() => {
    //     if (url) {
    //         try {
    //             setError(null);
    //             setLoading(true);
    //             console.log('actually fetching')
    //             axios.get(url)
    //                 .then(response => serialiseData(response.data.results))
    //                 .catch(err => console.log(err));
    //         }
    //     }

    //     return () => {
    //         console.log("done fetching unpaywall data");
    //     }

    // }, [url]);

    const handleGetData = async (query) => {
        if (query) {
            try {
                // reset flags
                setError(null);
                setLoading(true)
                // wait for api response
                // console.log(owner);
                const request = `${API_BASE_URL}/search?query=${query}&${API_OA}&${API_EMAIL}`;
                const response = await axios.get(request)
                serialiseData(response.data.results);
                if (response.data.error) {
                    throw new Error(response.data.error)
                }

            } catch (error) {
                setError(`Error fetching Unpaywall resources: ${error.message}`);

            } finally {
                setLoading(false);
            }
        }
    }

    // return the data from the api request
    // a callback to to set the api request: handleGetData
    return [error, loading, data, handleGetData];
}