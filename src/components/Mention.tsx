import React from "react";
import { Typography } from "@material-ui/core";
import {
  MentionsInput,
  Mention,
  SuggestionDataItem,
  MentionsInputProps,
  MentionProps,
} from "react-mentions";
import { Operation, OperationLabel } from "../utils/enum";
import { theme } from "../theme";

const data: SuggestionDataItem[] = [
  { id: Operation.AND, display: OperationLabel.AND },
  { id: Operation.NOT, display: OperationLabel.NOT },
];

type Props = {
  value: string;
  setValue(s: string): void;
  mentionProps?: Partial<MentionProps>;
} & Omit<MentionsInputProps, "children">;

export default function YMention({
  value,
  setValue,
  mentionProps,
  ...props
}: Props) {
  const onChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };

  return (
    <Typography style={{ width: "100%" }}>
      <MentionsInput
        singleLine
        value={value}
        onChange={onChange}
        style={defaultStyle}
        {...props}
      >
        <Mention
          trigger={mentionProps?.trigger || "#"}
          data={data}
          style={defaultMentionStyle}
          markup={mentionProps?.markup}
        />
      </MentionsInput>
    </Typography>
  );
}

const defaultStyle = {
  "&singleLine": {
    highlighter: {
      padding: 0,
      border: "none",
      outline: "none",
    },
    input: {
      padding: 0,
      border: "none",
      outline: "none",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

const defaultMentionStyle = {
  backgroundColor: theme.palette.grey[200],
};
