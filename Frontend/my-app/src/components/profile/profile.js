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
      <Box display="flex" alignItems="center" justifyContent="center" style={{ width: 'calc(100% - 120px)', margin: '0 60px' }}>
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

      <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '60px', marginTop: '20px', marginBottom: '5px', fontSize:"24px", fontWeight:"bold"}}>
        Profile description
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" style={{ width: 'calc(100% - 120px)', margin: '0 60px' }}>
        <textarea 
          id="profile-description" 
        //   placeholder="Profile description" 
          style={{ height: '200px', flexGrow: 1, marginRight: '5px', border: '1px solid lightgray', borderRadius: '16px' }} 
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="h2">
            Portrait
          </Typography>
          <Avatar 
            style={{ height: '180px', width: '180px', marginTop: '10px', marginLeft }}
            alt="Profile Avatar"
            src="" // Add your image path here
          />
        </Box>
      </Box>

        <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '60px', marginTop: '20px', marginBottom: '5px', fontSize:"24px", fontWeight:"bold"}}>
                Attributes
        </Typography>
        
        <Box style={{ width: 'calc(100% - 160px)', margin: '0 80px', padding: '20px', border: '1.5px solid grey', borderRadius: '8px' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>First name:</Typography>
                <TextField id="first-name" label="First name" variant="outlined" style={{width:'200px'}}/>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>Last name:</Typography>
                <TextField id="last-name" label="Last name" variant="outlined"/>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>Age:</Typography>
                <TextField id="age" label="Age" variant="outlined" />
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>Gender:</Typography>
                <TextField id="gender" label="Gender" variant="outlined" />
            </Box>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>English proficiency:</Typography>
                  <TextField id="english-proficiency" label="English proficiency" variant="outlined" style={{ width:'400px' }} />
              </Box>
              <Box style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>Major:</Typography>
                  <TextField id="major" label="Major" variant="outlined" style={{ width:'250px'}} />
              </Box>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" style={{ marginRight: '10px', fontSize:"21px", fontWeight:"bold" }}>Grade:</Typography>
                  <TextField id="grade" label="Grade" variant="outlined" style={{ width:'250px' }} />
              </Box>
          </Box>
      </Box>
 
    </div>  
  );
}

export default Main;
