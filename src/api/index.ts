import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { Operation, OperationLabel } from "../utils/enum";
import { getOperationArr } from "../utils/helpers";
import { IFilter, IVideo } from "../utils/types";

export const proxy = process.env.REACT_APP_PROXY || "";

export const searchVideos = async ({
  query,
  filter,
}: {
  query: string;
  filter?: IFilter;
}) => {
  const match = getOperationArr(query, Operation.AND);
  const notMatch = getOperationArr(query, Operation.NOT);

  const { uploadedDateFrom: uf, uploadedDateTo: ut } = filter || {};

  return await axios
    .post<AxiosResponse<any>>(`/videos/complex-search`, {
      match,
      notMatch,
      filter: {
        ...filter,
        uploadedDateFrom: !uf ? null : moment(uf).startOf("day"),
        uploadedDateTo: !ut ? null : moment(ut).endOf("date"),
      },
    })
    .then(({ data }: any) => data);
};

export const getVideo = async (req: { id: string }): Promise<IVideo> => {
  return await axios.get<IVideo>(`/videos/${req.id}`).then(({ data }) => data);
};
