import Container from "@mui/material/Container";
import { Header, SearchBar } from "../components/common/";
import { Grid } from "@mui/material";
import { ResourceBrowser, ResourceViewer } from "../components";
import { useUserContext } from "../contexts/UserContext";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";

export default function LibraryPage(props) {

    // get the user id, this value will allow us to get
    // the corresponding library via library.owner FK
    const { user } = useUserContext();

    // hacky ensure initial population of library from db occurs once
    const [initialRender, setInitialRender] = useState(true);

    // local database will be resource target for resource browser
    const [dbResult, setRequestConfig, doExecute] = useMongoDb();

    // get the library
    useEffect(() => {
        if (initialRender) {
            setRequestConfig("get", `http://localhost:8080/api/libraries?owner=669616961527843b63185c1a`);
            doExecute();
        }
        return () => {
            setInitialRender(false);
        }
    }, [dbResult])

    return (
        // all pages are in a container
        <Container maxWidth="xl" sx={{ height: '100vh' }}>
            {/* {} */}
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
                    {dbResult && (<ResourceBrowser libraryOwner={user.id} resourceArray={dbResult.resources} />)}
                </Grid>
            </Grid>
        </Container>
    )
}