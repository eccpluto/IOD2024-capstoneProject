import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to remove a resource from a library, and get the updated library
export default function useRemoveResourceFromLibrary() {

    console.log('useRemoveResourceFromLibrary hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store library to return an updated object back to caller
    const [library, setLibrary] = useState({});

    // asynchronous removal of resource in a particular library
    const handleRemoveResourceFromLibrary = async (resourceId, libraryId) => {
        try {
            setLoading(true)
            // first we remove the resouce reference from our library resource array
            console.log("THIS SHOULD BE A RESOURCE._id, not the whole resource object!")
            const libraryResponse = await
                axios.put(`http://localhost:8080/api/libraries/${libraryId}/resources?augment=pull&resourceId=${resourceId}`
                    // ,
                    // { resourceId: resourceId }
                )
            if (libraryResponse.data.error) {
                console.log('Error while removing resource from library.')
                throw new Error(resourceResponse.data.error)
            }

            // set the library now, as this part is done, althought note 
            // e still haven't completed the whole process
            setLibrary(libraryResponse.data.data)

            const resourceResponse = await
                axios.delete(`http://localhost:8080/api/resources/${resourceId}`)
            if (resourceResponse.data.error) {
                console.log('Error when deleting resource.')
                throw new Error(resourceResponse.data.error)
            }

        } catch (error) {
            setError(`Error processing resource removal from library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [error, loading, library, handleRemoveResourceFromLibrary];
}