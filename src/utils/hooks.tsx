import { ArrowBack } from "@material-ui/icons";
import { IconButton } from "material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { ROUTES } from "../routers";
import { IStore } from "./types";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}