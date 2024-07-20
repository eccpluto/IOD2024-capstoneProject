import { Box, Container, Typography } from "@mui/material"
import { Header } from "../components/common"
import { LoginForm } from "../components"
import { useUserContext } from "../contexts/UserContext"

export default function LogoutPage(props) {

    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                <Header title='Logout' />
                <Typography>
                    You have been logged out
                </Typography>
            </Box>
        </Container>
    )
}