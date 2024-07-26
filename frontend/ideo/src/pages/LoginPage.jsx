import { Box, Button, Container, IconButton, useTheme } from "@mui/material"
import { Header } from "../components/common"
import { LoginForm } from "../components"
import { createContext, useContext } from "react";

export default function LoginPage(props) {

    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
                bgcolor: 'background.default',
                color: 'text.primary',
            }}>
                {/* <Header title='Login' /> */}
                <LoginForm />
            </Box>
        </Container>
    )
}