import moment from "moment";
import { Operation, OPERATORS } from "./enum";

export const milisec2Minutes = (x: number) => {
  const pret = (n: number) => {
    return n < 10 ? `0${n}` : `${n}`;
  };
  const seconds = pret(moment.duration(x).seconds());
  const minutes = pret(moment.duration(x).minutes());
  const hours = Math.trunc(moment.duration(x).asHours());

  if (!hours) return minutes + ":" + seconds;
  return pret(hours) + ":" + minutes + ":" + seconds;
};

export const getOperationArr = (query: string, operation: Operation) => {
  const arr = query.split("@");

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

  return getFn(operation);
};
