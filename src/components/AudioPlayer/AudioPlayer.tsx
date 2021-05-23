import { Box, Grid, Slider, withStyles } from "@material-ui/core";
import React from "react";
import "./AudioPlayer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { milisec2Minutes } from "../../utils/helpers";
import { debounce } from "lodash";

const AudioPlayer = () => {
  const audioRef = React.useRef<any>();

  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  const item: any = undefined;

  const skipNext = () => {
    console.log("skip next");
  };

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
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
        src="https://vod2.hanoitv.vn/CLIP2020/Thang08/FM90/Thoi_su_Ha_noi/30_8%20ts%2019h.mp3"
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime);
        }}
      ></audio>
      <Box className="audio">
        <Box className="audio__left">
          <img
            className="audio__albumLogo"
            src={
              "https://img.sparemin.com/background-images/background-images/7b/ba/e5/cd/7bbae5cd2e9b644dee66b2ec7a5a3b1d_1000_1000.png"
            }
            alt="logo"
          />
          {item ? (
            <div className="audio__songInfo">
              <h4>{item?.name}</h4>
            </div>
          ) : (
            <div className="footer__songInfo">
              <h4>No song is playing</h4>
              <p>...</p>
            </div>
          )}
        </Box>
        <Box className="audio__center">
          <Box className="audio__center-buttons">
            <ShuffleIcon className="audio__green" />
            <SkipPreviousIcon onClick={skipNext} className="audio__icon" />
            {playing ? (
              <PauseCircleOutlineIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="audio__icon"
              />
            ) : (
              <PlayCircleOutlineIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="audio__icon"
              />
            )}
            <SkipNextIcon onClick={skipPrevious} className="audio__icon" />
            <RepeatIcon className="audio__green" />
          </Box>
          <Box className="audio__center-controls">
            <Box className="audio__center-controlsProgress">
              {milisec2Minutes(currentTime * 1000)}
            </Box>
            <Box className="audio__center-controlsSlider">
              <CustomSlider
                aria-labelledby="continuous-slider"
                min={0}
                max={durationTime}
                onChangeCommitted={handleSeekMouseUp}
                value={currentTime}
              />
            </Box>
            <Box className="audio__center-controlsProgress">
              {milisec2Minutes(durationTime * 1000)}
            </Box>
          </Box>
        </Box>
        <Box className="audio__right">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item xs>
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
