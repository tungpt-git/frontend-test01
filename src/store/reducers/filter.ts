import { cloneDeep } from "lodash";
import { ActionTypes } from "../../utils/enum";
import { IFilter } from "../../utils/types";

export const DURATION_MIN = 1;
export const DURATION_MAX = 2 * 60 * 60;

type T = IFilter;

const init: T = {
  broadCastTime: [],
  durationRange: [DURATION_MIN, DURATION_MAX],
  sizeRange: [0, 100],
  category: [],
  uploadedDate: null,
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
