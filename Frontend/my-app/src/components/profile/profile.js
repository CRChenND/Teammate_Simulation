import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'; 
import Slider from '@mui/material/Slider';

// Define marks for each slider
const marksOpenness = [
  { value: 0, label: 'Close' },
  { value: 100, label: 'Open' }
];

const marksConscientiousness = [
  { value: 0, label: 'Spontaneous' },
  { value: 100, label: 'Conscientious' }
];

const marksExtraversion = [
  { value: 0, label: 'Introverted' },
  { value: 100, label: 'Extroverted' }
];

const marksAgreeableness = [
  { value: 0, label: 'Hostile' },
  { value: 100, label: 'Agreeable' }
];

const marksNeuroticism = [
  { value: 0, label: 'Stable' },
  { value: 100, label: 'Neurotic' }
];

function valuetext(value) {
  return `${value}`;
}

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
          style={{ height: '200px', flexGrow: 1, marginRight: '5px', border: '1px solid lightgray', borderRadius: '16px' }} 
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="h2">
            Portrait
          </Typography>
          <Avatar 
            style={{ height: '180px', width: '180px', marginTop: '10px' }}
            alt="Profile Avatar"
            src="" // Add your image path here
          />
        </Box>
      </Box>

      <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '60px', marginTop: '20px', marginBottom: '5px', fontSize:"24px", fontWeight:"bold"}}>
        Attributes
      </Typography>
      
      <Box style={{
        width: 'calc(100% - 160px)', 
        margin: '0 80px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px', 
        border: '1.5px solid grey', 
        borderRadius: '8px'
      }}>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <TextField id="first-name" label="First name" variant="outlined" style={{width: '30%'}} />
          <TextField id="last-name" label="Last name" variant="outlined" style={{width: '30%'}} />
          <TextField id="age" label="Age" variant="outlined" style={{width: '30%'}} />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <TextField id="gender" label="Gender" variant="outlined" style={{width: '30%'}} />
          <TextField id="english-proficiency" label="English proficiency" variant="outlined" style={{width: '30%'}} />
          <TextField id="major" label="Major" variant="outlined" style={{width: '30%'}} />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <TextField id="grade" label="Grade" variant="outlined" style={{width: '30%'}} />
        </Box>
        {['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'].map((trait, index) => (
          <Box key={trait} sx={{ width: 250, marginBottom: '20px' }}>
            <Typography id={`slider-${trait.toLowerCase()}`} gutterBottom>
              {trait}
            </Typography>
            <Slider
              track="inverted"
              aria-labelledby={`slider-${trait.toLowerCase()}`}
              getAriaValueText={valuetext}
              defaultValue={50}
              marks={eval(`marks${trait}`)}
            />
          </Box>
        ))}
        <Box display="flex" justifyContent="center" style={{ width: '100%', marginTop: '20px' }}>
        <Button variant="contained" onClick={profileNav} style={{ height: '56px' }}>
          Simulate
        </Button>
        </Box>
      </Box>
    </div>  
  );
}

export default Main;
