import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import strings from "../../utils/strings";
import Mention from "../Mention";
import { MENTION_MARKUP } from "../../utils/mock";
import { MentionProps, MentionsInputProps } from "react-mentions";

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
  mentionProps?: Partial<MentionProps>;
  inputProps?: Partial<MentionsInputProps>;
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
        <Mention
          className={classes.input}
          value={text}
          setValue={setText}
          placeholder={strings.enterSearchQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              props.onSubmit(text);
            }
          }}
          mentionProps={{
            markup: MENTION_MARKUP,
            ...props.mentionProps,
          }}
          {...props.inputProps}
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
