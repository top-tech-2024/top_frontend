import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/GLPage/Dashboard.js'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'
import NavBar from './components/NavBar/NavBar.js'
import Register from './pages/GLPage/Register.js'
import { Box } from '@mui/material'

const router = () => {
  return (
    <div>
        <NavBar/>
        <Box sx={{mt: 4, mr: 3, ml: 3}}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
          </Routes>
        </Box>
    </div>
  )
}

export default router