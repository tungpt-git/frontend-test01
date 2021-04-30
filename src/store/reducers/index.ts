import { combineReducers } from "redux";
import videos from "./videos";
import query from "./query";

export default combineReducers({
  videos,
  query,
});
