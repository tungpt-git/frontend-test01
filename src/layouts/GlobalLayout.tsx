import React, { PropsWithChildren } from "react";
import { Paper } from "@material-ui/core";

export default function GlobalLayout(props: PropsWithChildren<any>) {
  return <Paper style={{ background: "#f9f9f9" }}>{props.children}</Paper>;
}
