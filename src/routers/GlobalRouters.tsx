import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "../pages";

export default function GlobalRouters() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route path="/about"></Route>
      </Switch>
    </Router>
  );
}
