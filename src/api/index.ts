import axios, { AxiosResponse } from "axios";
import { Operation, OperationLabel } from "../utils/enum";
import { IVideo } from "../utils/types";

export const proxy = process.env.REACT_APP_PROXY || "";

const OPERATORS = [
  { label: OperationLabel.AND, id: Operation.AND },
  { label: OperationLabel.NOT, id: Operation.NOT },
];

export const searchVideos = async (req: { query: string }) => {
  const arr = req.query.split("@");

  const temp = arr
    .map((item) => {
      const text = item.slice(item.indexOf("$") + 1).trim();
      for (const op of OPERATORS) {
        if (item.includes(`[${op.label}](${op.id})`)) {
          return {
            operation: op.id,
            text,
          };
        }
      }

      return {
        operation: Operation.AND,
        text,
      };
    })
    .filter((i) => !!i.text);

  const getFn = (op: Operation) => {
    return temp
      .filter((item) => item?.operation === op)
      .map((item) => item.text);
  };

  const match = getFn(Operation.AND);
  const notMatch = getFn(Operation.NOT);

  console.log({ match, notMatch });

  return await axios
    .post<AxiosResponse<any>>(`/videos/complex-search`, { match, notMatch })
    .then(({ data }: any) => data);
};

export const getVideo = async (req: { id: string }): Promise<IVideo> => {
  return await axios.get<IVideo>(`/videos/${req.id}`).then(({ data }) => data);
};
