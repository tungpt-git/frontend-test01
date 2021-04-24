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
import MenuLayout from "../layouts/MenuLayout";
import { ROUTES } from "../routers";
import { searchVideos } from "../store/actions/videos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 10,
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
          defaultValue={decodeURIComponent(query)}
          onSubmit={(s: string) => {
            dispatch(searchVideos(s));
          }}
        ></SearchBar>
      </Box>
      SearchResult
      {JSON.stringify(videos)}
    </MenuLayout>
  );
}
