import React from "react";
import { useDispatch } from "react-redux";
import { searchVideos } from "../api";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Search() {
  const dispatch = useDispatch();

  return (
    <>
      <SearchBar
        onSubmit={(query: string) => {
          if (!query) return;
          dispatch(searchVideos({ query }));
        }}
      />
    </>
  );
}
