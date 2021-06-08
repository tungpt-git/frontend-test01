import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as api from "../../api";
import { ActionTypes } from "../../utils/enum";
import { IFilter } from "../../utils/types";

export const searchVideos =
  (query: string, filter?: IFilter) => async (dispatch: Dispatch) => {
    try {
      const res: any = await api.searchVideos({ query, filter });
      dispatch({
        type: ActionTypes.SEARCH_VIDEOS,
        payload: res.items,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
