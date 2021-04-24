import { ActionTypes } from "../../utils/enum";

const reducers = (videos: any = [], action: any) => {
  switch (action.type) {
    case ActionTypes.SEARCH_VIDEOS: {
      return action.payload;
    }
    default:
      return [];
  }
};
export default reducers;
