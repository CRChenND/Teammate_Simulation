import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

const LeadershipGrid = ({ selectedLeadership }) => {
  const [selectedId, setSelectedId] = useState(selectedLeadership);

  useEffect(() => {
    setSelectedId(selectedLeadership);
    selectCell(selectedLeadership);
  }, [selectedLeadership]);

  const selectCell = (id) => {
    setSelectedId(id);
  };

  const leadershipStyles = [
    { name: 'Coercive | Boss', id: 'coercive' },
    { name: 'Democratic | Listener', id: 'democratic' },
    { name: 'Authoritative | Visionary', id: 'authoritative' },
    { name: 'Pace-setting | Hustler', id: 'pacesetting' },
    { name: 'Affiliative | Carer', id: 'affiliative' },
    { name: 'Coaching | Mentor', id: 'coaching' },
  ];

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {leadershipStyles.map((style) => (
        <Grid item key={style.id} xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant={selectedId === style.id ? "contained" : "outlined"}
            onClick={() => selectCell(style.id)}
            style={{
              height: '56px',
              justifyContent: 'flex-start',
              backgroundColor: selectedId === style.id ? '#4caf50' : 'inherit', // Using hex color for green
            }}
          >
            {style.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default LeadershipGrid;
