import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ROUTES } from ".";
import { AudioPlayerLayout } from "../layouts";
import { Search, SearchResult, WatchVideo } from "../pages";

export default function GlobalRouters() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={ROUTES.SEARCH} />} />
        <Route exact path={ROUTES.SEARCH}>
          <Search />
        </Route>
        <Route exact path={ROUTES.SEARCH_RESULT}>
          <AudioPlayerLayout>
            <SearchResult />
          </AudioPlayerLayout>
        </Route>
        <Route exact path={ROUTES.VIDEO}>
          <WatchVideo />
        </Route>
      </Switch>
    </Router>
  );
}
