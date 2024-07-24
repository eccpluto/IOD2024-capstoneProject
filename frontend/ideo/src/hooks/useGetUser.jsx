import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to get a user, such as for loggin into a session
export default function useGetUser() {

    console.log('useGetUser hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store user
    const [user, setUser] = useState({});

    const handleGetUser = async (email, password) => {
        try {
            // reset flags
            setError(null);
            setLoading(true);
            const response = await
                axios.get("http://localhost:8080/api/users", { params: { email: email, password: password } })
            // console.log(response.data.data)
            setUser(response.data.data)
            if (response.data.error) {
                throw new Error(response.data.error)
            }
        } catch (error) {
            // throw new Error(`Error getting user: ${error.message}`);
            setError(`Error getting user: ${error.message}`)
        }
        finally {
            setLoading(false);
        }
    }

    return [error, loading, user, handleGetUser];
}