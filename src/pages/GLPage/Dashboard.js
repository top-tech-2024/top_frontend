import React from 'react'
import { Button, Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import headerImage from "../../assets/icons/main-bg.jpg";
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const data = location.state;

  console.log(data.emails);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "black",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${headerImage})`,
      backgroundSize: "cover",
    }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} sx={{mt: 7, mr: 3, ml: 3}}>
          <ThemeProvider theme={godName}>
            <Typography sx={{mt: 5}} variant='h1' fontWeight={800} fontSize='3rem' letterSpacing='0.3rem' color='#f2e3cc'>APHRODITE</Typography>
          </ThemeProvider>
          <Box>
            <img sx={{mt: -1}} src={god['Aphrodite.png']} alt="SCSE TOP'24"/>
          </Box>
          <ThemeProvider theme={title}>
            <Typography sx={{mt: 5}} variant='h2' fontWeight={400} fontSize='3rem' letterSpacing='0.1rem' color='#FFFFFF'>Welcome, GL</Typography>
          </ThemeProvider>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={4} mt={3} mb={5}>
            <Button
              onClick={() => navigate("./register")}
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
                onClick={() => navigate('./login')}
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