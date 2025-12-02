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
          <Stack className="footer-brand">
            <Box className="footer-logo-box">
              <a href="/">
                <img
                  className="footer-logo"
                  src="/img/trendora-logo.png"
                  alt="TRENDORA"
                />
              </a>
            </Box>
            <Box className="footer-desc">Premium Fashion Collections</Box>
            <Box className="footer-desc-detail">
              Elevate your style with timeless elegance and modern designs
              crafted just for you.
            </Box>
            <Stack className="footer-social">
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/x-twitter.svg" alt="Twitter" />
              <img src="/icons/instagram1.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Stack>
          </Stack>

          <Stack className="footer-links">
            <Box className="footer-title">Quick Links</Box>
            <Stack className="footer-list">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/about">About Us</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              {authMember && <Link to="/member-page">My Page</Link>}
            </Stack>
          </Stack>

          <Stack className="footer-links">
            <Box className="footer-title">Help & Info</Box>
            <Stack className="footer-list">
              <Link to="/contact">Contact</Link>
              <Link to="/help?tab=faq">FAQ</Link>
              <Link to="/help?tab=terms">Terms & Conditions</Link>
              <Link to="/help?tab=privacy">Privacy Policy</Link>
              <Link to="/help?tab=shipping">Shipping & Returns</Link>
            </Stack>
          </Stack>
        </Stack>

        <Box className="footer-divider"></Box>

        <Box className="footer-copyright">
          © {new Date().getFullYear()} TRENDORA. All rights reserved.
        </Box>
      </Container>
    </div>
  );
}
