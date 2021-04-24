import axios from "axios";

export const proxy = process.env.REACT_APP_PROXY || "";

export const searchVideos = (req: { query: string }) => {
  return axios.post(`/videos/search`, req);
};
