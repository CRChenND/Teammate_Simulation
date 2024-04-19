import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Main = () => {

    const navigate = useNavigate();
    const profileNav = () => {
        navigate("/profile");
      };


    return (
        <div>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <Box display="flex" justifyItems="center" padding="12px">
                    <TextField id="outlined-basic" label="Hello World" variant="outlined" fullWidth="True"/>


                <Button variant="contained" onClick={profileNav} className="btn btn-secondary me-2" style={{ marginLeft: '5px' }}>
                Generate
                </Button>
            </Box>

        </div>
    )
}
export default Main;