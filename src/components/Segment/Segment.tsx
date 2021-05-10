import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { milisec2Minutes } from "../../utils/helpers";
import { ISegment } from "../../utils/types";
import clsx from "clsx";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "start",
  },
  item: {
    padding: "4px 0",
    marginRight: "12px",
    cursor: "pointer",
  },
  active: {
    backgroundColor: `rgba(42,181,115,.15)`,
    outline: `1px solid rgba(42,181,115,.5)`,
  },
  text: {
    display: "inline-block",
    "&:hover": {
      background: "#ddd",
    },
  },
});

type Props = {
  item: ISegment;
  onClick(item: ISegment): void;
  active: boolean;
};

export default function Segment({ item, active, ...props }: Props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item className={classes.item} onClick={() => props.onClick(item)}>
        <Typography>
          {milisec2Minutes(item.start * 10)} - {milisec2Minutes(item.end * 10)}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        className={classes.item}
        onClick={() => props.onClick(item)}
      >
        <Box
          className={clsx(classes.text, {
            [classes.active]: active,
          })}
        >
          <Typography>{item.text}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
