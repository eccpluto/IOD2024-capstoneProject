import Container from "@mui/material/Container";
import { Header, SearchBar } from "../components/common/";
import { Box, Grid, useTheme } from "@mui/material";
import { ResourceBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";

export default function LibraryPage(props) {

    // theming
    const theme = useTheme()

    // get the user id, this value will allow us to get
    // the corresponding library via library.owner FK
    const { user } = useUserContext();

    const [library, setLibrary] = useState('');

    // const [attemptingToGetLib, setAttempingToGetLib] = useState(false);

    // hacky ensure initial population of library from db occurs once
    const [initialRender, setInitialRender] = useState(true);
    const [creatingLibrary, setCreatingLibrary] = useState(false);
    const [connectingToLibrary, setConnectingToLibrary] = useState(false);

    // ensure a library exists - try creating one which will fail if already exists
    // and will allow us to then set the library regardless
    // console.log(user.id)

    // const initialData = { owner: user.id }
    const [dbResult, setRequestConfig, doExecute] = useMongoDb()

    const connectToLibrary = () => {
        console.log('connecting to library')
        setRequestConfig("get", `http://localhost:8080/api/libraries/`, { owner: user.id })
        doExecute();
    }

    useEffect(() => {
        // try create library on mounting / initial rendering
        if (initialRender) {
            console.log("useEffect initial render")
            setRequestConfig("post", `http://localhost:8080/api/libraries/create`, { owner: user.id })
            doExecute();
            setInitialRender(false);
            setCreatingLibrary(true);
        }
        else
            // we have tried creating a libray by this point
            if (creatingLibrary) {
                console.log("useEffect creating library")

                // at this point either library exists or has been created,
                // we connect either way
                setConnectingToLibrary(true);
                setCreatingLibrary(false)
                connectToLibrary();



            }
            //  if we have tried connecting, we can set out library
            else if (connectingToLibrary) {
                console.log("useEffect setting library")
                setConnectingToLibrary(false);
                console.log(dbResult);
                setLibrary(dbResult.data)
            }

        console.log(`library is: ${library}`);
    }, [dbResult])

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