import { Box, Container, Typography } from "@mui/material"
import { Header } from "../components/common"
import { LoginForm } from "../components"
import { useUserContext } from "../contexts/UserContext"

export default function LogoutPage(props) {

    const { user, handleUpdateUser } = useUserContext();

    const doLogout = () => {
        handleUpdateUser(null);
    }

    doLogout();

    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                <Header title='Logout' />
                {!user && (
                    <Typography>
                        You have been loggout out.
                    </Typography>)}
            </Box>
        </Container>
    )
}