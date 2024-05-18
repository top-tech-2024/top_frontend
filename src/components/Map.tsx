import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

interface MapProps {
  venue?: string;
}

const location = {
  SCSE: [1.346260541744388, 103.68135675787433],
  LT2A: [1.3469192007400452, 103.681427879236],
  "The Arc": [1.3477935061638213, 103.68161163558199],
  "The Hive": [1.343356421817025, 103.68276709325404],
};

const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(6),
  zIndex: 1000,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },

  width: "45%", // Default width for xs breakpoint
  [theme.breakpoints.up("sm")]: {
    width: "30%", // Adjust width for sm breakpoint
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100%",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const markerIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const bounds = L.latLngBounds(
  L.latLng(1.3406021895838895, 103.67991967812704), // Southwest corner of the area
  L.latLng(1.3553061325736546, 103.68804566535799) // Northeast corner of the area
);

const Map: React.FC<MapProps> = ({ venue = "SCSE" }) => {
  useEffect(() => {
    const map = L.map("map").setView(
      [location[venue][0], location[venue][1]],
      25
    );
    map.setMinZoom(10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.setMaxBounds(bounds);
    map.on("drag", function () {
      map.panInsideBounds(bounds, { animate: false });
    });

    L.marker([1.346260541744388, 103.68135675787433], { icon: markerIcon })
      .addTo(map)
      .bindPopup("SCSE");

    if (venue) {
      L.marker([location[venue][0], location[venue][1]], { icon: markerIcon })
        .addTo(map)
        .bindPopup(venue);
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%", alignContent: "center" }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );
};

export default Map;
