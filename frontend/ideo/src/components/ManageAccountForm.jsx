import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, getFormHelperTextUtilityClasses, MenuItem, TextField, Typography } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useEffect, useState } from "react";
import useMongoDb from "../hooks/useMongoDb";
import useFormInput from "../hooks/useFormInput";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

// render this form to manage account details for a logged in user
export default function ManageAccountForm(props) {

    const [deletingAccount, setDeletingAcount] = useState(false);

    const navigate = useNavigate();

    // prompting confimation of intention to delete account
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // so we can keep context and database synchronised
    const { user, handleUpdateUser } = useUserContext();

    console.log(`managing account details for user: ${JSON.stringify(user)}`);

    // will need to retrieve and update user information in the database
    const [dbResult, setRequestConfig, doExecute] = useMongoDb();

    // we should only contact db to get information not stored in the UserContet,
    // and to update our user
    useEffect(() => {
        const onDbResponse = async () => {
            console.log(`checking result: ${JSON.stringify(dbResult)}`)
            // checking http response.result
            if (dbResult && dbResult.result == "200") {
                // we should also render a different UI state
                handleUpdateUser(dbResult.data)
                if (deletingAccount) {
                    handleUpdateUser({});
                    getFeedback("Account successfully deleted.")
                    navigate("/login");
                } else {
                    getFeedback('Account information successfully updated.')
                }
            }
        };
        onDbResponse();
    }, [dbResult]);


    const [nameProps, nameReset] = useFormInput(user.name);
    const [emailProps, emailReset] = useFormInput(user.email);
    const [themeProps] = useFormInput(user.theme);

    const [submitResult, setSubmitResult] = useState('');

    // client-side validation of input values

    // NOTE/////////////////////////////////////////////////////
    // By excluding these checks, we break the consttaints affecting
    // passwords and uniqueness to other fields, but we avoid needing
    // to GET from MongoDB, at this cost alongside not being able
    // to change the password.
    // TODO look into getting this working later
    ////////////////////////////////////////////////////////////

    const checkInputFields = () => {
        let result = true;
        if (nameProps.value == user.name && emailProps.value == user.email && themeProps.value == user.theme) {
            result = false;
            getFeedback('No changes detected, no changes made.');
        }
        //     if (passwordProps.value.length < 5) {
        //         getFeedback('Password must be greater than 5 characters long.');
        //         result = false;
        //     } else if (passwordProps.value === emailProps.value) {
        //         getFeedback('Email cannot be the same as password.');
        //         result = false;
        return result;
    }

    // provide some (timed-out) feedback to user
    const getFeedback = (message) => {
        console.log(message);
        setSubmitResult(message);
        setTimeout(() => { setSubmitResult('') }, 4000);
    }

    const handleUpdateSubmit = () => {
        // server will handle uniqueness of users
        let updatedUser = {
            name: nameProps.value,
            email: emailProps.value,
            theme: themeProps.value
        }
        console.log(`updating user information: ${JSON.stringify(updatedUser)}`);
        setRequestConfig("put", `http://localhost:8080/api/users/${user.id}`, updatedUser);
        doExecute();
    }

    // when user tries to submit values for a new account
    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkInputFields()) {
            handleUpdateSubmit();
        }
    }

    const handleDeleteAccount = () => {
        setShowDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
    }

    const handleConfirmDeletion = () => {
        console.log(`deleting user: ${user.id}`);
        setShowDeleteDialog(false)
        setRequestConfig("delete", `http://localhost:8080/api/users/${user.id}`);
        doExecute();
        setDeletingAcount(true);
    }

    if (deletingAccount) {
        return (
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1 }}>
                        <ManageAccountsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Account deleted
                    </Typography>
                    {submitResult}
                </Box>
            </Container>
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
                    <ManageAccountsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Manage Account
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
                        Update
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleDeleteAccount}
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Delete Account
                    </Button>
                    <Dialog
                        open={showDeleteDialog}
                        onClose={handleCloseDeleteDialog}
                    >
                        <DialogTitle>
                            {"Confirm account deletion."}
                        </DialogTitle>
                        <DialogContent>
                            We will destroy all trace of your existence on this server.
                            You will still be able to access the search functionality but
                            all libraries associated with this account will be lost.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog}>Go back</Button>
                            <Button onClick={handleConfirmDeletion}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Container>
    )
}