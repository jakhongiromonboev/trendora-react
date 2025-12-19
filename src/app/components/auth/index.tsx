import React, { useState } from "react";
import { Modal, Backdrop, Fade, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
});

const ModalContent = styled(Box)({
  display: "flex",
  width: "900px",
  maxWidth: "95vw",
  height: "600px",
  maxHeight: "90vh",
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  outline: "none",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    height: "auto",
    maxHeight: "95vh",
  },
});

const ImageSection = styled(Box)({
  flex: 1,
  backgroundImage: "url(/img/auth-fashion.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  minWidth: "450px",
  backgroundColor: "#f5f1e8",
  "@media (max-width: 768px)": {
    minWidth: "100%",
    minHeight: "200px",
    display: "none",
  },
});

const FormSection = styled(Box)({
  flex: 1,
  padding: "60px 50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "#fff",
  minWidth: "450px",
  position: "relative",
  "@media (max-width: 768px)": {
    minWidth: "100%",
    padding: "40px 30px",
  },
});

const Title = styled("h1")({
  fontFamily: "'Playfair Display', serif",
  fontSize: "32px",
  fontWeight: 700,
  color: "#000",
  marginBottom: "8px",
  lineHeight: 1.2,
});

const Subtitle = styled("p")({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#666",
  marginBottom: "35px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiInput-root": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "15px",
    "&:before": {
      borderBottomColor: "#e0e0e0",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#d4a574",
    },
    "&:after": {
      borderBottomColor: "#d4a574",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "15px",
    color: "#666",
    "&.Mui-focused": {
      color: "#d4a574",
    },
  },
  "& .MuiInput-input": {
    color: "#000",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  padding: "16px",
  marginTop: "15px",
  marginBottom: "20px",
  textTransform: "none",
  borderRadius: "6px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#d4a574",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(212, 165, 116, 0.4)",
  },
});

const ToggleText = styled(Box)({
  textAlign: "center",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#666",
  marginTop: "20px",
  "& span": {
    color: "#d4a574",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#000",
      textDecoration: "underline",
    },
  },
});

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  setSignupOpen: (value: boolean) => void;
  setLoginOpen: (value: boolean) => void;
}

export default function AuthenticationModal({
  signupOpen,
  loginOpen,
  handleSignupClose,
  handleLoginClose,
  setSignupOpen,
  setLoginOpen,
}: AuthenticationModalProps) {
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const resetForm = () => {
    setMemberNick("");
    setMemberEmail("");
    setMemberPhone("");
    setMemberPassword("");
  };

  /** HANDLERS **/
  const handleSignupCloseWithReset = () => {
    resetForm();
    handleSignupClose();
  };

  const handleLoginCloseWithReset = () => {
    resetForm();
    handleLoginClose();
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (signupOpen) {
        handleSignUpRequest().then();
      } else if (loginOpen) {
        handleLoginRequest().then();
      }
    }
  };

  const handleSignUpRequest = async () => {
    try {
      const isFulfilled =
        memberNick.trim() !== "" &&
        memberEmail.trim() !== "" &&
        memberPhone.trim() !== "" &&
        memberPassword.trim() !== "";

      if (!isFulfilled) {
        throw new Error("Please fill in all fields");
      }

      const signupInput: MemberInput = {
        memberNick: memberNick.trim(),
        memberEmail: memberEmail.trim().toLowerCase(),
        memberPhone: memberPhone.trim(),
        memberPassword: memberPassword.trim(),
      };

      const memberService = new MemberService();
      const result = await memberService.signup(signupInput);

      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Welcome to TRENDORA!", 900);
      handleSignupCloseWithReset();
    } catch (err) {
      console.log("Signup error:", err);
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfilled =
        (memberNick.trim() !== "" || memberEmail.trim() !== "") &&
        memberPassword.trim() !== "";

      if (!isFulfilled) {
        throw new Error("Please fill in all fields");
      }

      const loginInput: LoginInput = {
        memberNick: memberNick.trim() || memberEmail.trim(),
        memberEmail: memberEmail.trim() || undefined,
        memberPassword: memberPassword.trim(),
      };

      const memberService = new MemberService();
      const result = await memberService.login(loginInput);

      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Welcome back!", 900);
      handleLoginCloseWithReset();
    } catch (err) {
      console.log("Login error:", err);
      sweetErrorHandling(err);
    }
  };

  /** SWITCH **/
  const switchToLogin = () => {
    resetForm();
    handleSignupClose();
    setTimeout(() => {
      setLoginOpen(true);
    }, 150);
  };

  /** SWITCH **/
  const switchToSignup = () => {
    resetForm();
    handleLoginClose();
    setTimeout(() => {
      setSignupOpen(true);
    }, 150);
  };

  return (
    <>
      {/* Signup Modal */}
      <StyledModal
        open={signupOpen}
        onClose={handleSignupCloseWithReset}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Fade in={signupOpen}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ImageSection />
            <FormSection>
              <Title>Join The Fashion Community</Title>
              <Subtitle>Create your account to start shopping</Subtitle>

              <StyledTextField
                variant="standard"
                label="Username"
                fullWidth
                value={memberNick}
                onChange={(e) => setMemberNick(e.target.value)}
                autoComplete="username"
              />
              <StyledTextField
                variant="standard"
                label="Email"
                type="email"
                fullWidth
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                autoComplete="email"
              />
              <StyledTextField
                variant="standard"
                label="Phone Number"
                fullWidth
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                autoComplete="tel"
              />
              <StyledTextField
                variant="standard"
                label="Password"
                type="password"
                fullWidth
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                autoComplete="new-password"
              />

              <SubmitButton fullWidth onClick={handleSignUpRequest}>
                Create Account
              </SubmitButton>

              <ToggleText>
                Already have an account?{" "}
                <span onClick={switchToLogin}>Log In</span>
              </ToggleText>
            </FormSection>
          </ModalContent>
        </Fade>
      </StyledModal>

      {/* Login Modal */}
      <StyledModal
        open={loginOpen}
        onClose={handleLoginCloseWithReset}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Fade in={loginOpen}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ImageSection />
            <FormSection>
              <Title>Welcome Back</Title>
              <Subtitle>Sign in to continue your fashion journey</Subtitle>

              <StyledTextField
                variant="standard"
                label="Username or Email"
                fullWidth
                value={memberNick || memberEmail}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes("@")) {
                    setMemberEmail(value);
                    setMemberNick("");
                  } else {
                    setMemberNick(value);
                    setMemberEmail("");
                  }
                }}
                autoComplete="username"
              />
              <StyledTextField
                variant="standard"
                label="Password"
                type="password"
                fullWidth
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                autoComplete="current-password"
              />

              <SubmitButton fullWidth onClick={handleLoginRequest}>
                Log In
              </SubmitButton>

              <ToggleText>
                Don't have an account?{" "}
                <span onClick={switchToSignup}>Sign Up</span>
              </ToggleText>
            </FormSection>
          </ModalContent>
        </Fade>
      </StyledModal>
    </>
  );
}
