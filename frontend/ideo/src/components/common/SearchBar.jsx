import { FormControl, FormControlLabel, FormLabel, IconButton, Popover, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function SearchBar(props) {
    const [query, setQuery] = useState('');
    const [searchTaget, setSearchTarget] = useState("online");
    const { handleSubmitSearch } = props;

    // anchor location for popup message
    const [anchorEl, setAnchorEl] = useState(null);

    // for checking if the search should give access to local resources
    const { user } = useUserContext();

    const handlePreSubmit = (e) => {
        e.preventDefault();
        console.log('submitting query.')
        // alert(searchTaget)
        handleSubmitSearch(query, searchTaget);
    }

    const handleSearchTargetChange = (e) => {
        setSearchTarget(e.target.value);
    }

    // popup handlers for when local search is disabled
    const handlePopoverOpen = (e) => {
        console.log('handlingPopoverOpen');
        setAnchorEl(e.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    // quick cast the open state of the popover
    const open = Boolean(anchorEl);

    return (
        // <form onSubmit={(e) => handleSubmit(e)}>
        <form onSubmit={(e) => handlePreSubmit(e)}>
            <TextField
                id="searchBar"
                value={query}
                onInput={(e) => setQuery(e.target.value)}
                label="Search.."
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 360 }}
            />

            <IconButton
                type="submit"
                aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
            <FormControl>
                <FormLabel
                    id="search-source-radio-group">
                    Source:
                </FormLabel>
                <RadioGroup
                    aria-labelledby="search-source-radio-group"
                    name="controlled-search-source-group"
                    row
                    value={searchTaget}
                    onChange={handleSearchTargetChange} >
                    <FormControlLabel value="online"
                        control={<Radio />} label="Online" />
                    {user._id ? <FormControlLabel value="local"
                        control={<Radio />} label="Local" />
                        : <FormControlLabel value="local"
                            control={<Radio />} label="Local" disabled
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        />}
                    <Popover
                        id="local-radio-popover"
                        sx={{
                            pointerEvents: 'none'
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>Login to enable.</Typography>

                    </Popover>
                </RadioGroup>
            </FormControl>
        </form>
    );
}