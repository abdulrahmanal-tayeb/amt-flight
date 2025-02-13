import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Container, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Nav() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };


    const menuItems = [
        ["Home", "/"],
        ["Flights", "/flights/"]
    ];

    return (
        <>
            {/* Top Navigation Bar */}
            <AppBar sx={{ backgroundColor: "#1271858f" }} position="static">
                <Toolbar>
                    {/* Menu button for small screens */}
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { xs: "block", md: "none" } }}>
                        <MenuIcon />
                    </IconButton>

                    {/* Logo or Title */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Amt Flight
                    </Typography>

                    {/* Desktop Menu Items */}
                    <Container sx={{ display: { textAlign: "right", xs: "none", md: "block" } }}>
                        <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
                            {menuItems.map(([key, value]) => (
                                <Link className="nav-link" to={value} key={key} color="inherit">
                                    {key}
                                </Link>
                            ))}
                        </Stack>
                    </Container>
                </Toolbar>
            </AppBar>

            {/* Drawer (Sidebar) for Small Screens */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map(([key, value]) => (
                        <ListItem button key={key} onClick={toggleDrawer(false)}>
                            <Link className="nav-link" to={value} color="inherit">
                                {key}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
