import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to add resources a to library
export default function useAddResourceToLibrary() {

    console.log('useAddResourceToLibrary hook mounted')

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // asynchronous library creation
    const handleAddResourcesToLibrary = async (resource, libraryId) => {
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
            console.log(`libraryResponse: ${JSON.stringify(libraryResponse)}`)
            if (libraryResponse.data.error) {
                console.log('Error when updading library resources.')
                throw new Error(libraryResponse.data.error)
            }

        } catch (error) {
            console.log(`Error adding resource to library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [loading, handleAddResourcesToLibrary];
}