import Container from "@mui/material/Container";
import { Header, SearchBar } from "../components/common/";
import { Box, Grid, useTheme } from "@mui/material";
import { ResourceBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";
import useGetLibrary from "../hooks/useGetLibrary";
import { useLibraryContext } from "../contexts/LibraryContext";

export default function LibraryPage(props) {

    // theming
    const theme = useTheme()

    // get the user id, this value will allow us to get
    // the corresponding library via library.owner FK
    const { user } = useUserContext();

    const { library } = useLibraryContext();
    console.log(library);


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

                    {/* pass array of library resouces to browser */}
                    <Grid item xs={12}>
                        {(library) && library && (<ResourceBrowser resourceArray={library.resources} browserVariant="library" />)}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}