export interface ISegment {
  start: number;
  end: number;
  text: string;
}
export interface IVideo {
  uid: string;
  name: string;
  url: string;
  thumbnail: string;
  uploadedDate: string;
  segments: ISegment[]
}

export type IStore = {
  videos: IVideo[];
  query: string;
};
