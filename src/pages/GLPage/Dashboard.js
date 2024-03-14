import React, { useState } from 'react'
import { Button, Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import '../../styles/styles.scss'
import { useNavigate } from 'react-router-dom';

function importGodsImages(god) {
  let images = {};
  god.keys().forEach((item, index) => { images[item.replace('./', '')] = god(item); });
  return images;
}

const godName = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'sans-serif',
    ].join(','),
  },
});

const title = createTheme({
  typography: {
    fontFamily: [
      'Germania One',
      'system-ui',
    ].join(','),
  },
});

const Dashboard = () => {
  const god = importGodsImages(require.context('../../assets/icons/Gods', false, /\.(png|jpe?g|svg)$/));
  const navigate = useNavigate();
  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
          <ThemeProvider theme={godName}>
            <Typography sx={{mt: 5}} variant='h1' fontWeight={800} fontSize='3rem' letterSpacing='0.3rem' color='#865746b8'>APHRODITE</Typography>
          </ThemeProvider>
          <Box>
            <img sx={{mt: -1}} src={god['Aphrodite.png']} alt="SCSE TOP'24"/>
          </Box>
          <ThemeProvider theme={title}>
            <Typography sx={{mt: 1}} variant='h2' fontWeight={400} fontSize='3rem' letterSpacing='0.1rem'>Welcome, GL</Typography>
          </ThemeProvider>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={4} mt={5}>
            <Button
              onClick={() => navigate()}
              variant="contained"
              sx={{
                borderRadius: '10px',
                px: '2rem',
                py: '1rem',
                textTransform: 'capitalize',
                fontSize: '22px',
                backgroundColor: '#f2e3cc', 
                color: '#000000',
                fontFamily: 'Rubik',
                fontWeight: 600,
              ':hover': {
                bgcolor: '#deb97dcf',
              },
            }}>Register Players</Button>
            <Button
              onClick={() => navigate()}
              variant="contained"
              sx={{
                borderRadius: '10px',
                px: '2rem',
                py: '1rem',
                textTransform: 'capitalize',
                fontSize: '22px',
                backgroundColor: '#f2e3cc',
                color: '#000000',
                fontFamily: 'Rubik',
                fontWeight: 600, 
              ':hover': {
                bgcolor: '#deb97dcf',
              },
            }}>Book Facilities</Button>
          </Box>
      </Box>
    </div>
  )
}

export default Dashboard