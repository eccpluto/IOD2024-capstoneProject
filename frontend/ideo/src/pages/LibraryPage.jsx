import Container from "@mui/material/Container";
import { Header } from "../components/common/";
import { Grid } from "@mui/material";
import { LibraryBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";

export default function LibraryPage(props) {

    // library needs to be able to access and modify user-specific resources
    // UserContext should be fixed before continuing.
    const { user}  = useUserContext();

    return (
        <Container maxWidth="lg" sx={{ height: '100vh' }}>
            {/* components are placed in the grid system */}
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
            >
                {/* header, fill all available space in grid container*/}
                <Grid container item xs={12}>
                    <Header title="Library" />
                </Grid>

                {/* resource browser */}
                <Grid container item xs={12} md={4} lg={3}>
                    <LibraryBrowser userId=''/>
                </Grid>

                {/* TODO - hide this on xs screens, potentially popup functionality for viewer */}
                {/* resource viewer */}
                <Grid container item xs={12} md={4} lg={3}>
                    <ResourceViewer />
                </Grid>

            </Grid>

        </Container>
    )
}