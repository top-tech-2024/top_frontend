import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

interface LeaderBoardProps {
  position: {
    og: string;
    points: number;
  }[];
}

const Leaderboard: React.FC<LeaderBoardProps> = ({ position }) => {
  return (
    <Box
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        height: "auto",
      }}
    >
      <List>
        {position.map((pos, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                paddingTop: 2,
                paddingBottom: 1,
              }}
            >
              <ListItemText
                primary={`${index + 4}`}
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              />
              <ListItemAvatar>
                <ListItemText
                  primary={index < 10 ? "\u00A0\u00A0" + pos.og : pos.og}
                  sx={{
                    textAlign: "center",
                    color: "white",
                    width: "100%",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={pos.points}
                sx={{ textAlign: "right", color: "white" }}
              />
            </ListItem>
            {index < position.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Leaderboard;
