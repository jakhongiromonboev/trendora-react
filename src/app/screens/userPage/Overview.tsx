import React from "react";
import { Box } from "@mui/material";
import moment from "moment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";

import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

export default function Overview() {
  const { authMember } = useGlobals();

  return (
    <Box className="overview">
      <Box className="profile-header-card">
        <Box className="profile-avatar">
          <img
            src={
              authMember?.memberImage
                ? `${serverApi}/${authMember?.memberImage}`
                : "/icons/default-user.svg"
            }
            alt={authMember?.memberNick}
          />
        </Box>
        <Box className="profile-info">
          <h2 className="profile-name">{authMember?.memberNick}</h2>
          <span className="profile-type">{authMember?.memberType}</span>
        </Box>
        <Box className="points-badge">
          <DiamondOutlinedIcon />
          <span>{authMember?.memberPoints || 0} Points</span>
        </Box>
      </Box>

      {authMember?.memberDesc && (
        <Box className="bio-card">
          <p className="bio-text">{authMember?.memberDesc}</p>
        </Box>
      )}

      {/* INFO CARDS GRID */}
      <Box className="info-grid">
        <Box className="info-card">
          <Box className="info-icon">
            <EmailOutlinedIcon />
          </Box>
          <span className="info-label">Email</span>
          <span className="info-value">
            {authMember?.memberEmail || "Not set"}
          </span>
        </Box>

        <Box className="info-card">
          <Box className="info-icon">
            <PhoneOutlinedIcon />
          </Box>
          <span className="info-label">Phone</span>
          <span className="info-value">
            {authMember?.memberPhone || "Not set"}
          </span>
        </Box>

        <Box className="info-card">
          <Box className="info-icon">
            <LocationOnOutlinedIcon />
          </Box>
          <span className="info-label">Address</span>
          <span className="info-value">
            {authMember?.memberAddress || "Not set"}
          </span>
        </Box>

        <Box className="info-card">
          <Box className="info-icon">
            <CalendarTodayOutlinedIcon />
          </Box>
          <span className="info-label">Member Since</span>
          <span className="info-value">
            {moment(authMember?.createdAt).format("MMMM YYYY")}
          </span>
        </Box>
      </Box>
    </Box>
  );
}
