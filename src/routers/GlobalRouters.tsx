import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTES } from ".";
import { Search, SearchResult } from "../pages";

export default function GlobalRouters() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.SEARCH}>
          <Search />
        </Route>
        <Route path={ROUTES.SEARCH_RESULT}>
          <SearchResult />
        </Route>
      </Switch>
    </Router>
  );
}
