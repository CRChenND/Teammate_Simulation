import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';

const marks_openness = [
  { value: 0, label: 'Close' },
  { value: 100, label: 'Open' }
];

const marks_conscientiousness = [
  { value: 0, label: 'Spontaneous' },
  { value: 100, label: 'Conscientious' }
];

const marks_extraversion = [
  { value: 0, label: 'Introverted' },
  { value: 100, label: 'Extroverted' }
];

const marks_agreeableness = [
  { value: 0, label: 'Hostile' },
  { value: 100, label: 'Agreeable' }
];

const marks_neuroticism = [
  { value: 0, label: 'Stable' },
  { value: 100, label: 'Neurotic' }
];

function valuetext(value) {
  return `${value}`;
}

const traitDescriptions = {
  openness: "Openness to Experience: This trait involves the desire to try new things and engage in creative activities. It reflects how open-minded you are.",
  conscientiousness: "Conscientiousness: This measures how organized and dependable you are. It involves your level of discipline and how meticulous you are with your tasks.",
  extraversion: "Extraversion: This trait shows how much you enjoy social interactions and being around people. High scores indicate you are outgoing and energetic.",
  agreeableness: "Agreeableness: This measures your level of cooperation and kindness towards others.",
  neuroticism: "Neuroticism: This trait involves emotional sensitivity and how often you experience negative emotions."
};

function TraitSliders(props) {
  const [openness, set_openness] = useState(props.initialValues.openness);
  const [conscientiousness, set_conscientiousness] = useState(props.initialValues.conscientiousness);
  const [extraversion, set_extraversion] = useState(props.initialValues.extraversion);
  const [agreeableness, set_agreeableness] = useState(props.initialValues.agreeableness);
  const [neuroticism, set_neuroticism] = useState(props.initialValues.neuroticism);

  // This effect updates the state whenever the initialValues prop changes
  useEffect(() => {
    set_openness(props.initialValues.openness);
    set_conscientiousness(props.initialValues.conscientiousness);
    set_extraversion(props.initialValues.extraversion);
    set_agreeableness(props.initialValues.agreeableness);
    set_neuroticism(props.initialValues.neuroticism);
  }, [props.initialValues]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'].map((trait, index) => (
        <Box key={trait} sx={{
        width: '100%',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }}>
        
        <Tooltip title={traitDescriptions[trait]} placement="top">
            <Typography gutterBottom>
              {trait}
            </Typography>
        </Tooltip>

        <Slider
            aria-labelledby={`slider-${trait.toLowerCase()}`}
            getAriaValueText={valuetext}
            value={eval(trait.toLowerCase())}
            onChange={(e, value) => eval(`set_${trait}(${value})`)}
            marks={eval(`marks_${trait}`)}
            sx={{ width: '80%' }}
        />
        </Box>
    ))}
    </div>
  );
}

export default TraitSliders;
