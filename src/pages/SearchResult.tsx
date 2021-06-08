import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../components/MediaCard/MediaCard";
import { searchVideos } from "../store/actions/videos";
import { IStore, IVideo } from "../utils/types";
import { useQuery } from "../utils/hooks";
import { updateQuery } from "../store/actions/query";
import { playVideo } from "../store/actions/nowPlaying";
import strings from "../utils/strings";

export default function SearchResult() {
  const { videos, nowPlaying } = useSelector(
    ({ videos, nowPlaying }: IStore) => ({
      videos,
      nowPlaying,
    })
  );

  const dispatch = useDispatch();
  const query = useQuery().get("query");
  const filter = useSelector((store: IStore) => store.filter);

  React.useEffect(() => {
    if (query !== null) {
      dispatch(updateQuery(query));
      dispatch(searchVideos(decodeURIComponent(query), filter));
    }
  }, [dispatch, query]);

  return (
    <Box>
      <Typography style={{ fontWeight: 700 }} variant="h5">
        {strings.results}
      </Typography>
      {videos.map((video: IVideo, index: number) => (
        <Box key={index} mt={3}>
          <MediaCard
            video={video}
            playing={
              video.uid === nowPlaying?.uid ? !!nowPlaying?.isPlaying : false
            }
            onPlay={() => {
              const willPlay =
                video.uid === nowPlaying?.uid ? !nowPlaying.isPlaying : true;
              dispatch(
                playVideo({
                  ...video,
                  isPlaying: willPlay,
                })
              );
            }}
            onSegmentClick={(segment) => {
              dispatch(
                playVideo({
                  ...video,
                  isPlaying: true,
                  startTime: segment.start / 100,
                })
              );
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
