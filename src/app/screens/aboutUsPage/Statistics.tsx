import React from "react";
import { Box, Container } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

export default function Statistics() {
  const stats = [
    {
      icon: <StorefrontOutlinedIcon />,
      number: "2025",
      label: "Founded",
    },
    {
      icon: <PeopleOutlinedIcon />,
      number: "50K+",
      label: "Happy Customers",
    },
    {
      icon: <LocalShippingOutlinedIcon />,
      number: "15K+",
      label: "Orders Delivered",
    },
    {
      icon: <StarOutlinedIcon />,
      number: "4.9",
      label: "Customer Rating",
    },
  ];

  return (
    <Box className="statistics">
      <Container className="statistics-container">
        <Box className="statistics-grid">
          {stats?.map((stat, index) => (
            <Box key={index} className="stat-card">
              <Box className="stat-icon">{stat?.icon}</Box>
              <Box className="stat-number">{stat?.number}</Box>
              <Box className="stat-label">{stat?.label}</Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
