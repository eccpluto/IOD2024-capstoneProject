import axios from "axios";
import { useEffect, useState } from "react";

// provides access to a library for a given owner
export default function useGetLibrary(owner) {

    console.log('useGetLibrary hook mounted')

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library
    const [library, setLibrary] = useState({});

    useEffect(() => {
        const getLibrary = async () => {
            try {
                setLoading(true)
                // wait for api response
                const response = await
                    axios.get("http://localhost:8080/api/libraries/", { params: { owner: owner, } })
                setLibrary(response.data)
                if (response.data.error) {
                    throw new Error(response.data.error)
                }

            } catch (error) {
                console.log(`Error creating library: ${error.message}`)

            } finally {
                setLoading(false);
            }
        }
        getLibrary();
    }, [])  // don't observe anything as we just want this hook to run once

    return [loading, library];
}