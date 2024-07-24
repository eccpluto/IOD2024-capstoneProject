import { Avatar, Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from "react";
import useMongoDb from "../hooks/useMongoDb";
import useFormInput from "../hooks/useFormInput";
import { useNavigate } from "react-router-dom";
import useCreateLibrary from "../hooks/useCreateLibrary";
import useCreateUser from "../hooks/useCreateUser";

// render this form to create accounts
export default function CreateAccountForm(props) {

    // for cancelling creation of account
    const navigate = useNavigate();

    // create a user via a callback to this hook, we don't login for now
    // so there is no setting contexts
    const [errorUser, loadingUser, user, handleCreateUser] = useCreateUser();

    // will need to post a new user document on creation
    // const [dbResult, setRequestConfig, doExecute] = useMongoDb();

    // will need to create a default library too
    const [errorLibrary, loadingLibrary, library, handleCreateLibrary] = useCreateLibrary();

    // when a new user is created, create and assign library
    // the reason this is null event though we set it to {} ios because the db response
    // will be null for the field containing the user data
    useEffect(() => {
        if (user) {
            handleCreateLibrary(user._id);
        }
    }, [user])


    // once a new library is created, we know we are finished
    useEffect(() => {
        if (library && library._id) {
            getFeedback('Account successfully created. Returning to login page.')
            setTimeout(() => navigate("/login"), 4000);
        }
    }, [library])


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
        handleCreateUser(
            nameProps.value,
            emailProps.value,
            passwordProps.value,
            themeProps.value
        )
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
            {((loadingUser || loadingLibrary) && ("loading"))}
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