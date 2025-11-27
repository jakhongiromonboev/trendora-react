import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/** LIGHT THEME (DEFAULT) **/
const light = {
  palette: {
    mode: "light" as const,
    background: {
      default: "#ffffff",
      paper: common.white,
    },
    primary: {
      contrastText: common.white,
      main: "#000000",
    },
    secondary: {
      contrastText: common.white,
      main: "#d4a574",
    },
    text: {
      primary: "#2d2d2d",
      secondary: "#666666",
      dark: common.black,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          background: "#ffffff",
          height: "100%",
          minHeight: "100%",
        },
      },
    },
  },
  shadows: shadow,
  typography,
};

let theme = createTheme(light);

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
