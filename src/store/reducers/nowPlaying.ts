import { ActionTypes } from "../../utils/enum";
import { IVideo } from "../../utils/types";

type T = IVideo;

const reducers = (
  data: IVideo | null = null,
  action: { type: ActionTypes; payload: T }
) => {
  switch (action.type) {
    case ActionTypes.PLAY_VIDEO: {
      return action.payload;
    }
    case ActionTypes.GET_VIDEO_INFO: {
      return data;
    }
    default:
      return data;
  }
};
export default reducers;
