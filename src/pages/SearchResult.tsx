import React from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MediaCard from "../components/MediaCard/MediaCard";
import { ROUTES } from "../routers";
import { searchVideos } from "../store/actions/videos";
import { IStore, IVideo } from "../utils/types";
import { useQuery } from "../utils/hooks";
import { updateQuery } from "../store/actions/query";

export default function SearchResult() {
  const videos = useSelector((state: IStore) => state.videos);
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
      {videos.map((video: IVideo, index: number) => (
        <Box key={index} mt={3}>
          <MediaCard
            video={video}
            onPlay={() => {
              history.push(ROUTES.VIDEO.replace(":id", video.uid));
            }}
            onSegmentClick={(segment) => {
              history.push(
                `${ROUTES.VIDEO.replace(":id", video.uid)}?start=${
                  segment.start
                }`
              );
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
