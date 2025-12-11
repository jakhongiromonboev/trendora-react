import React from "react";
import { Box, Container } from "@mui/material";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

export default function Info() {
  const values = [
    {
      icon: <DiamondOutlinedIcon />,
      title: "Quality",
      description:
        "Premium fabrics and meticulous craftsmanship in every piece",
    },
    {
      icon: <PaletteOutlinedIcon />,
      title: "Style",
      description: "Timeless designs that transcend seasonal trends",
    },
    {
      icon: <LocalOfferOutlinedIcon />,
      title: "Value",
      description: "Luxury fashion at accessible, fair prices",
    },
    {
      icon: <PublicOutlinedIcon />,
      title: "Sustainability",
      description: "Committed to ethical and eco-friendly practices",
    },
  ];

  return (
    <Box className="info">
      <Container className="info-container">
        <Box className="info-section">
          <Box className="info-image">
            <img src="/img/trendora-logo.png" alt="Our Story" />
          </Box>
          <Box className="info-content">
            <h2 className="info-title">Our Story</h2>
            <p className="info-text">
              Founded in 2025, TRENDORA was born from a simple belief: everyone
              deserves access to premium fashion without compromising on quality
              or style.
            </p>
            <p className="info-text">
              What started as a small curated collection has grown into a
              destination for fashion enthusiasts who appreciate timeless
              elegance and modern design. We work directly with skilled artisans
              and carefully select each piece to ensure it meets our exacting
              standards.
            </p>
          </Box>
        </Box>

        <Box className="info-section reverse">
          <Box className="info-content">
            <h2 className="info-title">Our Mission</h2>
            <p className="info-text">
              At TRENDORA, we're redefining what luxury fashion means. We
              believe that exceptional style shouldn't come with an exceptional
              price tag.
            </p>
            <p className="info-text">
              Our mission is to deliver premium quality fashion with timeless
              elegance, exceptional customer service, and a shopping experience
              that makes you feel valued. Every piece in our collection is
              chosen to help you express your unique style with confidence.
            </p>
          </Box>
          <Box className="info-image">
            <img src="/img/about-mission1.jpg" alt="Our Mission" />
          </Box>
        </Box>

        <Box className="values-section">
          <h2 className="values-title">Our Values</h2>
          <Box className="values-grid">
            {values?.map((value, index) => (
              <Box key={index} className="value-card">
                <Box className="value-icon">{value?.icon}</Box>
                <h3 className="value-title">{value?.title}</h3>
                <p className="value-description">{value?.description}</p>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
