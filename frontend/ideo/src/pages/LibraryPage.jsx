import Container from "@mui/material/Container";
import { Header } from "../components/common/";
import { Grid } from "@mui/material";
import { LibraryBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";

export default function LibraryPage(props) {

    const { user } = useUserContext();

    return (
        // all pages are in a container
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            {/* components are placed in the grid system */}
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
            >
                {/* header, fill all available space in grid container*/}
                <Grid item xs={12}>
                    <Header title="Library" />
                </Grid>

                {/* resource browser */}
                <Grid item xs={12}>
                    <LibraryBrowser userId={user.id} />
                </Grid>

                {/* TODO - hide this on xs screens, potentially popup functionality for viewer */}
                {/* resource viewer */}
                {/* <Grid container item xs={12} md={4} lg={3}>
                    <ResourceViewer />
                </Grid> */}

            </Grid>
        </Container>
    )
}