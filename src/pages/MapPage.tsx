import React from "react";
import Map from "../components/Map.tsx";
import { useParams } from "react-router-dom";

const MapPage: React.FC = () => {
  const { venue } = useParams<{ venue: string }>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingTop: "20vh",
        paddingBottom: "20vh",
        backgroundColor: "black",
      }}
    >
      <Map venue={venue} />
    </div>
  );
};

export default MapPage;
