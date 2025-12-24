import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { useGlobals } from "../../hooks/useGlobals";
import { serverApi, Messages } from "../../../lib/config";
import type { MemberUpdateInput } from "../../../lib/types/member";
import type { T } from "../../../lib/types/common";
import MemberService from "../../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export default function EditProfile() {
  const { authMember, setAuthMember } = useGlobals();

  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember?.memberImage}`
      : "/icons/default-user.svg"
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberEmail: authMember?.memberEmail,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  /** HANDLERS **/
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberEmailHandler = (e: T) => {
    memberUpdateInput.memberEmail = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === ""
      ) {
        throw new Error(Messages.error3);
      }

      const memberService = new MemberService();
      const result = await memberService.updateMember(memberUpdateInput);
      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Profile updated successfully", 800);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className="edit-profile">
      {/* AVATAR UPLOAD */}
      <Box className="avatar-upload">
        <Box className="avatar-preview">
          <img src={memberImage} alt="Profile" />
        </Box>
        <Box className="avatar-upload-info">
          <span className="upload-title">Upload Image</span>
          <p className="upload-hint">JPG, JPEG, PNG formats only!</p>
          <Button
            component="label"
            className="upload-btn"
            onChange={handleImageViewer}
          >
            <CloudDownloadIcon />
            <span>Choose File</span>
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>

      {/* FORM FIELDS */}
      <Box className="form-fields">
        <Box className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            placeholder={authMember?.memberNick || "Enter your name"}
            value={memberUpdateInput.memberNick}
            onChange={memberNickHandler}
          />
        </Box>

        <Box className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder={authMember?.memberEmail || "Enter your email"}
            value={memberUpdateInput.memberEmail}
            onChange={memberEmailHandler}
          />
        </Box>

        <Box className="form-row">
          <Box className="form-group half">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input"
              placeholder={authMember?.memberPhone || "No phone"}
              value={memberUpdateInput.memberPhone}
              onChange={memberPhoneHandler}
            />
          </Box>
          <Box className="form-group half">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input"
              placeholder={authMember?.memberAddress || "No address"}
              value={memberUpdateInput.memberAddress}
              onChange={memberAddressHandler}
            />
          </Box>
        </Box>

        <Box className="form-group">
          <label className="form-label">About Me</label>
          <textarea
            className="form-textarea"
            placeholder={authMember?.memberDesc || "Tell us about yourself..."}
            value={memberUpdateInput.memberDesc}
            onChange={memberDescHandler}
            rows={4}
          />
        </Box>
      </Box>

      <Box className="form-actions">
        <Button
          variant="contained"
          className="btn-save"
          onClick={handleSubmitButton}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
