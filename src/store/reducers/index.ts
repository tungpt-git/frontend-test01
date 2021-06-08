import { combineReducers } from "redux";
import videos from "./videos";
import query from "./query";
import nowPlaying from "./nowPlaying";
import filter from "./filter";

export default combineReducers({
  videos,
  query,
  nowPlaying,
  filter,
});
