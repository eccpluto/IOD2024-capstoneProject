import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to get a library
export default function useGetLibrary() {

    console.log('useGetLibrary hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library
    const [library, setLibrary] = useState({});

    const handleGetLibrary = async (owner) => {
        if (owner) {
            try {
                // reset flags
                setError(null);
                setLoading(true)
                // wait for api response
                // console.log(owner);
                const response = await
                    axios.get("http://localhost:8080/api/libraries/", { params: { owner: owner, } })
                console.log(response.data.data)
                setLibrary(response.data.data)
                if (response.data.error) {
                    throw new Error(response.data.error)
                }

            } catch (error) {
                setError(`Error creating library: ${error.message}`);

            } finally {
                setLoading(false);
            }
        }
    }

    return [error, loading, library, handleGetLibrary];
}