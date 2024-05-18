import React from "react";
import gamesBackground from "../assets/games-bg.webp";
import GamesCard from "../components/GamesCard.tsx";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import RevealOnScroll from "../components/RevealOnScroll.tsx";

const GamesPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingTop: "20vh",
        backgroundColor: "black",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${gamesBackground})`,
        backgroundSize: "contain",
      }}
    >
      <Timeline position="alternate-reverse">
        {Array.from({ length: 12 }).map((_, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent>
              <RevealOnScroll>
                <GamesCard
                  name={`Game ${index + 1}`}
                  location="The Arc"
                  description={`Description ${index + 1}`}
                />
              </RevealOnScroll>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default GamesPage;
