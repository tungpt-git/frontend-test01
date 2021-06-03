import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { milisec2Minutes } from "../../utils/helpers";
import { ISegment } from "../../utils/types";
import Highlighter from "react-highlight-words";

// const Highlighter = (props: any) => {
//   return null;
// };

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.grey[200],
    },
  },
  index: {
    width: "40px",
    textAlign: "center",
  },
  text: {
    flex: 1,
  },
  time: {
    flex: 0.2,
    textAlign: "center",
  },
}));

type Props = {
  item: ISegment;
  index: number;
  highlight?: string[];
};

const Segment = ({ item, index, ...props }: Props) => {
  const classes = useStyles2();
  return (
    <Box className={classes.root}>
      <Typography className={classes.index}>{index + 1}</Typography>
      <Typography className={classes.text}>
        <Highlighter
          searchWords={props.highlight || []}
          autoEscape={true}
          textToHighlight={item.text}
          highlightStyle={{ fontWeight: 600, backgroundColor: "transparent" }}
        />
      </Typography>
      <Typography className={classes.time}>
        {milisec2Minutes(item.start * 10)} - {milisec2Minutes(item.end * 10)}
      </Typography>
    </Box>
  );
};

export default Segment;
