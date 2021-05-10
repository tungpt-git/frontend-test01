import React, { useState, useRef, forwardRef } from "react";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Controls from "./PlayerControls";
import Box from "@material-ui/core/Box";
import { IVideo } from "../../utils/types";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },
}));

const format = (seconds: any) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

type Props = {
  video: IVideo;
};

const VideoPlayer = forwardRef(({ video, ...props }: Props, playerRef: any) => {
  const classes = useStyles();
  
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState<any>([]);
  const [state, setState] = useState({
    pip: false,
    playing: false,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  // const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    if (!playerRef?.current) return;
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    if (!playerRef?.current) return;
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState: any) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e: any, newValue: any) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(`${newValue / 100}`) });
  };

  const handleSeekMouseDown = (e: any) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e: any, newValue: any) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration: any) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e: any, newValue: any) => {
    setState({
      ...state,
      seeking: false,
      volume: parseFloat(`${newValue / 100}`),
    });
  };
  const handleVolumeChange = (e: any, newValue: any) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(`${newValue / 100}`),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    // screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate: any) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime() as any,
      display: format(playerRef.current.getCurrentTime()) as any,
      image: dataUri as any,
    });
    setBookmarks(bookmarksCopy);
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  const calcHeight = React.useCallback(() => {
    return `${(playerRef?.current?.wrapper.offsetWidth || 0) / 1.78}px`;
  }, [playerRef?.current]);

  return (
    <Box>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={hanldeMouseLeave}
        ref={playerContainerRef}
        className={classes.playerWrapper}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height={calcHeight()}
          url={video.url}
          pip={pip}
          playing={playing}
          controls={false}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          config={{
            file: {
              attributes: {
                crossorigin: "anonymous",
              },
            },
          }}
        />

        <Controls
          ref={controlsRef}
          title={video.name}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onDuration={handleDuration}
          onRewind={handleRewind}
          onPlayPause={handlePlayPause}
          onFastForward={handleFastForward}
          playing={playing}
          played={played}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onMute={hanldeMute}
          muted={muted}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          onChangeDispayFormat={handleDisplayFormat}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          volume={volume}
          onBookmark={addBookmark}
        />
      </div>

      <Grid container style={{ marginTop: 20 }} spacing={3}>
        {bookmarks.map((bookmark: any, index: number) => (
          <Grid key={index} item>
            <Paper
              onClick={() => {
                playerRef.current.seekTo(bookmark.time);
                controlsRef.current.style.visibility = "visible";

                setTimeout(() => {
                  controlsRef.current.style.visibility = "hidden";
                }, 1000);
              }}
              elevation={3}
            >
              <img crossOrigin="anonymous" src={bookmark.image} />
              <Typography variant="body2" align="center">
                bookmark at {bookmark.display}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <canvas ref={canvasRef} />
    </Box>
  );
});

export default VideoPlayer;
