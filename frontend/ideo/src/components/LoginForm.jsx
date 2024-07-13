import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";


export default function LoginForm(props) {

    // consume userContext
    const { user, handleAuthenticateUser } = useUserContext();

    // internal states of component
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });
    // this lets us alert user to the authentication state
    const [submitResult, setSubmitResult] = useState('');

    // internal component functions
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

    const checkInputFields = () => {
        let result = true;
        let uc = userCredentials;
        if (uc.password.length < 5) {
            setSubmitResult('Password must be greater than 5 characters long.');
            result = false;
        } else if (uc.password === uc.email) {
            setSubmitResult('Email cannot be the same as password.');
            result = false;
        }
        return result;
    }

    // this is used as a callback from the UserContext to pass up the state of
    // authenticating / deauthenticating a user, and provides timed-out status updates
    const getAuthenticationStatus = (status) => {
        console.log(status);
        setSubmitResult(status);
        setTimeout(() => {setSubmitResult('')}, 4000); 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkInputFields()) {
            setSubmitResult('Logging in..');
            handleAuthenticateUser({
                email: userCredentials.email,
                password: userCredentials.password,
                // anonymous function to update the submitResult from the context
            }, getAuthenticationStatus)

        }
        console.log(user);
    }

    const handleLogout = () => {
        handleAuthenticateUser({}, getAuthenticationStatus);
    }

    console.log(user);
    // on successful login, this is returned, for this to persist, during refereshes,
    // the context should rely on the server to keep a record of who is logged in,
    // works for now server side.
    if (user.email) {
        return (
            <Box>
                <p>Welcome {user.email}!</p>
                {submitResult}
                <Box>
                    <button onClick={handleLogout}>Log Out</button>
                </Box>
            </Box>
        )
    }

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
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}