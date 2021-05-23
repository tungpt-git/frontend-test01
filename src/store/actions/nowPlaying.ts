import { Dispatch } from "redux";
import { ActionTypes } from "../../utils/enum";
import { IMediaControls, IVideo } from "../../utils/types";

export const playVideo =
  (item: IVideo & IMediaControls) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_VIDEO,
      payload: item,
    });
  };
