import React from "react";
import { Tab, Typography, Box, IconButton } from "@mui/material";
import Tabs from "@mui/material/Tabs";
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
  text: string;
  icon: React.ReactNode;
};
type TabDictionary = {
  [key: string]: DictionaryValue[];
};

const tabDictionary: TabDictionary = {
  Chat: [
    {
      text: "Chat with the gods",
      icon: <ChatIcon />,
    },
  ],
  Games: [
    {
      text: "View the list of games",
      icon: <VideogameAssetIcon />,
    },
  ],
  " Leaderboard": [
    {
      text: "See who are the current winners",
      icon: <LeaderboardIcon />,
    },
  ],
  "Update Points": [
    {
      text: "Update game points",
      icon: <ScoreboardIcon />,
    },
  ],
  "Book Facilities": [
    {
      text: "Book facilities for 15 minutes",
      icon: <BookmarkAddIcon />,
    },
  ],
  "Register Player": [
    {
      text: "Register freshies",
      icon: <HowToRegIcon />,
    },
  ],
  "Assign Clue": [
    {
      text: "Give clues on territories",
      icon: <QuizIcon />,
    },
  ],
};
const Tabs: React.FC<TabsProps> = ({ names }) => {
  // const texts: string[] = [];
  // const icons: React.ReactNode[] = [];

  // names.forEach((name) => {
  //   if (tabDictionary[name]) {
  //     texts.push(tabDictionary[name][0].text);
  //     icons.push(tabDictionary[name][0].icon);
  //   }
  // });
  return (
    <Tabs orientation="vertical" aria-label="short-cut tabs">
      {names.map((name) => (
        <Tab
          component="a"
          icon={tabDictionary[name][0].icon}
          label={tabDictionary[name][0].text}
          href={`/${name}`.toLowerCase().replace(" ", "-")}
        />
      ))}
    </Tabs>
  );
};
