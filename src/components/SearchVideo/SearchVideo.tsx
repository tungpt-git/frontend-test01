import React from "react";
import { ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../routers";
import { IStore } from "../../utils/types";
import SearchBar from "../SearchBar/SearchBar";

export default function SearchVideo() {
  const history = useHistory();
  const query = useSelector((state: IStore) => state.query);
  return (
    <>
      <IconButton
        aria-label="back"
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBack />
      </IconButton>
      <SearchBar
        defaultValue={query}
        onSubmit={(s: string) => {
          history.push(
            ROUTES.SEARCH_RESULT + `?query=${encodeURIComponent(s)}`
          );
        }}
      />
    </>
  );
}
