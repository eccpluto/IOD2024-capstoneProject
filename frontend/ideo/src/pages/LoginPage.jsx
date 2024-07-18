import { Box, Container } from "@mui/material"
import { Header } from "../components/common"
import { LoginForm } from "../components"

export default function LoginPage(props) {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                <Header title='Login' />
                <LoginForm/>
            </Box>
        </Container>
    )
}