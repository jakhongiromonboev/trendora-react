import React, { useState } from "react";
import { Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useGlobals } from "../../hooks/useGlobals";
import { Messages } from "../../../lib/config";
import type { MemberUpdateInput } from "../../../lib/types/member";
import MemberService from "../../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export default function Security() {
  const { authMember } = useGlobals();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /** HANDLERS **/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!authMember) throw new Error(Messages.error2);

      if (!newPassword || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      setLoading(true);

      const input: MemberUpdateInput = {
        memberPassword: newPassword,
      };

      const memberService = new MemberService();
      await memberService.updateMember(input);

      setNewPassword("");
      setConfirmPassword("");

      await sweetTopSmallSuccessAlert("Password updated successfully", 1500);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="security">
      <Box className="security-header">
        <Box className="security-icon">
          <LockOutlinedIcon />
        </Box>
        <h2 className="security-title">Change Password</h2>
        <p className="security-subtitle">
          Keep your account secure with a strong password
        </p>
      </Box>

      <form onSubmit={handleSubmit} className="security-form">
        {/* NEW PASSWORD */}
        <Box className="form-group">
          <label className="form-label">New Password</label>
          <Box className="password-input-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </Box>
        </Box>

        {/* CONFIRM PASSWORD */}
        <Box className="form-group">
          <label className="form-label">Confirm Password</label>
          <Box className="password-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </Box>
        </Box>

        <Box className="password-tips">
          <p>Password must:</p>
          <ul>
            <li>Be at least 6 characters long</li>
            <li>Include a mix of letters and numbers (recommended)</li>
          </ul>
        </Box>

        <Box className="form-actions">
          <button type="submit" className="btn-update" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </Box>
      </form>
    </Box>
  );
}
