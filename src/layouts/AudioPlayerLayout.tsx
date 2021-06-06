import React, { PropsWithChildren } from "react";
import { Box, makeStyles } from "@material-ui/core";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import SearchVideo from "../components/SearchVideo/SearchVideo";
import SideBar from "../components/SideBar/SideBar";

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
    borderRight: `1px solid ${theme.palette.divider}`,
    background: "#000",
    color: "#fff",
  },
  mainView: {
    gridArea: "main-view",
    overflowY: "auto",
    padding: "0 20px 20px 20px",
  },
  audioPlayer: {
    gridArea: "audio-player",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "20px 0 12px 0",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 100,
  },
}));

type Props = PropsWithChildren<{}>;

const AudioPlayerLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <nav className={classes.navBar}>
        <SideBar />
      </nav>
      <main className={classes.mainView}>
        <header className={classes.searchBar}>
          <SearchVideo />
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
