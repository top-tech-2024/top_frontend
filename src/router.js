import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GamesPage from "./pages/GamesPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import MapPage from "./pages/MapPage.tsx";
import AddPointsPage from "./pages/AddPointsPage.tsx";

const router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/games" element={<GamesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:venue" element={<MapPage />} />
        <Route path="/update-points" element={<AddPointsPage />} />
      </Routes>
    </div>
  );
};

export default router;
