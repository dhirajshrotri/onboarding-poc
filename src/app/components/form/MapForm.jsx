import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MapForm (props) {
    return (
        <div>
            <Box>
                <TextField id="outlined-basic" label="longitude" variant="outlined" name="longitude" onChange={props.handleChange}/>
                <TextField id="outlined-basic" label="latitude" variant="outlined" name="latitude" onChange={props.handleChange}/>
                <TextField id="outlined-basic" label="radius" variant="outlined" name="radius" onChange={props.handleChange}/>
            </Box>
            <Button variant="outlined" onClick={props.handleSubmit}>Enter</Button>
        </div>
    )
}