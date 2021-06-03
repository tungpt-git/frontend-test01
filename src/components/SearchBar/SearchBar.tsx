import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FilterMenu from "../FilterMenu/FilterMenu";
import strings from "../../utils/strings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "40vw",
      minWidth: "400px",
      borderRadius: "9999px",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

type Props = {
  onSubmit(query: string): void;
  defaultValue?: string;
  onMenuClick?(e: React.MouseEvent): void;
};

export default function SearchBar(props: Props) {
  const classes = useStyles();
  const [text, setText] = React.useState(props.defaultValue || "");

  React.useEffect(() => {
    setText(props.defaultValue || "");
  }, [props.defaultValue]);

  return (
    <>
      <Paper className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label="menuFilter"
          onClick={props.onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={strings.enterSearchQuery}
          inputProps={{ "aria-label": "enter search query" }}
          value={text}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setText(event.currentTarget.value);
          }}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === "Enter") props.onSubmit(text);
          }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => props.onSubmit(text)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
