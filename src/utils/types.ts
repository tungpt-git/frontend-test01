export interface ISegment {
  start: number;
  end: number;
  text: string;
}

export type IMediaControls = {
  isPlaying?: boolean;
  startTime?: number;
};

export interface IVideo {
  uid: string;
  name: string;
  url: string;
  thumbnail: string;
  uploadedDate: string;
  broadCastDate: string;
  source: string;
  segments: ISegment[];
  duration: number;
}

export type IStore = {
  videos: IVideo[];
  query: string;
  nowPlaying: IVideo & IMediaControls;
  filter: IFilter;
};

export type IFilter = {
  broadCastTime: string[];
  durationRange: number[];
  sizeRange: number[];
  category: string[];
  broadCastDateFrom: Date | null;
  broadCastDateTo: Date | null;
};
