import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage/RegisterPage.js'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'
import NavBar from './components/NavBar/NavBar.js'
import { Box } from '@mui/material'

const router = () => {
  return (
    <div>
        <NavBar/>
        <Box sx={{mt: 4, mr: 3, ml: 3}}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
    </div>
  )
}

export default router