import axios, { AxiosResponse } from "axios";

export const proxy = process.env.REACT_APP_PROXY || "";

export const searchVideos = async (req: { query: string }) => {
  return await axios
    .post<AxiosResponse<any>>(`/videos/search`, req)
    .then(({ data }: any) => {
      return data;
    });
};

export const getVideo = async (req: { id: string }) => {
  return await axios.get(`/videos/${req.id}`);
};
