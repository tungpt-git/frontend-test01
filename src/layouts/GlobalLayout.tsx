import React, { PropsWithChildren } from "react";
import { Paper } from "@material-ui/core";

export default function GlobalLayout(props: PropsWithChildren<any>) {
  return <Paper>{props.children}</Paper>;
}
