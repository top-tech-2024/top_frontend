import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'
import { Box } from '@mui/material'

const router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default router