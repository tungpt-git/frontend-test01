import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { getVideo } from "../../api";
import Segment from "../../components/Segment/Segment";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import MenuLayout from "../../layouts/MenuLayout";
import { useForceUpdate, useQuery } from "../../utils/hooks";
import { IVideo } from "../../utils/types";

const useStyles = makeStyles({
  wrapper: {
    margin: "30px 0",
  },
  videoPlayer: {},
});

type Props = any;
export default function WatchVideo(props: Props) {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const start = useQuery().get("start");
  console.log(start);
  const forceUpdate = useForceUpdate();

  const playerRef = React.useRef<any>(null);

  const [video, setVideo] = React.useState<IVideo>();

  React.useEffect(() => {
    const fetchVideo = async (id: string) => {
      const res = await getVideo({ id });
      setVideo(res);
    };

    fetchVideo(id);
  }, [id]);

  React.useEffect(() => {
    if (start && playerRef?.current) {
      playerRef?.current?.seekTo(+start / 100, "seconds");
    }
  }, [start, playerRef?.current]);

  React.useEffect(() => {
    const r = setInterval(() => {
      forceUpdate();
    }, 500);

    return () => clearInterval(r);
  });

  const currentTime: number = Math.ceil(
    (playerRef?.current?.getCurrentTime() || 0) * 100
  );

  return (
    <MenuLayout>
      {!video ? (
        <CircularProgress />
      ) : (
        <Grid container className={classes.wrapper} spacing={3}>
          <Grid item className={classes.videoPlayer} xs={12} sm={12} md={7}>
            <VideoPlayer ref={playerRef} video={video} start={start} />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box
              style={{
                overflowY: "auto",
                maxHeight: 500,
                border: "1px solid #eee",
                padding: "12px",
              }}
            >
              {video.segments.map((item, index) => (
                <Segment
                  key={index}
                  item={item}
                  active={currentTime >= item.start && currentTime < item.end}
                  onClick={(item) => {
                    playerRef.current.seekTo(item.start / 100, "seconds");
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </MenuLayout>
  );
}
