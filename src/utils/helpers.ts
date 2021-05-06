import moment from "moment";

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
