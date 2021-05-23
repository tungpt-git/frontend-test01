import { Box, Grid, Slider, withStyles, Typography } from "@material-ui/core";
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
import { useSelector } from "react-redux";
import { IStore } from "../../utils/types";

const AudioPlayer = () => {
  const classes = useStyles();

  const audioRef = React.useRef<any>();
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  const item = useSelector((store: IStore) => store.nowPlaying);

  React.useEffect(() => {
    console.log(item);
    if (audioRef?.current) {
      handlePlayPause(!item.isPlaying);
    }
  }, [item]);

  const skipNext = () => {
    console.log("skip next");
  };

  const handlePlayPause = (isPLaying: boolean = playing) => {
    if (isPLaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!isPLaying);
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

  const handleVolumnChange = (e: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    if (audioRef?.current) {
      const v = newValue / 100;
      audioRef.current.volume = v;
    }
  };

  const durationTime = audioRef?.current?.duration || 0;

  return (
    <React.Fragment>
      <audio
        ref={audioRef}
        hidden
        src={item?.source || ""}
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
          {item ? (
            <div className={classes["audio__songInfo"]}>
              <Typography variant="body1">{item?.name}</Typography>
            </div>
          ) : (
            <div>
              <Typography variant="body1">No song is playing</Typography>
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
                value={currentTime}
              />
            </Box>
            <Typography className={classes["audio__center-controlsTime"]}>
              {milisec2Minutes(durationTime * 1000)}
            </Typography>
          </Box>
        </Box>
        <Box className={classes["audio__right"]}>
          <Grid container justify="flex-end">
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item style={{ flex: "0 1 125px", marginRight: "15px" }}>
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
