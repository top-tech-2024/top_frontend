import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface GamesCardProps {
  name: string;
  location: string;
  description: string;
}

const GamesCard: React.FC<GamesCardProps> = ({
  name,
  location,
  description,
}) => {
  return (
    <Card
      sx={{
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <CardContent
        sx={{
          height: "auto",
          width: "90%",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "left", color: "white" }}>
          {name}
        </Typography>

        <Link
          to={`/map/${location}`}
          style={{
            marginTop: 4,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            color: "lightblue",
          }}
        >
          <LocationOnIcon
            style={{ marginRight: "4px", width: 12, height: 13 }}
          />
          {location}
        </Link>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontSize: { xs: 9, sm: 11, md: 13, lg: 15 },
            textAlign: "left",
            color: "white",
            mr: { xs: 2, sm: 1, md: 0 },
          }}
        >
          {description} {"\n"}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          esse voluptatum consectetur ad, repellendus quas voluptates! Sit
          obcaecati optio, rem provident hic magnam dignissimos sed voluptates,
          facere iste, magni quis?
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GamesCard;
