import {
  Box,
  Grid,
  Slider,
  withStyles,
  Typography,
  IconButton as IB,
} from "@material-ui/core";
import React from "react";
import PlayCircleIcon from "@material-ui/icons/PlayCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleIcon from "@material-ui/icons/PauseCircleFilled";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { milisec2Minutes } from "../../utils/helpers";
import { debounce } from "lodash";
import { useStyles } from "./styles";
import clsx from "clsx";
import { thumbnailImg } from "../../utils/mock";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../utils/types";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import { ROUTES } from "../../routers";
import { useHistory } from "react-router";
import SubtitlesOutlinedIcon from "@material-ui/icons/SubtitlesOutlined";
import strings from "../../utils/strings";
import { playVideo } from "../../store/actions/nowPlaying";

const IconButton = withStyles((theme) => ({
  root: {
    color: "white",
  },
  disabled: {
    color: "white !important",
    opacity: 0.4,
  },
}))(IB);

const AudioPlayer = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const nowPlaying = useSelector((store: IStore) => store.nowPlaying);

  const audioRef = React.useRef<any>();
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(1);

  React.useEffect(() => {
    console.log(nowPlaying);
    if (audioRef?.current) {
      handlePlayPause(!nowPlaying?.isPlaying);
      if (nowPlaying?.startTime) {
        audioRef.current.currentTime = nowPlaying.startTime;
      }
    }
  }, [nowPlaying]);

  const skipNext = () => {
    console.log("skip next");
  };

  const handlePlayPause = (isPlaying: boolean = playing) => {
    if (!nowPlaying?.url) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!isPlaying);
  };

  const skipPrevious = () => {};

  const handleSeekMouseUp = (e: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    if (audioRef?.current) {
      audioRef.current.currentTime = newValue;
      if (Math.ceil(audioRef.current.duration) !== Math.ceil(newValue)) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }
  };

  const handleSeek = (e: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    audioRef?.current?.pause();
    setCurrentTime(newValue);
  };

  const handleVolumnChange = (e: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    if (audioRef?.current) {
      const v = newValue / 100;
      audioRef.current.volume = v;
      setVolume(v);
    }
  };

  const durationTime = audioRef?.current?.duration || 0;

  return (
    <React.Fragment>
      <audio
        ref={audioRef}
        hidden
        src={nowPlaying?.url || ""}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime);
        }}
      ></audio>
      <Box className={classes["audio"]}>
        <Box className={classes["audio__left"]}>
          <img
            className={classes["audio__albumLogo"]}
            src={thumbnailImg}
            alt="logo"
          />
          {nowPlaying ? (
            <div className={classes["audio__songInfo"]}>
              <Typography variant="body1">{nowPlaying?.name}</Typography>
            </div>
          ) : (
            <div>
              <Typography variant="body1">
                {strings.noPodcastIsPlaying}
              </Typography>
              <Typography>...</Typography>
            </div>
          )}
        </Box>
        <Box className={classes["audio__center"]}>
          <Box className={classes["audio__center-buttons"]}>
            <ShuffleIcon
              className={clsx(classes["audio__green"], classes["audio__icon"])}
            />
            <SkipPreviousIcon
              onClick={skipNext}
              className={classes["audio__icon"]}
            />
            {playing ? (
              <PauseCircleIcon
                onClick={() => handlePlayPause()}
                fontSize="large"
                className={classes["audio__icon"]}
              />
            ) : (
              <PlayCircleIcon
                onClick={() => handlePlayPause()}
                fontSize="large"
                className={classes["audio__icon"]}
              />
            )}
            <SkipNextIcon
              onClick={skipPrevious}
              className={classes["audio__icon"]}
            />
            <RepeatIcon
              className={clsx(classes["audio__green"], classes["audio__icon"])}
            />
          </Box>
          <Box className={classes["audio__center-controls"]}>
            <Typography className={classes["audio__center-controlsTime"]}>
              {milisec2Minutes(currentTime * 1000)}
            </Typography>
            <Box className={classes["audio__center-controlsSlider"]}>
              <CustomSlider
                aria-labelledby="continuous-slider"
                min={0}
                max={durationTime}
                onChangeCommitted={handleSeekMouseUp}
                onChange={handleSeek}
                value={currentTime}
              />
            </Box>
            <Typography className={classes["audio__center-controlsTime"]}>
              {milisec2Minutes(durationTime * 1000)}
            </Typography>
          </Box>
        </Box>
        <Box className={classes["audio__right"]}>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <IconButton
                disabled={!nowPlaying?.uid}
                onClick={() => {
                  history.push(ROUTES.VIDEO.replace(":id", nowPlaying?.uid));
                }}
              >
                <SubtitlesOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <PlaylistPlayIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                {volume === 0 ? (
                  <VolumeMuteIcon />
                ) : volume < 0.5 ? (
                  <VolumeDownIcon />
                ) : (
                  <VolumeUpIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item style={{ flex: "0 1 125px", margin: "0 15px 0 8px" }}>
              <CustomSlider
                aria-labelledby="volumn-slider"
                onChange={debounce(handleVolumnChange, 100)}
                onChangeCommitted={handleVolumnChange}
                defaultValue={100}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AudioPlayer;

const CustomSlider = withStyles(() => ({
  root: {
    height: "4px",
    padding: "11px 0",
    "&:hover .MuiSlider-thumb": {
      opacity: 1,
    },
  },
  thumb: {
    opacity: 0,
  },
}))(Slider);
