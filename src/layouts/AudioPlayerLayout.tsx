import React, { PropsWithChildren } from "react";
import { Box } from "@material-ui/core";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import MenuLayout from "./MenuLayout";

type Props = PropsWithChildren<{}>;

const AudioPlayerLayout = ({ children }: Props) => {
  return (
    <Box>
      <Box>{children}</Box>
      audio
      <AudioPlayer />
    </Box>
  );
};

export default AudioPlayerLayout;
