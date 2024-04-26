import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Paper, Typography, Card, Avatar} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    const evaluationNav = () => {
        navigate('/evaluation');
      };

    const getTeamMembers = async () => {
        try{
            const response = await fetch('http://127.0.0.1:5000/get_team_members', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        } 
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        // load Team Members
        } else {
            console.error('Server responded with status:', response.status);
          };
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const getTeamConvo = async () => {
        try{
            const response = await fetch('http://127.0.0.1:5000/get_team_conversation', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        } 
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        // load Conversation
        } else {
            console.error('Server responded with status:', response.status);
          };
        } catch(error) {
            console.error('Error occurred:', error);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Box display="flex" alignItems="center" justifyContent="center" style={{ width: 'calc(100% - 120px)', margin: '0 60px' }}>
            <TextField 
                id="outlined-basic" 
                label="Input your team's task (i.e. How many potential applications of a paperclip can you think of?" 
                style={{ marginRight: '5px', flexGrow: 1 }} 
                variant="outlined" 
                />
                <Button variant="contained" style={{ height: '56px' }}>
                Generate
                </Button>
        </Box>
        {/* <Box sx={{flexGrow: 1}}> */}
        <Grid container spacing={2} sx={{ p: 5 }}>
            <Grid item xs={12} md={4}>
                <Typography variant="h7">Teammate Options</Typography>
                <Box sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}>
                <Paper elevation={3} sx={{ p:2}}>
                    {/* Example Teammate Members here */}
                    <Paper elevation={2} sx={{display:'flex'}}>
                        <Typography variant="h9" sx={{p:2}}>Teammate 1</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src="" // Add your image path here
                        />
                    </Paper>
                    <Paper elevation={2} sx={{display:'flex'}}>
                        <Typography variant="h9" sx={{p:2}}>Teammate 2</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src="" // Add your image path here
                        />
                    </Paper>
                    <Paper elevation={2} sx={{display:'flex'}}>
                        <Typography variant="h9" sx={{p:2}}>Teammate 3</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src="" // Add your image path here
                        />
                    </Paper>
                </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant="h7">Simulated Discussion</Typography>
                <Paper elevation={3} sx={{ p: 2 }}>
                </Paper>
            </Grid>
        </Grid>
        <Button variant="contained" onClick={evaluationNav}>Go to Evaluation</Button>   
        {/* </Box> */}
        </div>
    )
}

export default Main;