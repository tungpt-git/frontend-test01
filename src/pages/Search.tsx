import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import { ROUTES } from "../routers";

export default function Search() {
  const history = useHistory();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      minWidth="fit-content"
    >
      <SearchBar
        onSubmit={(query: string) => {
          if (!query) return;
          history.push(
            ROUTES.SEARCH_RESULT.replace(":query", encodeURIComponent(query))
          );
        }}
      />
    </Box>
  );
}
