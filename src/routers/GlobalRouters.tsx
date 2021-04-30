import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTES } from ".";
import { Search, SearchResult, WatchVideo } from "../pages";

export default function GlobalRouters() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.SEARCH}>
          <Search />
        </Route>
        <Route exact path={ROUTES.SEARCH_RESULT}>
          <SearchResult />
        </Route>
        <Route exact path={ROUTES.VIDEO}>
          <WatchVideo />
        </Route>
      </Switch>
    </Router>
  );
}
