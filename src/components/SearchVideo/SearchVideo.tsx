import React from "react";
import { ArrowBack } from "@material-ui/icons";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ROUTES } from "../../routers";
import { IStore } from "../../utils/types";
import SearchBar from "../SearchBar/SearchBar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import clsx from "clsx";
import FilterMenu from "../FilterMenu/FilterMenu";
import { theme } from "../../theme";
import { updateQuery } from "../../store/actions/query";
import { searchVideos } from "../../store/actions/videos";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

export default function SearchVideo() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const history = useHistory();
  const dispatch = useDispatch();
  const { query, filter } = useSelector((state: IStore) => state);

  const isResultPage = useRouteMatch(ROUTES.SEARCH_RESULT)?.isExact;
  console.log(isResultPage);

  return (
    <>
      <IconButton
        aria-label="back"
        onClick={() => {
          history.goBack();
        }}
        style={{
          background: "#fff",
          boxShadow: theme.shadows[2],
        }}
      >
        <ArrowBack />
      </IconButton>
      <SearchBar
        defaultValue={query}
        onSubmit={(s: string) => {
          history.push(
            ROUTES.SEARCH_RESULT + `?query=${encodeURIComponent(s)}`
          );
        }}
        onMenuClick={toggleDrawer("right", true)}
        inputProps={{
          onChange: (e) => {
            dispatch(updateQuery(e.target.value));
          },
        }}
      />
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <FilterMenu onClose={toggleDrawer(anchor, false)}></FilterMenu>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
