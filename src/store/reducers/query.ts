import { ActionTypes } from "../../utils/enum";

type T = string;

const reducers = (query: T = "", action: { type: ActionTypes; payload: T }) => {
  switch (action.type) {
    case ActionTypes.UPDATE_QUERY: {
      return action.payload;
    }
    default:
      return query;
  }
};
export default reducers;
