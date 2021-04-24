import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

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
};

export default function SearchBar(props: Props) {
  const classes = useStyles();
  const [text, setText] = React.useState(props.defaultValue || "");

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Enter search query"
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
  );
}
