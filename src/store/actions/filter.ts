import { Dispatch } from "redux";
import { ActionTypes } from "../../utils/enum";
import { IFilter } from "../../utils/types";

export const updateFilter =
  (payload: Partial<IFilter>) => (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_FILTER, payload });
  };

export const clearFilter = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_FILTER });
};
