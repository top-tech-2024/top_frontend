import React from "react";
import { Tab, Typography, Box, Tabs } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import QuizIcon from "@mui/icons-material/Quiz";

interface TabsProps {
  names: string[];
}

type DictionaryValue = {
  desc: string;
  icon: React.ReactNode;
  link: string;
};
type TabDictionary = {
  [key: string]: DictionaryValue[];
};

const tabDictionary: TabDictionary = {
  Chat: [
    {
      desc: "Chat with the gods",
      icon: (
        <ChatIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/chat",
    },
  ],
  Games: [
    {
      desc: "View the list of games",
      icon: (
        <VideogameAssetIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/games",
    },
  ],
  Leaderboard: [
    {
      desc: "See who are the current winners",
      icon: (
        <LeaderboardIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/leaderboard",
    },
  ],

  Clue: [
    {
      desc: "Get clues on territories",
      icon: (
        <QuizIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/clue",
    },
  ],

  "Update Points": [
    {
      desc: "Update game points",
      icon: (
        <ScoreboardIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/update-points",
    },
  ],
  "Book Facilities": [
    {
      desc: "Book facilities for 15 minutes",
      icon: (
        <BookmarkAddIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/book-facilities",
    },
  ],
  "Register Player": [
    {
      desc: "Register freshies",
      icon: (
        <HowToRegIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/register-player",
    },
  ],
  "Assign Clue": [
    {
      desc: "Give clues on territories",
      icon: (
        <QuizIcon
          sx={{
            color: "#354C9A",
          }}
        />
      ),
      link: "/assign-clue",
    },
  ],
};
const TabsList: React.FC<TabsProps> = ({ names }) => {
  return (
    <Tabs
      orientation="vertical"
      aria-label="short-cut tabs"
      role="navigation"
      sx={{
        width: "350px",
        marginTop: "2rem",
      }}
    >
      {names.map((name) => (
        <Tab
          key={name}
          component="a"
          icon={tabDictionary[name][0].icon}
          iconPosition="start"
          label={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: "1rem",
              }}
            >
              <Typography variant="h6">{name}</Typography>
              <Typography variant="caption">
                {tabDictionary[name][0].desc}
              </Typography>
            </div>
          }
          href={tabDictionary[name][0].link}
          sx={{
            justifyContent: "left",
            alignItems: "left",
            color: "white",
            border: "1px solid white",
            borderRadius: "18px",
            marginBottom: "2rem",
            paddingLeft: "2rem",
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsList;
