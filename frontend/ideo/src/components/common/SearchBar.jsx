import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react";

export default function SearchBar(props) {
    const [query, setQuery] = useState('');
    const [searchTaget, setSearchTarget] = useState("online");
    const { handleSubmitSearch } = props;

    const handlePreSubmit = (e) => {
        e.preventDefault();
        console.log('submitting query.')
        handleSubmitSearch(query, searchTaget);
    }

    const handleSearchTargetChange = (e) => {
        setSearchTarget(e.target.value);
    }

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
                sx={{width: 360}}
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
                    <FormControlLabel value="library"
                        control={<Radio />} label="Library" />
                </RadioGroup>
            </FormControl>
        </form>
    );
}