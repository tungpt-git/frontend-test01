import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { getVideo } from "../../api";
import Segment from "../../components/Segment/Segment";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import MenuLayout from "../../layouts/MenuLayout";
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

  const [video, setVideo] = React.useState<IVideo>();

  React.useEffect(() => {
    const fetchVideo = async (id: string) => {
      const res = await getVideo({ id });
      setVideo(res);
    };

    fetchVideo(id);
  }, [id]);

  return (
    <MenuLayout>
      {!video ? (
        <CircularProgress />
      ) : (
        <Grid container className={classes.wrapper} spacing={3}>
          <Grid item className={classes.videoPlayer} xs={12} sm={12} md={7}>
            <VideoPlayer url={video.url} />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box
              style={{
                overflowY: "auto",
                maxHeight: 800,
                border: "1px solid #eee",
                padding: "12px",
              }}
            >
              {video.segments.map((item, index) => (
                <Segment
                  key={index}
                  item={item}
                  onClick={(item) => {
                    console.log(item);
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
