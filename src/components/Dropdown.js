import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';

export default function Dropdown(props) {

  return (
    <Box sx={{m: 2, minWidth: 40}}>
        <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.actionSelect}
          onChange={props.handleActionChange}
          autoWidth
          label="Select"
        >
          <MenuItem value={1}>Forward this message</MenuItem>
          <MenuItem value={2}>Always forward for Id: {props.number} </MenuItem>
          <MenuItem value={3}>Always forward from number: {props.from}</MenuItem>
        </Select>
   </Box>
  );
}
