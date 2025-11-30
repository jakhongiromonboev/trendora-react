import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <div className="footer">
      <Container className="footer-container">
        <Stack className="footer-content">
          {/* Brand Section */}
          <Stack className="footer-brand">
            <Box className="footer-logo-box">
              <img
                className="footer-logo"
                src="/icons/trendora-logo.png"
                alt="TRENDORA"
              />
            </Box>
            <Box className="footer-desc">Premium Fashion Collections</Box>
            <Box className="footer-desc-detail">
              Elevate your style with timeless elegance and modern designs
              crafted just for you.
            </Box>
            <Stack className="footer-social">
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Stack>
          </Stack>

          {/* Quick Links Section */}
          <Stack className="footer-links">
            <Box className="footer-title">Quick Links</Box>
            <Stack className="footer-list">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/about">About Us</Link>
              <Link to="/help">Contact</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              <Link to="/help">Help</Link>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box className="footer-divider"></Box>

        {/* Copyright */}
        <Box className="footer-copyright">
          © {new Date().getFullYear()} TRENDORA. All rights reserved.
        </Box>
      </Container>
    </div>
  );
}
