import React, { PropsWithChildren } from "react";
import { Box } from "@material-ui/core";

export default function GlobalLayout(props: PropsWithChildren<any>) {
  return <Box>{props.children}</Box>;
}
