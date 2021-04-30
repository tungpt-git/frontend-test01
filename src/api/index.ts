import axios, { AxiosResponse } from "axios";

export const proxy = process.env.REACT_APP_PROXY || "";

export const searchVideos = async (req: { query: string }) => {
  return await axios
    .post<AxiosResponse<any>>(`/videos/search`, req)
    .then((data: any) => {
      return {
        total: data.hits.total.value,
        items: data.hits.hits.map((item: any) => ({
          ...item._source,
          segments: item.inner_hits.segments.hits.hits.map((s: any) => ({
            start: s._source.start,
            end: s._source.end,
            text: s._source.text,
          })),
        })),
      };
    });
};
