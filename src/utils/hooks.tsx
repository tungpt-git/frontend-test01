import React from "react";
import { useLocation } from "react-router";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}