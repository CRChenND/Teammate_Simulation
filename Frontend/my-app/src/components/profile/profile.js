import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'; 
import LeadershipGrid from './leadershipGrid';
import Dialog from '@mui/material/Dialog';
import LinearProgress from '@mui/material/LinearProgress';
import TraitSliders from './traitSlider';



const Main = () => {

  const [profileDescription, setProfileDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [englishProficiency, setEnglishProficiency] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [personalityTraits, setPersonalityTraits] = useState({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  });
  const [selectedLeadership, setSelectedLeadership] = useState(null);

  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const profileNav = () => {
    navigate('/simulate');
  };

  const generatePersona = async () => {
    try {
      // Get the value from the TextField
      setLoading(true); 
      const inputElement = document.getElementById('outlined-basic');
      const inputValue = inputElement.value;

      // Send the input to the server endpoint
      const response = await fetch('http://127.0.0.1:5000/generate_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guidance: inputValue })
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Server Response:', jsonResponse);

        setProfileDescription(jsonResponse["profile"]["profile"]);
        setFirstName(jsonResponse["profile"]["first_name"]);
        setLastName(jsonResponse["profile"]["last_name"]);
        setAge(jsonResponse["profile"]["age"]);
        setGender(jsonResponse["profile"]["gender"]);
        setEnglishProficiency(jsonResponse["profile"]["english_proficiency"]);
        setMajor(jsonResponse["profile"]["major"]);
        setGrade(jsonResponse["profile"]["grade"]);

        setImageURL(jsonResponse["image"])

        setSelectedLeadership(jsonResponse["profile"]["leadership_traits"]);
        
        const personalityTraits = jsonResponse["profile"]["personality_traits"];

        const convertedTraits = Object.keys(personalityTraits).reduce((acc, key) => {
          acc[key] = parseInt(personalityTraits[key], 10);
          return acc;
        }, {});

        setPersonalityTraits(convertedTraits);
      } else {
        console.error('Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false); 
    }
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
        <Button variant="contained" onClick={generatePersona} style={{ height: '56px' }}>
          Generate
        </Button>
      </Box>

      <Dialog open={loading} aria-labelledby="loading-dialog-title">
        <LinearProgress />
        <div style={{ padding: 20, textAlign: 'center' }}>Please wait, generating data...</div>
      </Dialog>

      <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '60px', marginTop: '20px', marginBottom: '5px', fontSize:"24px", fontWeight:"bold"}}>
        Profile description
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" style={{ width: 'calc(100% - 120px)', margin: '0 60px' }}>
        <textarea 
          id="profile-description" 
          style={{ height: '200px', flexGrow: 1, marginRight: '5px', border: '1px solid lightgray', borderRadius: '16px' , padding:"20px", fontSize:"18px"}} 
          value={profileDescription} 
          onChange={(e) => setProfileDescription(e.target.value)} 
        />
        <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: '30px' }}>
          <Typography variant="h6" component="h2">
            Portrait
          </Typography>
          <Avatar 
            style={{ height: '180px', width: '180px', marginTop: '10px' }}
            alt="Profile Avatar"
            src={imageURL}
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
        <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '10px',  marginBottom: '10px', fontSize:"18px", fontWeight:"bold"}}>
          Basic information
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <TextField id="first-name" label="First name" variant="outlined" style={{width: '30%'}} value={firstName} onChange={(e) => setFirstName(e.target.value)} InputLabelProps={{shrink: true}}/>
          <TextField id="last-name" label="Last name" variant="outlined" style={{width: '30%'}} value={lastName} onChange={(e) => setLastName(e.target.value)} InputLabelProps={{shrink: true}}/>
          <TextField id="age" label="Age" variant="outlined" style={{width: '30%'}} value={age} onChange={(e) => setAge(e.target.value)} InputLabelProps={{shrink: true}}/>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
          <TextField id="gender" label="Gender" variant="outlined" style={{width: '20%'}} value={gender} onChange={(e) => setGender(e.target.value)} InputLabelProps={{shrink: true}}/>
          <TextField id="english-proficiency" label="English proficiency" variant="outlined" style={{width: '20%'}} value={englishProficiency} onChange={(e) => setEnglishProficiency(e.target.value)} InputLabelProps={{shrink: true}}/>
          <TextField id="major" label="Major" variant="outlined" style={{width: '20%'}} value={major} onChange={(e) => setMajor(e.target.value)} InputLabelProps={{shrink: true}}/>
          <TextField id="grade" label="Grade" variant="outlined" style={{width: '20%'}} value={grade} onChange={(e) => setGrade(e.target.value)} InputLabelProps={{shrink: true}}/>
        </Box>

        <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '10px',  marginBottom: '10px', fontSize:"18px", fontWeight:"bold"}}>
          Personality traits
        </Typography>

        <TraitSliders initialValues={personalityTraits} />

        <Typography variant="h6" component="h2" style={{ alignSelf: 'flex-start' , marginLeft: '10px', marginBottom: '5px', fontSize:"18px", fontWeight:"bold"}}>
          Leadership
        </Typography>

        <LeadershipGrid selectedLeadership={selectedLeadership} />

      </Box>


      <Box display="flex" justifyContent="center" style={{ width: '100%', marginTop: '20px' }}>
        <Button variant="contained" onClick={profileNav} style={{ height: '56px' }}>
          Simulate
        </Button>
      </Box>
      
    </div>  
  );
}

export default Main;
