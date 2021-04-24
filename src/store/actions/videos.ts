import { Dispatch } from "redux";
import * as api from "../../api";
import { ActionTypes } from "../../utils/enum";

export const searchVideos = (query: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.searchVideos({ query });
    console.log(res);

    const action = { type: ActionTypes.SEARCH_VIDEOS, payload: res.data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};
