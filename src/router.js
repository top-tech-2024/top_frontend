import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/RegisterPage/RegisterPage.js";
import Login from "./pages/LoginPage/LoginPage.js";
import HomePage from "./pages/HomePage.tsx";
import GamesPage from "./pages/GamesPage.tsx";

const router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </div>
  );
};

export default router;
