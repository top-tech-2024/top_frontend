import React from "react";
import Leaderboard from "../components/Leaderboard.tsx";
import Top3Display from "../components/Top3Display.tsx";
import {
  amazingRaceLeaderboard,
  massGamesLeaderboard,
  battleshipLeaderboard,
} from "../database/leaderboardResults.tsx";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const LeaderboardPage: React.FC = () => {
  const [alignment, setAlignment] = React.useState("amazing-race");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null && newAlignment !== alignment) {
      setAlignment(newAlignment);
    }
  };

  const leaderboards = {
    "amazing-race": amazingRaceLeaderboard,
    "mass-games": massGamesLeaderboard,
    battleship: battleshipLeaderboard,
  };

  const currentLeaderboard = leaderboards[alignment];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingTop: "35px",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Leaderboard</h1>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="games-leaderboard"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          border: "1px solid white",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <ToggleButton
          value="amazing-race"
          sx={{ color: "white", paddingLeft: { xs: "5%", sm: "10%" } }}
        >
          Amazing Race
        </ToggleButton>
        <ToggleButton value="mass-games" sx={{ color: "white" }}>
          Mass Games
        </ToggleButton>
        <ToggleButton
          value="battleship"
          sx={{ color: "white", paddingRight: { xs: "5%", sm: "10%" } }}
        >
          Battleship
        </ToggleButton>
      </ToggleButtonGroup>

      <Top3Display position={currentLeaderboard.slice(0, 3)} />
      <Leaderboard position={currentLeaderboard.slice(3)} />
    </div>
  );
};

export default LeaderboardPage;
