import React, { useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
  Theme,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import RevealOnScroll from "../components/RevealOnScroll.tsx";
import TabsList from "../components/TabsList.tsx";
import headerImage from "../assets/main-bg.jpg";
import headerImage2 from "..//assets/MC-B2.jpg";
import { SxProps } from "@mui/system";
import Aphrodite from "../assets/icons/APHRODITE.png";
import Apollo from "../assets/icons/APOLLO.png";
import Ares from "../assets/icons/ARES.png";
import Arthemis from "../assets/icons/ARTHEMIS.png";
import Athena from "../assets/icons/ATHENA.png";
import Demeter from "../assets/icons/DEMETER.png";
import Dionysus from "../assets/icons/DIONYSUS.png";
import Hephaestus from "../assets/icons/HEPHAESTUS.png";
import Hera from "../assets/icons/HERA.png";
import Hermes from "../assets/icons/HERMES.png";
import Poseidon from "../assets/icons/POSEIDON.png";
import Zeus from "../assets/icons/ZEUS.png";

const logoUrls = [
  Aphrodite,
  Apollo,
  Ares,
  Arthemis,
  Athena,
  Demeter,
  Dionysus,
  Hephaestus,
  Hera,
  Hermes,
  Poseidon,
  Zeus,
];

const HomePage: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [alignment, setAlignment] = React.useState("CP");

  // For tabs
  const handleLogin = () => {
    setIsLogin(true);
  };

  const roleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null && newAlignment !== alignment) {
      setAlignment(newAlignment);
    }
  };

  // Tabs for different roles
  const roleTabs = {
    Player: ["Leaderboard", "Games", "Clue"],
    CGL: ["Register Player", "Book Facilities", "Leaderboard", "Clue"],
    Proggie: ["Update Points", "Leaderboard"],
    CP: ["Update Points", "Leaderboard", "Assign Clue"],
  };

  const currentRoleTabs = roleTabs[alignment];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${headerImage})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        component="img"
        sx={{
          width: { xs: "60%", sm: "50%", md: "40%", lg: "30%" },
          objectFit: "cover",
          marginTop: "3rem",
          borderRadius: "50%",
        }}
        src={headerImage2}
        alt="TOP Design"
      />

      <RevealOnScroll>
        <Typography
          variant="h1"
          sx={{
            color: "#855826",
            width: "100%",
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textShadow: "3px 3px 1px #E6AC8B",
            fontSize: ["300%", "450%", "550%", "600%"],
            lineHeight: "1.5",
          }}
        >
          SCSE TOP'24
        </Typography>
      </RevealOnScroll>

      <RevealOnScroll>
        <Typography
          variant="h1"
          sx={{
            marginTop: "1.5rem",
            color: "#FBE094",
            textAlign: "center",
            whiteSpace: "pre-line",
            fontFamily: "monospace",
            fontWeight: "bold",
            textShadow: "2px 1px 1px #E6AC8B",
            fontSize: ["150%", "200%", "250%", "300%"],
            lineHeight: "2.5",
            letterSpacing: "0.3rem",
          }}
        >
          12 GODS.{"\n"}24 TERRITORIES. {"\n"}1 CROWN.
        </Typography>
      </RevealOnScroll>

      {!isLogin && (
        <RevealOnScroll>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 3,
              mb: 3,
              width: "auto",
              backgroundColor: "black",
              border: "1px solid white",
              fontFamily: "-moz-initial",
              fontSize: { xs: "70%", sm: "100%", md: "120%", lg: "150%" },
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.5s",
                backgroundColor: "black",
                textShadow: "1px 1px 1px #E6AC8B",
              },
            }}
          >
            Let the war begin
          </Button>
        </RevealOnScroll>
      )}

      {isLogin && (
        <>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={roleChange}
            sx={{
              color: "black",
              backgroundColor: "white",
            }}
          >
            <ToggleButton value="Player">Player</ToggleButton>
            <ToggleButton value="CGL">CGL</ToggleButton>
            <ToggleButton value="Proggie">Proggie</ToggleButton>
            <ToggleButton value="CP">CP</ToggleButton>
          </ToggleButtonGroup>

          <TabsList names={currentRoleTabs} />
        </>
      )}

      <Grid
        container
        spacing={2}
        width="90%"
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "space-between",
          marginBottom: "3rem",
        }}
      >
        {logoUrls.map((url, index) => (
          <Grid item xs={4} sm={3} lg={2} key={index}>
            <RevealOnScroll>
              <Tooltip title={url.split("/")[3].split(".")[0]}>
                <Box
                  component="img"
                  src={url}
                  alt="og logo"
                  sx={{
                    width: "80%",
                    objectFit: "cover",
                    padding: "0.5rem",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.5s",
                      borderRadius: "50%",
                    },
                  }}
                />
              </Tooltip>
            </RevealOnScroll>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
