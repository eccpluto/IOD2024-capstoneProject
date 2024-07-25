import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to add a resource a to library, and the updated library
export default function useAddResourceToLibrary() {

    console.log('useAddResourceToLibrary hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library to return an updated object back to caller
    const [library, setLibrary] = useState({});

    // asynchronous library creation
    const handleAddResourceToLibrary = async (resource, libraryId) => {
        try {
            setLoading(true)
            // first we save the resouce to our resources collection 
            console.log(`libraryId: ${JSON.stringify(libraryId)}`);
            console.log(`resource to be commited: ${JSON.stringify(resource)}`);
            const resourceResponse = await
                axios.post("http://localhost:8080/api/resources/create", resource)
            console.log(`resourceResponse: ${JSON.stringify(resourceResponse)}`)
            if (resourceResponse.data.error) {
                console.log('Error when saving new resource.')
                throw new Error(resourceResponse.data.error)
            }

            // then we need to add the resource to our library
            const libraryResponse = await
                axios.put(`http://localhost:8080/api/libraries/${libraryId}/resources?augment=push`,
                    { resources: resourceResponse.data.data._id }
                )
            setLibrary(libraryResponse.data.data)
            console.log(`libraryResponse: ${JSON.stringify(libraryResponse)}`)
            if (libraryResponse.data.error) {
                console.log('Error when updading library resources.')
                throw new Error(libraryResponse.data.error)
            }

        } catch (error) {
            setError(`Error adding resource to library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [error, loading, library, handleAddResourceToLibrary];
}