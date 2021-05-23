import React, { PropsWithChildren } from "react";
import { Box, Grid, IconButton, makeStyles } from "@material-ui/core";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import MenuLayout from "./MenuLayout";
import { useHistory } from "react-router";
import { ArrowBack } from "@material-ui/icons";
import SearchBar from "../components/SearchBar/SearchBar";
import { ROUTES } from "../routers";
import { useSelector } from "react-redux";
import { IStore } from "../utils/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateAreas: `"nav-bar main-view main-view"
        "audio-player audio-player audio-player"`,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr auto",
    height: "100vh",
    minHeight: "100vh",
    width: "100vw",
    position: "relative",
  },
  navBar: {
    gridArea: "nav-bar",
    width: "300px",
    background: "#000",
  },
  mainView: {
    gridArea: "main-view",
    overflowY: "auto",
    padding: "20px",
    // background: theme.palette.background.default,
  },
  audioPlayer: {
    gridArea: "audio-player",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
}));

type Props = PropsWithChildren<{}>;

const AudioPlayerLayout = ({ children }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const query = useSelector((state: IStore) => state.query);

  return (
    <Box className={classes.root}>
      <nav className={classes.navBar}>navBar</nav>
      <main className={classes.mainView}>
        <header className={classes.searchBar}>
          <IconButton
            aria-label="back"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBack />
          </IconButton>
          <SearchBar
            defaultValue={query}
            onSubmit={(s: string) => {
              history.push(
                ROUTES.SEARCH_RESULT + `?query=${encodeURIComponent(s)}`
              );
            }}
          />
        </header>
        <main>{children}</main>
      </main>
      <footer className={classes.audioPlayer}>
        <AudioPlayer />
      </footer>
    </Box>
  );
};

export default AudioPlayerLayout;
