import React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const menuItems: string[] = ["Home", "Games", "Leaderboard", "Map"];
const profileItems: string[] = ["Profile", "Logout"];

const Navbar: React.FC = () => {
  const profileItems = ["Profile", "Logout"];
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#C4C4C4",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElMenu)}
            onClose={handleCloseMenu}
          >
            {menuItems.map((page) => (
              <MenuItem key={page} onClick={handleCloseMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#scse-top-header"
          sx={{
            fontSize: "2rem",
            fontFamily: "monospace",
            fontWeight: 700,
            color: "black",
            textDecoration: "none",
            letterSpacing: "0.2rem",
            wordSpacing: "-0.5rem",
          }}
        >
          SCSE TOP
        </Typography>

        <Box>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpenProfile} sx={{ ml: 2 }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElProfile}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElProfile)}
          onClose={handleCloseProfile}
        >
          {profileItems.map((page) => (
            <MenuItem key={page} onClick={handleCloseProfile}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
