import { cloneDeep } from "lodash";
import { ActionTypes } from "../../utils/enum";
import { IFilter } from "../../utils/types";

export const DURATION_MIN = 1; //Second
export const DURATION_MAX = 2 * 60 * 60;
export const SIZE_MIN = 1 * 1024; //1 MB
export const SIZE_MAX = 1 * 1024 * 1024;
type T = IFilter;

const init: T = {
  broadCastTime: [],
  durationRange: [DURATION_MIN, DURATION_MAX],
  sizeRange: [SIZE_MIN, SIZE_MAX],
  category: [],
  uploadedDateFrom: null,
  uploadedDateTo: null,
};

const reducers = (
  obj: T = init,
  action: { type: ActionTypes; payload: Partial<T> }
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FILTER: {
      return { ...obj, ...action.payload };
    }
    case ActionTypes.CLEAR_FILTER: {
      return cloneDeep(init);
    }
    default:
      return obj;
  }
};
export default reducers;
