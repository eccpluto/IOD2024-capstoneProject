import { Avatar, Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from "react";
import useMongoDb from "../hooks/useMongoDb";
import useFormInput from "../hooks/useFormInput";
import { useNavigate } from "react-router-dom";
import useCreateLibrary from "../hooks/useCreateLibrary";

// render this form to create accounts
export default function CreateAccountForm(props) {

    // for cancelling creation of account
    const navigate = useNavigate();

    // will need to post a new user document on creation
    const [dbResult, setRequestConfig, doExecute] = useMongoDb();

    // will need to create a default library
    const [loading, handleCreateLibrary] = useCreateLibrary();

    // observe for a successful response, which will nav to LoginPage
    useEffect(() => {
        const onDbResponse = async () => {
            console.log(`checking result: ${JSON.stringify(dbResult)}`)
            // checking http response.result
            if (dbResult && dbResult.result == "200") {
                console.log()
                // acount created, create a library for this user
                handleCreateLibrary(dbResult.data._id);
                // we should also render a different UI state
                getFeedback('Account successfully created. Returning to login page.')
                setTimeout(() => navigate("/login"), 4000);
            }
        };
        onDbResponse();
    }, [dbResult]);


    const [nameProps, nameReset] = useFormInput('');
    const [emailProps, emailReset] = useFormInput('');
    const [passwordProps, passwordReset] = useFormInput('');
    const [themeProps] = useFormInput('Light');

    const [submitResult, setSubmitResult] = useState('');

    // client-side validation of input values
    const checkInputFields = () => {
        let result = true;
        if (passwordProps.value.length < 5) {
            getFeedback('Password must be greater than 5 characters long.');
            result = false;
        } else if (passwordProps.value === emailProps.value) {
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

    const handleAddUser = () => {
        // server will handle uniqueness of users
        let newUser = {
            name: nameProps.value,
            email: emailProps.value,
            password: passwordProps.value,
            theme: themeProps.value
        }
        console.log(`candidate for newUser is: ${JSON.stringify(newUser)}`);
        setRequestConfig("post", `http://localhost:8080/api/users/create`, newUser);
        doExecute();
    }

    // when user tries to submit values for a new account
    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkInputFields()) {
            handleAddUser();
        }
    }

    // return to login page
    const handleCancel = () => {
        navigate("/login");
    }

    return (
        <Container component="main" maxWidth="xs">
            {(loading && ("loading"))}
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1 }}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                {submitResult}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                    <TextField
                        value={nameProps.value}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={nameProps.onChange}
                    />
                    <TextField
                        value={emailProps.value}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        // autoComplete="email"
                        // autoFocus
                        onChange={emailProps.onChange}
                    />
                    <TextField
                        value={passwordProps.value}
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        // autoFocus
                        onChange={passwordProps.onChange}
                    />
                    <TextField
                        value={themeProps.value}
                        margin="normal"
                        select
                        fullWidth
                        id="theme"
                        label="Theme"
                        name="theme"
                        // autoFocus
                        onChange={themeProps.onChange}
                    >
                        <MenuItem value="Light">
                            Light
                        </MenuItem>
                        <MenuItem value="Dark">
                            Dark
                        </MenuItem>

                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Create
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={(handleCancel)}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}