import axios from "axios";
import { useEffect, useState } from "react";

// provides a callback to create a user
export default function useCreateUser() {

    console.log('useCreateUser hook mounted')

    // keep an error state
    const [error, setError] = useState(null);

    // loading flag so consuming code can coordinate
    const [loading, setLoading] = useState(false);

    // store the new user
    const [user, setUser] = useState({});

    // async callback to create a user
    const handleCreateUser = async (name, email, password, theme = "Light") => {
        try {
            setError(null);
            setLoading(true)
            // wait for api response
            const response = await
                axios.post("http://localhost:8080/api/users/create", {
                    name: name,
                    email: email,
                    password: password,
                    theme: theme,
                })
            setUser(response.data.data);
            if (response.data.error) {
                throw new Error(response.data.error)
            }

        } catch (error) {
            setError(`Error creating library: ${error.message}`)

        } finally {
            setLoading(false);
        }
    }

    return [error, loading, user, handleCreateUser];
}