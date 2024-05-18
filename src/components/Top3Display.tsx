import React from "react";
import { Badge, Box, Typography, Avatar } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

interface Top3DisplayProps {
  position: {
    og: string;
    points: number;
  }[];
}

const Demo = styled(Box)(({}) => ({
  width: "90%",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  backgroundColor: "#3b3b3b",
  paddingTop: "25px",
  paddingBottom: "25px",
}));

const FirstBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#E4C610",
    color: "white",
  },
}));

const SecondBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "silver",
    color: "white",
  },
}));

const ThirdBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#cd7f32",
    color: "white",
  },
}));

const Top3Display: React.FC<Top3DisplayProps> = ({ position }) => {
  return (
    <Demo>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <SecondBadge badgeContent={2} overlap="circular">
          <Avatar
            src={require(`../assets/icons/${position[1].og.toUpperCase()}.png`)}
            sx={{
              width: "10vw",
              height: "10vw",
              marginBottom: "10px",
            }}
          />
        </SecondBadge>
        <Typography color="white" variant="body1">
          {position[1].og}
        </Typography>
        <Typography color="white" variant="caption">
          {position[1].points}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 0,
        }}
      >
        <FirstBadge badgeContent={1} overlap="circular">
          <Avatar
            src={require(`../assets/icons/${position[0].og.toUpperCase()}.png`)}
            sx={{
              width: "13vw",
              height: "13vw",
              marginBottom: "10px",
            }}
          />
        </FirstBadge>
        <Typography color="white" variant="body1">
          {position[0].og}
        </Typography>
        <Typography color="white" variant="caption">
          {position[0].points}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <ThirdBadge badgeContent={3} overlap="circular">
          <Avatar
            src={require(`../assets/icons/${position[2].og.toUpperCase()}.png`)}
            sx={{
              width: "10vw",
              height: "10vw",
              marginBottom: "10px",
            }}
          />
        </ThirdBadge>
        <Typography color="white" variant="body1">
          {position[2].og}
        </Typography>
        <Typography color="white" variant="caption">
          {position[2].points}
        </Typography>
      </Box>
    </Demo>
  );
};

export default Top3Display;
