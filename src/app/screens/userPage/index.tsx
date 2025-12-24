import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useHistory } from "react-router-dom";

import { useGlobals } from "../../hooks/useGlobals";

import Overview from "./Overview";
import EditProfile from "./EditProfile";
import Security from "./Secutiry";

import "../../../css/userPage.css";

export default function MemberPage() {
  const { authMember } = useGlobals();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!authMember) {
      history.push("/");
    }
  }, [authMember]);

  if (!authMember) return null;

  return (
    <div className="member-page">
      <Box className="member-breadcrumb">
        <Container>
          <span onClick={() => history.push("/")} className="breadcrumb-link">
            Home
          </span>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">My Profile</span>
        </Container>
      </Box>

      <Box className="member-header">
        <h1 className="member-title">My Profile</h1>
      </Box>

      <Container className="member-container">
        <Box className="member-layout">
          {/* LEFT SIDE - VERTICAL TABS */}
          <Box className="member-sidebar">
            <Box
              className={`sidebar-tab ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Box>
            <Box
              className={`sidebar-tab ${activeTab === "edit" ? "active" : ""}`}
              onClick={() => setActiveTab("edit")}
            >
              Edit Profile
            </Box>
            <Box
              className={`sidebar-tab ${
                activeTab === "security" ? "active" : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </Box>
          </Box>

          {/* RIGHT SIDE - CONTENT */}
          <Box className="member-content">
            {activeTab === "overview" && <Overview />}
            {activeTab === "edit" && <EditProfile />}
            {activeTab === "security" && <Security />}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
