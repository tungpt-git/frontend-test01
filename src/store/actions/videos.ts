import { Dispatch } from "redux";
import * as api from "../../api";
import { ActionTypes } from "../../utils/enum";

export const searchVideos = (query: string) => async (dispatch: Dispatch) => {
  try {
    const res: any = await api.searchVideos({ query });
    console.log("res", res);
    dispatch({
      type: ActionTypes.SEARCH_VIDEOS,
      payload: res.items,
    });
  } catch (error) {
    console.log(error.message);
  }
};
