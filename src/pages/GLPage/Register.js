import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Box, createTheme, ThemeProvider, Typography, Button } from '@mui/material';
import headerImage from "../../assets/icons/main-bg.jpg";
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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

const menuItemTheme = createTheme({
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                    fontWeight: 600,
                },
            },
        },
    },
});
  
const Register = () => {
    const god = importGodsImages(require.context('../../assets/icons/Gods', false, /\.(png|jpe?g|svg)$/));
    const navigate = useNavigate();
    const [num, setNum] = useState('');

    const handlePayerNumChange = (e) => {
        setNum(e.target.value)
    }

    const menuItems = [...new Array(20)].map((_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
            {index + 1}
        </MenuItem>
    ));

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
                    {/* Has to be dynamic and change according to the user's group */}
                    <Typography sx={{mt: 5}} variant='h1' fontWeight={800} fontSize='3rem' letterSpacing='0.3rem' color='#f2e3cc'>APHRODITE</Typography>
                </ThemeProvider>
                <Box>
                    <img sx={{mt: -1}} src={god['Aphrodite.png']} alt="SCSE TOP'24"/>
                </Box>
                <Box width={'100%'}>
                    <FormControl sx={{mt: 5, width: '85%'}}>
                        <InputLabel
                            id="numOfPlayersLabel"
                            sx={{
                                fontFamily: 'Rubik, sans-serif',
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '1.2rem',
                                paddingLeft: '0.5rem',
                                '&.Mui-focused': {
                                    color: '#000000',
                                    fontWeight: 600,
                                }, 
                            }} 
                            shrink={num !== ''}>
                            {num === '' ? 'No. of Players' : ''}
                        </InputLabel>
                        <ThemeProvider theme={menuItemTheme}>
                        <Select
                            labelId='numOfPlayersLabel'
                            id='select'
                            value={num}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={handlePayerNumChange}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 250,
                                    },
                                },
                            }}
                            sx={{
                                backgroundColor: '#f2e3cc',
                                color: '#000000',
                                fontWeight: 600,
                                fontSize: '1.2rem',
                                justifyContent: 'center',
                                '&.Mui-focused': {
                                    color: '#000000',
                                    fontWeight: 600,
                                    fontSize: '1.2rem',
                                    justifyContent: 'center',
                                }, 
                            }}>
                            {menuItems}
                        </Select>
                        </ThemeProvider>
                    </FormControl>
                </Box>
            </Box>
            <Box display="flex" mt={5} mb={12} justifyContent='space-around' width={'100%'}>
                {/* <NavigateNextIcon
                    onClick={() => {
                        if (num !== '') {
                            navigate('./form', { state: {num} });
                        }
                    }}
                    variant="contained"
                    sx={{
                        width: '40%',
                        borderRadius: '10px',
                        py: '0.7rem',
                        textTransform: 'capitalize',
                        fontSize: '22px',
                        backgroundColor: '#f2e3cc',
                        color: '#000000',
                        fontFamily: 'Rubik',
                        fontWeight: 600, 
                    ':hover': {
                        bgcolor: '#deb97dcf',
                    },
                    }}></NavigateNextIcon> */}
                    <Button
                    onClick={() => {
                        if (num !== '') {
                            navigate('./form', { state: {num} });
                        }
                    }}
                    variant="contained"
                    sx={{
                        width: '30%',
                        borderRadius: '10px',
                        py: '0.7rem',
                        textTransform: 'capitalize',
                        fontSize: '22px',
                        backgroundColor: '#f2e3cc',
                        color: '#000000',
                        fontFamily: 'Rubik',
                        fontWeight: 600, 
                    ':hover': {
                        bgcolor: '#deb97dcf',
                    },
                    }}>Next</Button>
            </Box>
        </div>
    )
}

export default Register