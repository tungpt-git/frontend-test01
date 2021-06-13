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
import { getOperationArr, milisec2Minutes } from "../../utils/helpers";
import { Operation } from "../../utils/enum";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { theme } from "../../theme";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "20px",
      borderRadius: "20px",
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
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.imgWrapper}>
          <IconButton
            style={{
              boxShadow: theme.shadows[2],
            }}
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
              setExpanded(!expanded);
            }}
          >
            {video.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {milisec2Minutes(video.duration * 1000)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(video.broadCastDate).format("DD/MM/yyyy")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="download">
            <DownloadIcon
              onClick={() => {
                window.open(video.url, "_blank");
              }}
            />
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
              <Segment
                item={item}
                index={index}
                highlight={getOperationArr(query, Operation.AND)}
              />
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
