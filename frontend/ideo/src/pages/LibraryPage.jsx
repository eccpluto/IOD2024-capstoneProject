import Container from "@mui/material/Container";
import { Header, SearchBar } from "../components/common/";
import { Box, Grid, useTheme } from "@mui/material";
import { ResourceBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";
import useGetLibrary from "../hooks/useGetLibrary";

export default function LibraryPage(props) {

    // theming
    const theme = useTheme()

    // get the user id, this value will allow us to get
    // the corresponding library via library.owner FK
    const { user } = useUserContext();

    console.log(`user id: ${user.id}`)
    const [loading, library] = useGetLibrary(user.id);
    console.log(`loading: ${loading}`)
    
    
    return (
        // all pages are in a container
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            {/* {} */}
            <Box sx={{
                my: 4,
                p: 2,
                bgcolor: theme.palette.primary.main,
                borderRadius: 4,
            }}>
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

                    {/* resource browser, but populated with library resources */}
                    <Grid item xs={12}>
                        {library && (<ResourceBrowser libraryId={library._id} resourceArray={library.resources} />)}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}