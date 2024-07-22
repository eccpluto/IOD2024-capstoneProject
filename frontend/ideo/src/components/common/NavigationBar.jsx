import { AppBar, Box, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material"
import React, { useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import SearchIcon from '@mui/icons-material/Search'
import PersistentSearchDrawer from "../PersistentSearchDrawer";

// A bar at the top of the viewport to allow the user to navigate the app
export default function NavigationBar(props) {

    const { user, handleUpdateUser } = useUserContext();

    // anchor elements for determining menu to popover
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // handlers
    const handleMenuClicked = (event) => {
        console.log('setting anchor element for menu');
        setAnchorElMenu(event.currentTarget);
    }
    const handleAccountClicked = (event) => {
        console.log('setting anchor element for account');
        setAnchorElAccount(event.currentTarget);
    }
    const handleDrawerOpen = (event) => {
        setDrawerOpen(true);
    }

    const handleDrawerClose = (event) => {
        setDrawerOpen(false);
    }
    const handleCloseAll = () => {
        setAnchorElMenu(null);
        setAnchorElAccount(null);
    }

    return (
        // box allows access to sx
        <Box sx={{ display: "flex" }}>
            {/* provides content and actions related to the screen */}
            <AppBar position="fixed" open={drawerOpen}>
                {/* center things horozontally*/}
                {/* <Container maxWidth="xl"> */}
                {/* a */}
                <Toolbar>
                    {/* Menu button */}
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        aria-controls='menu'
                        aria-haspopup="true"
                        onClick={handleMenuClicked}
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Menu menu */}
                    <Menu
                        id="menu"
                        anchorEl={anchorElMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={Boolean(anchorElMenu)}
                        onClose={handleCloseAll}
                    >
                        {/* menu items */}
                        <MenuItem key="landing" onClick={handleCloseAll}>
                            <NavLink to={"/"}>Home</NavLink>
                        </MenuItem>
                        {(!user) && (<MenuItem key="login" onClick={handleCloseAll}>
                            <NavLink to={"/login"}>Login</NavLink>
                        </MenuItem>)}
                        {(user) && (<MenuItem key="library" onClick={handleCloseAll}>
                            <NavLink to={"/library"}>Library</NavLink>
                        </MenuItem>)}
                    </Menu>
                    {/* Account button */}
                    {(user) && (
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="account"
                            aria-controls='account'
                            aria-haspopup="true"
                            onClick={handleAccountClicked}
                            color='inherit'
                            sx={{ mr: 2 }}
                        >
                            <AccountCircle />
                        </IconButton>
                    )}
                    {/* Account menu */}
                    <Menu
                        id="account"
                        anchorEl={anchorElAccount}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={Boolean(anchorElAccount)}
                        onClose={handleCloseAll}
                    >
                        <MenuItem key="account" onClick={handleCloseAll}>
                            <NavLink to={"/account"}>Account</NavLink>
                        </MenuItem>
                        <MenuItem key="logout" onClick={() => {
                            handleCloseAll();
                            handleUpdateUser(null);
                        }
                        }>
                            <NavLink to={"/logout"}>Logout</NavLink>
                        </MenuItem>
                    </Menu>
                    {/* Seach button */}
                    <Box sx={{
                        width: "100vw",
                        display: "flex",
                        flexDirection: "row-reverse"
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="search"
                            aria-controls='search'
                            aria-haspopup="true"
                            onClick={handleDrawerOpen}
                            color='inherit'
                            // remove the button when SearchDrawer is open
                            sx={{ ...(drawerOpen && { display: 'none' }) }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                {/* </Container> */}
            </AppBar>
            {/* ClippedDrawer is a child of this component */}
            <PersistentSearchDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} />
        </Box>
    )
}