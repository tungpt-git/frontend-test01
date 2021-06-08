import { Dispatch } from "redux";
import { ActionTypes } from "../../utils/enum";
import { IMediaControls, IVideo } from "../../utils/types";
import * as api from "../../api";
export const playVideo =
  (item: IVideo & IMediaControls) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_VIDEO,
      payload: item,
    });
  };

export const getInfo = (id: string) => async (dispatch: Dispatch) => {
  const res = await api.getVideo({ id });
  dispatch({
    type: ActionTypes.GET_VIDEO_INFO,
    payload: res,
  });
};
