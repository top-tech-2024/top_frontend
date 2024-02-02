import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage/RegisterPage.js'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'

const router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default router