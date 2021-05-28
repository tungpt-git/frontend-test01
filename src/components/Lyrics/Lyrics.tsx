import React from "react";
import { Box } from "@material-ui/core";
import { ISegment } from "../../utils/types";
import Segment from "../Segment/Segment";

type Props = {
  data: ISegment[];
  onSegmentClick(item: ISegment): void;
};

const Lyrics = (props: Props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <Box
          onClick={() => {
            props.onSegmentClick(item);
          }}
        >
          <Segment item={item} index={index} />
        </Box>
      ))}
    </>
  );
};

export default Lyrics;
