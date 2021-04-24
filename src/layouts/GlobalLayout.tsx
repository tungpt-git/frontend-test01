import React, { PropsWithChildren } from "react";
import { Box } from "@material-ui/core";

export default function GlobalLayout(props: PropsWithChildren<any>) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      minWidth="fit-content"
    >
      {props.children}
    </Box>
  );
}
