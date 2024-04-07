import React, { useState } from 'react'
import { Button, TextField, Stack, FormControl, Box, createTheme, ThemeProvider } from '@mui/material';
import '../../styles/styles.scss'
import headerImage from "../../assets/icons/main-bg.jpg";
import SCSE_logo from '../../assets/icons/SCSE_logo.svg';
import login_logo from '../../assets/icons/login_logo.svg';
import { Link, useNavigate } from 'react-router-dom';


const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f2e3cc',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-outlined': {
            color: '#d5d5d5',
            '&.Mui-focused': {
              color: '#d5d5d5',
              }
            },
          '& .MuiOutlinedInput-root': {
            borderColor: '#f2e3cc',
            color: '#d5d5d5',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f2e3cc',
            color: '#d5d5d5',
            },
          '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f2e3cc',
            color: '#d5d5d5',
            },
          },
          "& .MuiInputLabel-outlined": {
            color: '#d5d5d5',
            '&.Mui-focused': {
                color: '#d5d5d5',
              }
            },
          '& .MuiOutlinedInput-input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0px 1000px rgba(0, 0, 0, 0) inset !important',
            backgroundColor: '#000000 !important',
            transitionDelay: '9999s', 
            transitionProperty: 'background-color, color',
            },
          },
          },
        },
      },
    }
  });

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      backgroundColor: "black",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${headerImage})`,
      backgroundSize: "cover",
    }}>
      <ThemeProvider theme={theme}>
      <FormControl fullWidth='true'>
        <Stack
          className="box-container"
          direction={'column'}
          alignItems={'center'}
          spacing={5}>
            <img src={login_logo} alt='Login Logo'/>
            <TextField
              id="outlined-basic"
              label="NTU Email"
              sx={{width: '80%'}}>
            </TextField>
            <TextField
              id="outlined-password-input"
              label="Password"
              type='password'
              sx={{width: '80%'}}>
            </TextField>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              sx={{
                borderRadius: '10px',
                fontSize: '18px',
                py: '10px',
                fontWeight: '600',
                width: '20%',
                textTransform: 'capitalize',
                color: '#000000',
                backgroundColor: '#f2e3cc',
                ':hover': {
                  bgcolor: '#f2e3cc4d',
                },
                }}>Sign In</Button>
      </Stack>
    </FormControl>
    <Box sx={{mt: 12}}>
    <img src={SCSE_logo} alt="SCSE TOP'24"/>
    </Box>
    </ThemeProvider>
    </div>
  )
}

export default LoginPage