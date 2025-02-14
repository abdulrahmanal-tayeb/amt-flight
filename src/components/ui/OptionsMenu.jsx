import React, { useCallback, useState } from "react";
import { Menu, MenuItem, Button, IconButton, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function OptionsMenu({
    onChange
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [adults, setAdults] = useState(0); // Default: 1 adult
    const open = Boolean(anchorEl);


    const changeAdultsCount = useCallback((increasing) => {
        setAdults((previous) => {
            const newValue = Math.max(0, Math.min(previous + (increasing ? 1 : -1), 10));
            onChange && onChange(newValue);
            return newValue;
        })
    }, [onChange]);

    return (
        <div>
            {/* Button to open the menu */}
            <Button sx={{width: "100%", maxWidth: 150, borderColor: "gray"}} color="inherit" variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Stack sx={{flexGrow: 1}} direction="row" justifyContent="space-between">
                    <PersonIcon />
                    <ArrowDropDownIcon />
                </Stack>
            </Button>

            {/* Menu Dropdown */}
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <MenuItem disableRipple>
                    <Typography variant="body1">Adults</Typography>
                    <IconButton onClick={() => changeAdultsCount(false)} disabled={adults === 0}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{adults}</Typography>
                    <IconButton onClick={() => changeAdultsCount(true)} disabled={adults === 10}>
                        <AddIcon />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    );
};