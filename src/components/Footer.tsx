import React from "react";
import {
  Box,
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  IconButton,
} from "@mui/material";
import SCSE from "../assets/icons/scse-logo-blue.webp"
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

const Footer: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderTop: "0.1px solid #666666",
        paddingTop: 1.5,
        paddingBottom: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          alt="scse logo"
          src={SCSE}
          sx={{
            width: 60,
            height: 60,
          }}
        ></Avatar>
        <Typography
          variant="h6"
          sx={{
            ml: 2,
            fontSize: "1.1rem",
            color: "white",
            fontFamily: "inherit",
          }}
        >
          SCSE TOP
        </Typography>
      </Toolbar>

      <div>
        <IconButton sx={{ color: "white" }}>
          <InstagramIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <EmailIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <LanguageIcon />
        </IconButton>
      </div>

      <Typography
        variant="body2"
        align="center"
        sx={{ marginTop: 5, fontFamily: "revert", opacity: "0.5" }}
      >
        Copyright © 2024 - NTU SCSE TOP
      </Typography>
    </AppBar>
  );
};

export default Footer;