import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MediaCard from "../components/MediaCard/MediaCard";
import { ROUTES } from "../routers";
import { searchVideos } from "../store/actions/videos";
import { IStore, IVideo } from "../utils/types";
import { useQuery } from "../utils/hooks";
import { updateQuery } from "../store/actions/query";
import { playVideo } from "../store/actions/nowPlaying";

export default function SearchResult() {
  const { videos, nowPlaying } = useSelector(
    ({ videos, nowPlaying }: IStore) => ({
      videos,
      nowPlaying,
    })
  );

  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery().get("query");

  React.useEffect(() => {
    if (query) {
      dispatch(updateQuery(query));
      dispatch(searchVideos(decodeURIComponent(query)));
    }
  }, [dispatch, query]);

  return (
    <Box>
      <Typography variant="h5">Results</Typography>
      {videos.map((video: IVideo, index: number) => (
        <Box key={index} mt={3}>
          <MediaCard
            video={video}
            onPlay={() => {
              dispatch(
                playVideo({
                  ...video,
                  isPlaying:
                    video.uid === nowPlaying?.uid
                      ? !nowPlaying.isPlaying
                      : true,
                })
              );
            }}
            onSegmentClick={(segment) => {}}
          />
        </Box>
      ))}
    </Box>
  );
}
