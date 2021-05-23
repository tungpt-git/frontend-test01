import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  audio: {
    display: "flex",
    justifyContent: "space-between",
    bottom: 0,
    padding: "15px",
    backgroundColor: theme.palette.background.default,
  },

  audio__left: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    width: "300px",
    flex: 0.3,
  },

  audio__green: {
    color: theme.palette.primary.main,
  },

  audio__center: {
    flex: 0.4,
    maxWidth: "600px",
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  "audio__center-buttons": {
    color: theme.palette.primary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "224px",
    flex: 1,
    width: "100%",
  },

  "audio__center-controls": {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  "audio__center-controlsSlider": {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  "audio__center-controlsTime": {
    minWidth: "40px",
    textAlign: "center",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "normal",
    lineHeight: "16px",
    textTransform: "none",
  },

  audio__icon: {
    "&:hover": {
      transition: "transform 0.2s ease-in-out",
      transform: "scale(1.2) !important",
    },
  },

  audio__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    flex: 0.3,
    overflow: "hidden",
  },

  audio__albumLogo: {
    height: "60px",
    width: "60px",
    marginRight: "20px",
    objectFit: "contain",
  },

  audio__songInfo: {
    "&> h4 ": {
      marginBottom: "5px",
    },
    "& > p": {
      fontSize: "12px",
    },
  },
}));
