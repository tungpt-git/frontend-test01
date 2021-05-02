import axios, { AxiosResponse } from "axios";
import { IVideo } from "../utils/types";

export const proxy = process.env.REACT_APP_PROXY || "";

export const searchVideos = async (req: { query: string }) => {
  return await axios
    .post<AxiosResponse<any>>(`/videos/search`, req)
    .then(({ data }: any) => data);
};

export const getVideo = async (req: { id: string }): Promise<IVideo> => {
  return await axios.get<IVideo>(`/videos/${req.id}`).then(({ data }) => data);
};
