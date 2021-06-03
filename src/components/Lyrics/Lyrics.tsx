import React from "react";
import { Box } from "@material-ui/core";
import { ISegment, IStore } from "../../utils/types";
import Segment from "../Segment/Segment";
import { useSelector } from "react-redux";

type Props = {
  data: ISegment[];
  onSegmentClick(item: ISegment): void;
};

const Lyrics = (props: Props) => {
  const query = useSelector((store: IStore) => store.query);
  return (
    <>
      {props.data.map((item, index) => (
        <Box onClick={() => props.onSegmentClick(item)}>
          <Segment item={item} index={index} highlight={[query]} />
        </Box>
      ))}
    </>
  );
};

export default Lyrics;
