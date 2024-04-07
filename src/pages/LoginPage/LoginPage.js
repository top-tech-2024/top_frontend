import React, { useState } from 'react'
import { Button, TextField, Stack, FormControl, Box, createTheme, ThemeProvider } from '@mui/material';
import '../../styles/styles.scss'
import login_logo from '../../assets/icons/login_logo.svg';
import SCSE_logo from '../../assets/icons/SCSE_logo.svg';
import headerImage from "../../assets/icons/main-bg.jpg";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e6ac8b',
            },
            '&:hover fieldset': {
              borderColor: '#e6ac8b',
              borderWidth: '0.15rem',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e6ac8b',
            },
          },
        },
      },
    },
  }
})

const LoginPage = () => {
  const navigate = useNavigate();
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
      <ThemeProvider theme={theme}>
      <FormControl fullWidth>
        <Stack
          direction={'column'}
          alignItems={'center'}
          spacing={3}>
            <img src={login_logo} alt='Login Logo'/>
            <TextField
              id="outlined-basic"
              label="NTU Email"
              fullWidth>
            </TextField>
            <TextField
              id="outlined-password-input"
              label="Password"
              fullWidth>
            </TextField>
            <Button
              onClick={() => navigate("/Home")}
              variant="contained"
              sx={{
                borderRadius: '30px',
                px: '38px',
                width: '50%',
                backgroundColor: '#e6ac8b', 
                ':hover': {
                  bgcolor: '#e6ac8b',
                },
                }}>Sign In</Button>
      </Stack>
    </FormControl>
    <Box sx={{mt: 6}}>
    <img src={SCSE_logo} alt="SCSE TOP'24"/>
    </Box>
    </ThemeProvider>
    </div>
  )
}

export default LoginPage