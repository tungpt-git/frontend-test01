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
} from "@material-ui/core";

const useStyle = makeStyles({
  playerWrapper: {
    position: "relative",
    width: "100%",
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
  return (
    <Box className={classes.playerWrapper}>
      <ReactPlayer {...props} width="100%" height="100%"></ReactPlayer>
      <Box className={classes.controller}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          style={{ padding: 16 }}
        >
          <Grid item>
            <Typography variant="h5" style={{ color: "#fff" }}>
              Title
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
