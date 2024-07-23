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

    const [library, setLibrary] = useState('');

    // const [attemptingToGetLib, setAttempingToGetLib] = useState(false);

    // hacky ensure initial population of library from db occurs once
    const [initialRender, setInitialRender] = useState(true);

    // ensure a library exists - try creating one which will fail if already exists
    // and will allow us to then set the library regardless
    // console.log(user.id)

    const initialData = { owner: user.id }
    const [dbResult, setRequestConfig, doExecute] = useMongoDb()

    useEffect(() => {
        if(initialRender) {
            setRequestConfig("get", `http://localhost:8080/api/libraries`, { owner: user.id })
            doExecute();
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
                    {dbResult && (<ResourceBrowser libraryId={user.id} resourceArray={dbResult.resources} />)}
                </Grid>
            </Grid>
        </Container>
    )
}