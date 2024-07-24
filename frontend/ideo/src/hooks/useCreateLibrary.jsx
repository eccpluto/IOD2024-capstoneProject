import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to create a library
export default function useCreateLibrary() {

    console.log('useCreateLibrary hook mounted')

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // asynchronous library creation
    const handleCreateLibrary = async (owner, name = "My Library") => {
        try {
            setLoading(true)
            // wait for api response
            const response = await
                axios.post("http://localhost:8080/api/libraries/create", { owner: owner, name: name })
            if (response.data.error) {
                throw new Error(response.data.error)
            }

        } catch (error) {
            console.log(`Error creating library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [loading, handleCreateLibrary];
}