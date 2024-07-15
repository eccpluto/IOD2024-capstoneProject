import { useEffect, useState } from "react";
import axios from "axios";


// generic hook that offloads calls to a server HTTP API via useEffect
// note this only performs get requests
export default function useData(url) {

    console.log(url);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (url) {
               await axios.get(url)
                    .then(response => {
                        console.log(`url: ${url}`);
                        console.log(response.data);
                        setData(response);
                    })
                    .catch(err => {
                        console.log(err);
                        setError(err);
                    });
            };
            setLoading(false);
        };
        getData();
    }, [])
}