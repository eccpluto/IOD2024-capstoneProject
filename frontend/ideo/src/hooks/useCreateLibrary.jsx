import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to create a library
export default function useCreateLibrary() {

    console.log('useCreateLibrary hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library
    const [library, setLibrary] = useState({});

    // asynchronous library creation
    const handleCreateLibrary = async (owner, name = "My Library") => {
        try {
            setError(null);
            setLoading(true)
            // wait for api response
            const response = await
                axios.post("http://localhost:8080/api/libraries/create", { owner: owner, name: name })
            setLibrary(response.data.data)
            if (response.data.error) {
                throw new Error(response.data.error)
            }

        } catch (error) {
            setError(`Error creating library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [error, loading, library, handleCreateLibrary];
}