import React from "react";
import { Box } from "@mui/material";
import Statistics from "./Statistics";
import Info from "./Info";

import "../../../css/about-us.css";

export default function About() {
  return (
    <div className="about">
      <Box className="about-hero">
        <h1 className="about-title">About TRENDORA</h1>
        <p className="about-subtitle">Redefining Luxury Fashion Since 2025</p>
      </Box>

      <Statistics />
      <Info />
    </div>
  );
}
