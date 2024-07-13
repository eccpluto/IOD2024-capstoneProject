import { Box, Container } from "@mui/material"
import { TitleDisplayer } from "../components/common"
import LoginForm from "../components/LoginForm"

export default function LoginPage(props) {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                <TitleDisplayer title='Login' />
                <LoginForm/>
            </Box>
        </Container>
    )
}