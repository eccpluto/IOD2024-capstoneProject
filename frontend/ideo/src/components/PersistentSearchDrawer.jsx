import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SearchBar } from './common';
import ResourceBrowser from './ResourceBrowser';
import useUnpaywallData from '../hooks/useUnpaywallData';
import useSearchResources from '../hooks/useSearchResources';
import { useLibraryContext } from '../contexts/LibraryContext';

const drawerWidth = 480;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    paddingTop: "15px",
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    // position: "fixed"
}));

// A drawer that opens to the right and persists until manually closed
export default function PersistentSearchDrawer(props) {
    const theme = useTheme();
    const open = props.open;
    const handleDrawerClose = props.handleDrawerClose
    // const handlePushToLibrary = props.handlePushToLibrary

    // for whether the ResourceBrowser is displaying local or online resources
    const [resourceLocation, setResourceLocation] = useState("online");

    // for online resouces, hook into unpaywall
    const [errorUnpaywallData, loadingUnpaywallData, unpaywallData, handleGetUnpaywallData] = useUnpaywallData();

    // for accessing local resources from library
    const { library, hadleUpdateLibrary } = useLibraryContext();

    // for searching local resources in library
    const [errorSearchResources, loadingSearchResources, searchResources, handleSearchResources] = useSearchResources();

    // callback for initiating search
    const handleSubmitSearch = (query, target) => {
        switch (target) {
            case "local":
                setResourceLocation("local");
                handleSearchResources(library._id, query);
                break;

            case "online":
                setResourceLocation("online");
                handleGetUnpaywallData(query);
                break;
        }
    }

    // called each time page is rendered (via passing as a callback prop below)
    // and will dynamically return an array of resources depending on the
    // state of the resourceLocation
    const delegateResourceArray = () => {
        switch (resourceLocation) {
            case "local":
                if (!searchResources) { break; }
                console.log("passing local search results to ResourceBrowser")
                return searchResources;

            case "online":
                if (!unpaywallData) { break; }
                console.log("passing online search results to ResourceBrowser")
                return unpaywallData;
        }
    }


    const loading = () => {
        return (loadingSearchResources || loadingUnpaywallData);
    }

    // note we don't expect this to contain enything of we are searchin online
    console.log(searchResources);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                </IconButton>
                <SearchBar handleSubmitSearch={handleSubmitSearch} />
            </DrawerHeader>
            <Divider />
            {/* send result here to display */}
            <ResourceBrowser resourceArray={delegateResourceArray()} resourceLocation={resourceLocation} loading={loading()} />
        </Drawer>
    );
}
