import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useNavigate } from "react-router-dom";
import { useLibraryContext } from "../contexts/LibraryContext";
import useGetLibrary from "../hooks/useGetLibrary";
import useGetUser from "../hooks/useGetUser";


export default function LoginForm(props) {

    // for navigating to account creation page
    const navigate = useNavigate()

    /**
     * authentication depends on there being a match in the database,
     * we therefore hook into the dabase via the handleGetDbUser callback
     * abstraction, and observe the corresponding flags
     */
    const [errorDbUser, loadingDbUser, dbUser, handleGetDbUser] = useGetUser();
    const { user, handleUpdateUser } = useUserContext();

    /**
     * we also want to synchronise out LibraryContext, which depends on the
     * user above being authenticated first
     */
    const [errorDbLibrary, loadingDbLibrary, dbLibrary, handleGetDbLibrary] = useGetLibrary();
    const { library, handleUpdateLibrary } = useLibraryContext();

    // observe for changes in the dbUser, which we can then synchronise our UserContext with.
    useEffect(() => {
        if (dbUser) {
            handleUpdateUser(dbUser);
            handleGetDbLibrary(dbUser._id);
        }
    }, [dbUser])

    // observe for changes in the dbLibrary (which is set above), sychronise with LibraryContext
    useEffect(() => {
        if (dbLibrary) {
            handleUpdateLibrary(dbLibrary);
        }
    }, [dbLibrary])

    console.log(JSON.stringify(library));

    // internal states of component
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });
    const [submitResult, setSubmitResult] = useState('');

    // internal handlers
    const handleEmailChange = (event) => {
        setUserCredentials({
            email: event.target.value,
            password: userCredentials.password,
        })
    }
    const handlePasswordChange = (event) => {
        setUserCredentials({
            email: userCredentials.email,
            password: event.target.value,
        })
    }

    // client-side validation of input values
    const checkInputFields = () => {
        let result = true;
        let uc = userCredentials;
        if (uc.password.length < 5) {
            getFeedback('Password must be greater than 5 characters long.');
            result = false;
        } else if (uc.password === uc.email) {
            getFeedback('Email cannot be the same as password.');
            result = false;
        }
        return result;
    }

    // provide some (timed-out) feedback to user
    const getFeedback = (message) => {
        console.log(message);
        setSubmitResult(message);
        setTimeout(() => { setSubmitResult('') }, 3000);
    }

    // copied directly from UserContext
    // begin the authentication process
    const handleAuthenticateUser = ({ email, password }) => {
        // logout condition
        if (!email && !password) {
            getFeedback("Logged out.")
            return;
        }
        console.log(`querying database for user:\n ${email}`);
        getFeedback('Attempting to sign in..')
        handleGetDbUser(email, password);
    }

    // respond to a login request
    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkInputFields()) {
            handleAuthenticateUser({
                email: userCredentials.email,
                password: userCredentials.password,
            });
        }
    }

    const handleCreateAccount = () => {
        navigate("/create")
    }

    // we use the existence of library._id as an indicator of sucessful login
    if (library._id) {
        console.log(`'logged in state': user value is: ${JSON.stringify(user)}`);
        return (
            <Box>
                <Typography>Welcome {user.name}!</Typography>
                {/* {submitResult} */}
                <Box>
                    {/* <button onClick={handleLogout}>Log Out</button> */}
                </Box>
            </Box>
        )
    };

    // code from here will only run if no user is present in UserContext
    console.log(`'logged out state:'user value is: ${JSON.stringify(user)}`)
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {submitResult}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                    <TextField
                        value={userCredentials.email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                    />
                    <TextField
                        value={userCredentials.password}
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        label="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleCreateAccount}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}