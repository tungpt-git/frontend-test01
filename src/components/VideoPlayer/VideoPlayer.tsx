import React, { PropsWithChildren } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import {
  Box,
  Grid,
  makeStyles,
  Slider,
  Tooltip,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import PlayerControls from "./PlayerControls";
import { Pause, PlayArrow } from "@material-ui/icons";
import { VimeoConfig } from "react-player/vimeo";

const config = {
  youtube: {
    playerVars: {
      playsinline: 0,
      showInfo: 0,
      control: 0,
    },
  },
  vimeo: {
    playerOptions: {
      controls: false,
    },
  } as VimeoConfig,
};

const useStyle = makeStyles({
  playerWrapper: {
    position: "relative",
    width: "100%",
    minHeight: 500,
  },
  controller: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `rgb(0,0,0,0.6)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
  controllerIcons: {
    color: "#777",
    transform: "scale(0.9)",
    height: 38,
    width: 38,
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

type ValueLabelProps = {
  open?: boolean;
  value: string;
  children: React.ReactElement;
};

function ValueLabelComponent(props: ValueLabelProps) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

type Props = ReactPlayerProps;

export default function VideoPlayer(props: Props) {
  const classes = useStyle();

  const [state, setState] = React.useState({
    playing: false,
  });

  const { playing } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
  };

  return (
    <Box className={classes.playerWrapper}>
      <ReactPlayer
        {...props}
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        playing={playing}
        config={config}
      />
      <Box className={classes.controller}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h5" style={{ color: "#fff" }}>
              Title
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <IconButton
            className={classes.controllerIcons}
            aria-label={playing ? "pause" : "play"}
            onClick={handlePlayPause}
          >
            {playing ? (
              <Pause fontSize="large" />
            ) : (
              <PlayArrow fontSize="large" />
            )}
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        ></Grid>
      </Box>
    </Box>
  );
}
