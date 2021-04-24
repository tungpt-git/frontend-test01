import { Dispatch } from "redux";
import * as api from "../../api";
import { ActionTypes } from "../../utils/enum";

export const searchVideos = (query: string) => async (dispatch: Dispatch) => {
  try {
    const res: any = await api.searchVideos({ query });

    dispatch({ type: ActionTypes.SEARCH_VIDEOS, payload: res.hits });
  } catch (error) {
    console.log(error.message);
  }
};
