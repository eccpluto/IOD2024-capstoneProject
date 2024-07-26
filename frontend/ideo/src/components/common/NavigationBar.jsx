import { AppBar, Box, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material"
import React, { useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import SearchIcon from '@mui/icons-material/Search'
import PersistentSearchDrawer from "../PersistentSearchDrawer";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// A bar at the top of the viewport to allow the user to navigate the app
export default function NavigationBar(props) {

    const { toggleTheme } = props;

    const theme = useTheme();

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
                        {(!user.name) && (<MenuItem key="login" onClick={handleCloseAll}>
                            <NavLink to={"/login"}>Login</NavLink>
                        </MenuItem>)}
                        {(user.name) && (<MenuItem key="library" onClick={handleCloseAll}>
                            <NavLink to={"/library"}>Library</NavLink>
                        </MenuItem>)}
                    </Menu>
                    {/* Account button */}
                    {(user.name) && (
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
                            handleUpdateUser({});
                        }
                        }>
                            <NavLink to={"/logout"}>Logout</NavLink>
                        </MenuItem>
                    </Menu>
                    <Box sx={{ display: "flex"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                // mr: 2,
                                p: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                            }}
                        >
                            Ideo
                        </Typography>
                        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>

                    </Box>
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