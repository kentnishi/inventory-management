import React, { useState, ChangeEvent } from 'react'
import { Box, TextField } from '@mui/material'



const SearchInventory = ({ onSearch, className }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <TextField
            label="Search"
            variant="outlined"
            value={query}
            onChange={handleSearch}
            className={className}
            width= {'100%'}
        />
    )

}

export default SearchInventory;