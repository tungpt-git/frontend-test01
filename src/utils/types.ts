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
  source: string;
  segments: ISegment[];
}

export type IStore = {
  videos: IVideo[];
  query: string;
  nowPlaying: IVideo & IMediaControls;
};
