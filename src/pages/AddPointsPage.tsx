import React from "react";
import AddPoints from "../components/AddPoints.tsx";
import gamesBackground from "../assets/games-bg.webp";

const AddPointsPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingTop: "20vh",
        paddingBottom: "20vh",
        backgroundColor: "black",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${gamesBackground})`,
        backgroundSize: "cover",
      }}
    >
      <AddPoints />
    </div>
  );
};

export default AddPointsPage;
