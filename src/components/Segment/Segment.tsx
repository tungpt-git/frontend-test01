import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { milisec2Minutes } from "../../utils/helpers";
import { ISegment } from "../../utils/types";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "start",
  },
  item: {
    padding: "4px 0",
    marginRight: '12px'
  },
  text: {
    "&:hover": {
      background: "#ddd",
      display: "inline-block",
    },
  },
});

type Props = {
  item: ISegment;
  onClick(item: ISegment): void;
};

export default function Segment({ item, ...props }: Props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.wrapper}>
      <Grid item className={classes.item} onClick={() => props.onClick(item)}>
        <Typography>
          {milisec2Minutes(item.start)} - {milisec2Minutes(item.end)}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        className={classes.item}
        onClick={() => props.onClick(item)}
      >
        <Box className={classes.text}>
          <Typography>{item.text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
