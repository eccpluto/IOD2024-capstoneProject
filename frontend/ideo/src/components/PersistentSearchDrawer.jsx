import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SearchBar } from './common';
import ResourceBrowser from './ResourceBrowser';
import useUnpaywallData from '../hooks/useUnpaywallData';

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
    const handlePushToLibrary = props.handlePushToLibrary

    // for online resouces, hook into unpaywall
    const [unpaywallData, getUnpaywallData] = useUnpaywallData();

    // callback for initiating search
    const handleSubmitSearch = (query, target) => {
        switch (target) {
            case "local":
                // setSourceTarget
                break;

            case "online":
                getUnpaywallData(query);
                break;
        }
    }

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
            <ResourceBrowser resourceArray={unpaywallData} browserVariant="unpaywall" />
        </Drawer>
    );
}
