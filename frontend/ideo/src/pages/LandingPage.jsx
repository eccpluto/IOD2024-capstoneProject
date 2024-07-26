import { Box, Container, Typography, useTheme } from "@mui/material";
import { Header } from "../components/common";

export default function LandingPage(props) {

    const theme = useTheme();

    return (
        <Container maxWidth="xl">
            <Box sx={{
                my: 4,
                p: 2,
                borderRadius: 4,
            }}>
                <Header title='' />
                <Typography sx={{ mb: 1.5, textAlign: "left" }} color="text.primary" variant="h1">
                    Ideo.
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: "left" }} color="text.secondary" variant="h4">
                    A repository for your ideas and research, giving you direct access to over 20 million articles.
                </Typography>
            </Box>
        </Container>
    )
}