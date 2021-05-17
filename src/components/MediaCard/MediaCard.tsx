import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { ISegment, IVideo } from "../../utils/types";
import moment from "moment";
import { Box } from "@material-ui/core";
import Segment from "../Segment/Segment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      flex: 1,
      overflow: "hidden",
      "& *": {
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 540,
      position: "relative",
      "&:hover": {
        // opacity: 0.3,
        cursor: "pointer",
      },
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
      color: "#fff",
    },
    coverOverlay: {
      height: "100%",
      width: "100%",
      opacity: 0,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      left: 0,
      transition: "opacity 0.3s",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.6)",
        opacity: 1,
      },
    },
  })
);

type Props = {
  video: IVideo;
  onPlay(): void;
  onSegmentClick?(item: ISegment): void;
};

export default function MediaControlCard({ video, onPlay, ...props }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box className={classes.cover} onClick={onPlay}>
        <CardMedia
          component={"img"}
          image={video.thumbnail}
          title="Live from space album cover"
        />
        <Box className={classes.coverOverlay}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
        </Box>
      </Box>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h5"
            variant="h5"
            title={video.name}
            onClick={onPlay}
            style={{ cursor: "pointer" }}
          >
            {video.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(video.uploadedDate).fromNow()}
          </Typography>
          <Box mt={1} style={{ maxHeight: 200, overflowY: "auto" }}>
            {video.segments.map((item, index) => (
              <Box key={index} display="flex">
                <Segment
                  item={item}
                  onClick={() => {
                    props.onSegmentClick && props.onSegmentClick(item);
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}
