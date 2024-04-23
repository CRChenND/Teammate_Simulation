import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'; 


const Main = () => {
  const navigate = useNavigate();
  const profileNav = () => {
    navigate("/profile");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}> 
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <Box display="flex" alignItems="center" justifyContent="center" style={{ marginBottom: '20px', width: '100%' }}>
        <TextField 
          id="outlined-basic" 
          label="Input your settings (e.g., age, gender, preference) for your team formation agents" 
          style={{ marginRight: '5px', flexGrow: 1 }} 
          variant="outlined" 
        />
        <Button variant="contained" onClick={profileNav} style={{ height: '56px' }}>
          Generate
        </Button>
      </Box>

      <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' }}>
        Profile description
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%', marginBottom: '20px' }}>
        <textarea 
          id="profile-description" 
        //   placeholder="Profile description" 
          style={{ height: '200px', flexGrow: 1, marginRight: '5px', border: '1px solid lightgray', borderRadius: '4px' }} 
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="h2">
            Portrait
          </Typography>
          <Avatar 
            style={{ height: '200px', width: '200px', marginTop: '10px' }}
            alt="Profile Avatar"
            src="" // Add your image path here
          />
        </Box>
      </Box>

        <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' }}>
                Attributes
        </Typography>
            <Box style={{ width: '100%' }}>

                <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <TextField id="first-name" label="First name" variant="outlined" />
                <TextField id="last-name" label="Last name" variant="outlined" />
                <TextField id="age" label="Age" variant="outlined" />
                <TextField id="gender" label="Gender" variant="outlined" />
                </Box>

                <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <TextField id="english-proficiency" label="English proficiency" variant="outlined" style={{ flex: 2 }} />
                <TextField id="major" label="Major" variant="outlined" style={{ flex: 1 }} />
                <TextField id="grade" label="Grade" variant="outlined" style={{ flex: 1 }} />
                </Box>
            </Box>

        

        


    



      
    </div>  
  );
}

export default Main;
