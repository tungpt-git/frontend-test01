import { ActionTypes } from "../../utils/enum";
import { IVideo } from "../../utils/types";

const reducers = (videos: IVideo[] = [], action: any) => {
  console.log("action", action);
  switch (action.type) {
    case ActionTypes.SEARCH_VIDEOS: {
      return action.payload;
    }
    default:
      return videos;
  }
};
export default reducers;
