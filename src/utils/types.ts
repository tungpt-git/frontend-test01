export interface IVideo {
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
