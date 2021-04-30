import React from "react";
import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MediaCard from "../components/MediaCard/MediaCard";
import SearchBar from "../components/SearchBar/SearchBar";
import MenuLayout from "../layouts/MenuLayout";
import { ROUTES } from "../routers";
import { searchVideos } from "../store/actions/videos";
import { IStore, IVideo } from "../utils/types";
import { useQuery } from "../utils/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 10,
    },
  })
);

export default function SearchResult() {
  const classes = useStyles();

  const videos = useSelector((state: IStore) => state.videos);
  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery().get("query");
  console.log(query);
  console.log("searchQuer");
  React.useEffect(() => {
    if (query) dispatch(searchVideos(decodeURIComponent(query)));
  }, [dispatch, query]);

  return (
    <MenuLayout>
      <Box display="flex" alignItems="center" style={{ gap: 8 }}>
        <IconButton
          aria-label="back"
          className={classes.iconButton}
          onClick={() => history.push(ROUTES.SEARCH)}
        >
          <ArrowBack />
        </IconButton>
        <SearchBar
          defaultValue={decodeURIComponent(query || "")}
          onSubmit={(s: string) => {
            dispatch(searchVideos(s));
          }}
        />
      </Box>

      <Box mt={3}>
        <Box
          display="grid"
          gridGap={24}
          gridTemplateColumns={`repeat(auto-fill, minmax(360px, 1fr))`}
        >
          {videos.map((video: IVideo, index: number) => (
            <React.Fragment key={index}>
              <MediaCard
                video={video}
                onPlay={() => {
                  history.push(ROUTES.VIDEO.replace(":id", video.uid));
                }}
              />
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </MenuLayout>
  );
}
