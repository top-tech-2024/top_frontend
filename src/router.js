import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/RegisterPage/RegisterPage.js";
import Login from "./pages/LoginPage/LoginPage.js";
import HomePage from "./pages/HomePage.tsx";

const router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default router;
