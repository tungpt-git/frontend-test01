import { Dispatch } from "redux";
import { ActionTypes } from "../../utils/enum";

export const updateQuery = (query: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_QUERY,
    payload: query,
  });
};
