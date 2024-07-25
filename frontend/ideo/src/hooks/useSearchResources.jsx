
import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to search local resource collection
export default function useSearchResources() {

    console.log('useSearchResources hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library
    const [searchResources, setSearchResources] = useState({});

    const handleSearchResources = async (libraryId, search) => {
        if (libraryId && search) {
            try {
                // reset flags
                setError(null);
                setLoading(true)
                // wait for api response
                // console.log(owner);
                const response = await
                    axios.get(`http://localhost:8080/api/libraries/${libraryId}/resources`, { params: { search: search, } })
                // set the resource array
                setSearchResources(response.data.data.resources)
                // console.log(searchResources)
                if (response.data.error) {
                    throw new Error(response.data.error)
                }

            } catch (error) {
                setError(`Error searching local resources: ${error.message}`);

            } finally {
                setLoading(false);
            }
        }
    }

    return [error, loading, searchResources, handleSearchResources];
}