import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#29BA74",
      main: "#1DA462",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6C809D",
    },
    background: {
      default: "#282828",
    },
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
  },
});

export default theme;
