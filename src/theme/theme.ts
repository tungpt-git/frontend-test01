import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#29BA74",
      main: "#F26B3A",
      contrastText: "#ffffff",
    },
    // text: {
    //   primary: "#fff",
    //   secondary: "rgba(255, 255, 255, 0.7)",
    //   disabled: "rgba(255, 255, 255, 0.5)",
    // },
    secondary: {
      main: "#6C809D",
    },
    background: {
      default: "#282828",
      // paper: "#181818",
    },
    action: {
      // active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      // selected: "rgba(255, 255, 255, 0.16)",
      // disabled: "rgba(255, 255, 255, 0.3)",
      // disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
    // divider: "rgba(255, 255, 255, 0.12)",
    grey: {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "200": "#E2E8F0",
      "300": "#CBD5E1",
      "400": "#94A3B8",
      "500": "#6C809D",
      "600": "#475569",
      "700": "#334155",
      "800": "#1E293B",
      "900": "#0F172A",
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: ["Open Sans", "Arial", "sans-serif"].join(","),
    subtitle2: {
      fontWeight: 700,
    },
    body1: {
      fontSize: 14,
      // fontWeight: 700,
    },
  },
});

export default theme;
