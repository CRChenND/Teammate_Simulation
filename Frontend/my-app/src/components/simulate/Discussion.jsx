import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const Discussion = ({ conversation }) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h7">Simulated Discussion</Typography>
        <Paper elevation={3} sx={{ p: 2, overflowY: 'auto', maxHeight: '400px'}}>
          {conversation.map((message, index) => (
            <div key={index}>
              <Typography variant="body1" fontWeight="bold">{message.speaker}:</Typography>
              <Typography variant="body1">{message.message}</Typography>
              <hr style={{ margin: '8px 0' }} />
            </div>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Discussion;
