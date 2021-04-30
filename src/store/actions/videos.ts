import { Dispatch } from "redux";
import * as api from "../../api";
import { ActionTypes } from "../../utils/enum";

export const searchVideos = (query: string) => async (dispatch: Dispatch) => {
  try {
    console.log(query);
    dispatch({ type: ActionTypes.UPDATE_QUERY, payload: query });

    const res: any = await api.searchVideos({ query });
    dispatch({
      type: ActionTypes.SEARCH_VIDEOS,
      payload: res.items,
    });
  } catch (error) {
    console.log(error.message);
  }
};
