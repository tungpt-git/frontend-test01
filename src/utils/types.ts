export interface IVideo {
  uid: string;
  name: string;
  url: string;
  thumbnail: string;
  uploadedDate: string;
  segments: {
    start: number;
    end: number;
    text: string;
  };
}

export type IStore = {
  videos: IVideo[];
  query: string;
};
