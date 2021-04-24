import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { ROUTES } from "../routers";
import { searchVideos } from "../store/actions/videos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 10,
      margin: "0 10px",
    },
  })
);

export default function SearchResult() {
  const classes = useStyles();

  const videos = useSelector((state: any) => state.videos);
  const dispatch = useDispatch();

  const history = useHistory();
  const { query } = useParams<any>();

  React.useEffect(() => {
    dispatch(searchVideos(decodeURIComponent(query)));
  }, [dispatch, query]);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="back"
          className={classes.iconButton}
          onClick={() => history.push(ROUTES.SEARCH)}
        >
          <ArrowBack />
        </IconButton>
        <SearchBar
          defaultValue={decodeURIComponent(query)}
          onSubmit={(s: string) => {
            dispatch(searchVideos(s));
          }}
        ></SearchBar>
      </Box>
      SearchResult
      {JSON.stringify(videos)}
    </Box>
  );
}
