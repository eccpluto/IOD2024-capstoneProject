import { Box, Container } from "@mui/material"
import { Header } from "../components/common"
import { CreateAccountForm } from "../components"

export default function CreateAccountPage(props) {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                {/* <Header title='Create Account' /> */}
                <CreateAccountForm />
            </Box>
        </Container>
    )
}