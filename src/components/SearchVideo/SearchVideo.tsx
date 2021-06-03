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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../routers";
import { IStore } from "../../utils/types";
import SearchBar from "../SearchBar/SearchBar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import clsx from "clsx";
import FilterMenu from "../FilterMenu/FilterMenu";

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
      console.log(anchor);
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const history = useHistory();
  const query = useSelector((state: IStore) => state.query);

  return (
    <>
      <IconButton
        aria-label="back"
        onClick={() => {
          history.goBack();
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
      />
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <FilterMenu></FilterMenu>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
