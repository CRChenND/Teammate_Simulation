import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const Main = () => {

    const url = "127.0.0.1:5000"
    const navigate = useNavigate();
    const profileNav = () => {
        navigate("/profile");
      };

    const [textInput, setTextInput] = useState("");

    const handleChange = (e) => {
        setTextInput(e.target.value)
        console.log(textInput)
    };

    const onSubmit = () => { 
        return (
            fetch("/generate_profile", {
                method: 'POST',
                headers:{
                    'type': 'application/json',
                },
                body: JSON.stringify(textInput)
          }).then(response => response.json())
          .then(data => console.log(data)
          
        )
    );
        
    }

    
    // useEffect(() => {
    //   fetch({url}+"/generate_profile"), {
    //     method: 'POST',
    //     headers:{
    //         'guidance': 'content_string',
    //     },
    //     body: JSON.stringify("content")
    //   }
    // }, []
    // );

    return (
        <div>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <Box display="flex" justifyItems="center" padding="12px">
                <TextField id="outlined-basic" label="Hello World" variant="outlined" fullWidth={true} onChange={handleChange}/>
                <Button variant="contained" onClick={onSubmit} className="btn btn-secondary me-2" style={{ marginLeft: '5px' }}>
                    Generate
                </Button>
            </Box>

        </div>
    )
}
export default Main;