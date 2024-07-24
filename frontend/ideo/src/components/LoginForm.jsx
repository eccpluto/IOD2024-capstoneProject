import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useNavigate } from "react-router-dom";


export default function LoginForm(props) {

    // for navigating to account creation page
    const navigate = useNavigate()

    // userContext is an application-wide state object, and is used to handle
    // if a user is logged in / authenticated in this case
    const { user, handleUpdateUser } = useUserContext();


    // Authentication will be handled by simply updating the user
    // state which is stored in the UserContext instance.
    // Authentication depends on the user being a valid account,
    // therefore we will consume the useMongoDb hook for getting this information.
    const [dbResult, setRequestConfig, doExecute] = useMongoDb();


    // since the dbResult object is dynamic depending on our database
    // fetching callback (later in the code), we need to observe this result
    // in order to hande user authentication. The hook system will cause this
    // component to render when the dbResult updates automatically, we just
    // need to observe it:
    // console.log(`dbresult is: ${JSON.stringify(dbResult)}`);
    useEffect(() => {
        // try authenticate the user
        const tryAuthenticateUser = async () => {
            if (dbResult && dbResult.data) {
                handleUpdateUser(dbResult.data);
            } else if (dbResult) {
                getFeedback("User not found or password incorrect.");
            } else {
                console.log("No user authenticated.");
            }
        };
        tryAuthenticateUser();
    }, [dbResult])

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
        setTimeout(() => { setSubmitResult('') }, 4000);
    }

    // copied directly from UserContext
    // begin the authentication process
    const handleAuthenticateUser = ({ email, password }) => {
        // logout condition
        if (!email && !password) {
            getFeedback("Logged out.")
            return;
        }
        try {
            console.log(`querying database for user:\n ${email}`);
            getFeedback('Logging in..')

            // set an enpoint (query), and execute a database query :
            setRequestConfig('get', `http://localhost:8080/api/users?email=${email}&password=${password}`);
            // make the request - this is will return immediately, but the dbResult
            // will be updated asynchronously, which will be observed by the useEffect above.
            doExecute();

        } catch (e) {
            console.error(`Issue authenticating user: ${e}`);
            getFeedback(`${e}`);
        }
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

    const handleLogout = () => {
        setUserCredentials({ email: '', password: '' });
        handleUpdateUser({});
    }

    const handleCreateAccount = () => {
        navigate("/create")
    }

    // on successful login, this is returned.
    // the context should rely on the server to keep a record of who is logged in
    if (user.name) {
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