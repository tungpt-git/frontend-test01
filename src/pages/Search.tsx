import React from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar/SearchBar";
import { searchVideos } from "../store/actions/videos";

export default function Search() {
  const dispatch = useDispatch();

  return (
    <>
      <SearchBar
        onSubmit={(query: string) => {
          if (!query) return;
          dispatch(searchVideos(query));
        }}
      />
    </>
  );
}
