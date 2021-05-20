import React from "react";
import {
  Box,
  Chip,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { milisec2Minutes } from "../../utils/helpers";
import { ISegment } from "../../utils/types";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
  },
  item: {
    cursor: "pointer",
    marginRight: 10,
  },
  active: {
    backgroundColor: `rgba(42,181,115,.15)`,
    outline: `1px solid rgba(42,181,115,.5)`,
  },
  text: {
    display: "inline-block",
    "&:hover": {
      background: `${theme.palette.grey[200]}`,
      $textIcon: {
        opacity: 1,
      },
    },
  },
  textWrapper: {
    position: "relative",
    padding: "0 10px",
    "&:hover $textIcon": {
      opacity: 1,
    },
  },

  textIcon: {
    position: "absolute",
    right: "-10px",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0,
  },
}));

type Props = {
  item: ISegment;
  onClick(item: ISegment): void;
  active?: boolean;
};

export default function Segment({ item, active, ...props }: Props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item className={classes.item} onClick={() => props.onClick(item)}>
        <Chip
          variant={"outlined"}
          size="small"
          color="primary"
          style={{ cursor: "pointer" }}
          label={`${milisec2Minutes(item.start * 10)} - ${milisec2Minutes(
            item.end * 10
          )}`}
        />
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
        <Box></Box>
      </Grid>
    </Grid>
  );
}
