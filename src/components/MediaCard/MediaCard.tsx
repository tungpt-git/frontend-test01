import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  styled,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { ISegment, IStore, IVideo } from "../../utils/types";
import moment from "moment";
import { Box, CardActions, Collapse } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayCircleIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleIcon from "@material-ui/icons/PauseCircleFilled";
import Segment from "../Segment/Segment";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "20px",
    },
    videoName: {
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7,
      },
    },
    content: {
      display: "flex",

      "& > .MuiCardContent-root": {
        flex: "1 auto",
      },
    },
    imgWrapper: {
      width: "92px",
      height: "92px",
      position: "relative",

      "& > .MuiIconButton-root": {
        color: theme.palette.primary.main,
        position: "absolute",
        display: "block",
        top: 0,
        right: 0,
        padding: 0,
        // opacity: 0,
        transition: "opacity 0.3s",
        zIndex: 1,
      },

      "&:hover > .MuiIconButton-root": {
        opacity: 1,
      },

      "& > img": {
        width: "92px",
        height: "92px",
        borderRadius: "50%",
        transition: "opacity 0.3s",
      },

      "&:hover > img": {
        opacity: 0,
      },
    },
  })
);

type Props = {
  video: IVideo;
  onPlay(): void;
  onSegmentClick(item: ISegment): void;
  playing: boolean;
};

export default function MediaControlCard({ video, ...props }: Props) {
  const classes = useStyles();
  const query = useSelector((store: IStore) => store.query);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.imgWrapper}>
          <IconButton
            onClick={() => {
              props.onPlay();
              if (!props.playing) {
                setExpanded(true);
              }
            }}
          >
            {props.playing ? (
              <PauseCircleIcon style={{ fontSize: "92px" }} />
            ) : (
              <PlayCircleIcon style={{ fontSize: "92px" }} />
            )}
          </IconButton>
        </Box>
        <CardContent>
          <Typography
            variant="h5"
            title={video.name}
            className={classes.videoName}
            onClick={() => {
              if (!props.playing) {
                props.onPlay();
              }
              setExpanded(true);
            }}
          >
            {video.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(video.uploadedDate).fromNow()}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {video.segments.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                props.onSegmentClick(item);
              }}
            >
              <Segment item={item} index={index} highlight={[query]} />
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
