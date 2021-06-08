export enum ActionTypes {
  SEARCH_VIDEOS = "SEARCH_VIDEOS",
  UPDATE_QUERY = "UPDATE_QUERY",
  PLAY_VIDEO = "PLAY_VIDEO",
  GET_VIDEO_INFO = "GET_VIDEO_INFO",
  UPDATE_FILTER = "UPDATE_FILTER",
  CLEAR_FILTER = "CLEAR_FILTER",
}
export enum Operation {
  AND = "and",
  NOT = "not",
}

export enum OperationLabel {
  AND = "và",
  NOT = "không có",
}

export const OPERATORS = [
  { label: OperationLabel.AND, id: Operation.AND },
  { label: OperationLabel.NOT, id: Operation.NOT },
];
