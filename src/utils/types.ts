export interface IVideo {
  name: string;
  segments: {
    start: number;
    end: number;
    text: string;
  };
}
