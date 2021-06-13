import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { ROUTES } from "../routers";
import clsx from "clsx";
import shadows from "@material-ui/core/styles/shadows";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 500,
    width: (500 * 16) / 9,
    background: theme.palette.primary.main,
    borderRadius: "24px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Search() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.centerContent}
      style={{ height: "100vh", minWidth: "fit-content" }}
    >
      <Box
        boxShadow={shadows[3]}
        className={clsx(classes.wrapper, classes.centerContent)}
      >
        <Typography
          variant="h2"
          style={{ marginBottom: 24, color: "white", fontWeight: 700 }}
        >
          Welcome
        </Typography>
        <SearchBar
          onSubmit={(query: string) => {
            if (!query) return;
            history.push(
              ROUTES.SEARCH_RESULT + `?query=${encodeURIComponent(query)}`
            );
          }}
        />
      </Box>
    </Box>
  );
}
