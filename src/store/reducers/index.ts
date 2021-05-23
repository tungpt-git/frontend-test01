import { combineReducers } from "redux";
import videos from "./videos";
import query from "./query";
import nowPlaying from "./nowPlaying";

export default combineReducers({
  videos,
  query,
  nowPlaying,
});
