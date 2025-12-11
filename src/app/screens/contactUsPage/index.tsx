import React from "react";
import { Box, Container } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import "../../../css/contact.css";

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/971501234567", "_blank");
  };

  return (
    <div className="contact">
      {/* HERO SECTION */}
      <Box className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We'd love to hear from you</p>
      </Box>

      <Container className="contact-container">
        <Box className="contact-cards">
          <Box className="contact-card">
            <Box className="card-icon">
              <LocationOnOutlinedIcon />
            </Box>
            <h3 className="card-title">Visit Us</h3>
            <p className="card-text">123 Fashion Avenue</p>
            <p className="card-text">New York, NY10001</p>
          </Box>

          <Box className="contact-card">
            <Box className="card-icon">
              <PhoneOutlinedIcon />
            </Box>
            <h3 className="card-title">Call Us</h3>
            <p className="card-text">+1 (212) 555-7890</p>
            <p className="card-text-small">Mon-Sun: 9AM - 10PM</p>
          </Box>

          <Box className="contact-card">
            <Box className="card-icon">
              <EmailOutlinedIcon />
            </Box>
            <h3 className="card-title">Email Us</h3>
            <p className="card-text">info@trendora.com</p>
            <p className="card-text-small">We reply within 24 hours</p>
          </Box>
        </Box>

        <Box className="contact-bottom">
          <Box className="whatsapp-card">
            <Box className="card-icon whatsapp-icon">
              <WhatsAppIcon />
            </Box>
            <h3 className="card-title">WhatsApp</h3>
            <p className="card-text">+1 (212) 555-7891</p>
            <p className="card-text-small">Quick responses</p>
            <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
              Chat Now
            </button>
          </Box>

          <Box className="payment-card">
            <Box className="payment-header">
              <Box className="card-icon payment-icon">
                <AccountBalanceOutlinedIcon />
              </Box>
              <h3 className="card-title">Payment Details</h3>
            </Box>
            <Box className="payment-info">
              <Box className="payment-row">
                <span className="payment-label">Bank:</span>
                <span className="payment-value">Chase Bank</span>
              </Box>
              <Box className="payment-row">
                <span className="payment-label">Account:</span>
                <span className="payment-value">TRENDORA LLC</span>
              </Box>
              <Box className="payment-row">
                <span className="payment-label">Account #:</span>
                <span className="payment-value">123456789012</span>
              </Box>
            </Box>
            <Box className="payment-note">
              <p>
                After payment, send confirmation with your{" "}
                <strong>Order ID</strong> via WhatsApp or Email.
              </p>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
