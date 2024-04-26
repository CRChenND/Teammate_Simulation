import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Paper, Typography, Card, Avatar} from '@mui/material';
import {json, useNavigate} from 'react-router-dom';
import Discussion from './Discussion';
import Dialog from '@mui/material/Dialog';
import LinearProgress from '@mui/material/LinearProgress';

const Main = () => {
    const navigate = useNavigate();

    const [imageURL, setImageURL] = useState('');

    const evaluationNav = () => {
        navigate('/evaluation');
      };

    const [name, setName] = useState('');

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
        setName(jsonResponse["name"]);
        setImageURL(jsonResponse['image']);
        } else {
            console.error('Server responded with status:', response.status);
          };
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const inputElement = document.getElementById('outlined-basic');
    const inputValue = inputElement.value;
    const [conversation, setConversation] = useState([]);

    const [loading, setLoading] = useState(false); 

    const getTeamConvo = async () => {
        try{
            setLoading(true); 
            const response = await fetch('http://127.0.0.1:5000/get_team_conversation', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ topic: inputValue })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            setConversation(jsonResponse["conversation"]);
            
            // load Conversation
            } else {
                console.error('Server responded with status:', response.status);
            };
        } catch(error) {
                console.error('Error occurred:', error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        getTeamMembers();
    }, []); 

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
                <Button variant="contained" onClick={getTeamConvo} style={{ height: '56px' }}>
                Generate
                </Button>
        </Box>
        
        <Dialog open={loading} aria-labelledby="loading-dialog-title">
            <LinearProgress />
            <div style={{ padding: 20, textAlign: 'center' }}>Please wait, generating data...</div>
        </Dialog>

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
                        <Typography variant="h9" sx={{p:2}}>{name}</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src={imageURL}
                        />
                    </Paper>
                    <Paper elevation={2} sx={{display:'flex'}}>
                        <Typography variant="h9" sx={{p:2}}>ALice</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src="https://as1.ftcdn.net/v2/jpg/01/94/29/04/1000_F_194290469_d7d6f6KmCsldKgtgImtsPQqkQ3QG1l9V.jpg" // Add your image path here
                        />
                    </Paper>
                    <Paper elevation={2} sx={{display:'flex'}}>
                        <Typography variant="h9" sx={{p:2}}>Bob</Typography>
                        <Avatar 
                            style={{ height: '30px', width: '30px', marginTop: '10px' }}
                            alt="Profile Avatar"
                            src="https://as1.ftcdn.net/v2/jpg/01/97/11/64/1000_F_197116416_hpfTtXSoJMvMqU99n6hGP4xX0ejYa4M7.jpg"
                        />
                    </Paper>
                </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Discussion conversation={conversation} />
            </Grid>
        </Grid>
        <Button variant="contained" onClick={evaluationNav}>Go to Evaluation</Button>   
        {/* </Box> */}
        </div>
    )
}

export default Main;