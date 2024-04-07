import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/GLPage/Dashboard.js'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'
import Register from './pages/GLPage/Register.js'
import FormPage from './pages/GLPage/FormPage.js'

const router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/register" element={<Register />} />
            <Route path="/dashboard/register/form" element={<FormPage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default router