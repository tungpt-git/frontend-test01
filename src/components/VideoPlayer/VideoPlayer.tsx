import React, { CSSProperties } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import Segment from "../Segment/Segment";

const useStyles = makeStyles({});

type Props = ReactPlayerProps & {
  style?: CSSProperties;
};

export default function VideoPlayer(props: Props) {
  const classes = useStyles();

  return (
    <Box>
      <ReactPlayer {...props} controls style={props.style}></ReactPlayer>
    </Box>
  );
}
