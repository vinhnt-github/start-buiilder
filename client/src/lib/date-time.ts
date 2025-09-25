import {
  differenceInHours,
  format,
  formatDistanceToNow,
  isDate,
} from "date-fns";

export const getDistanceTimeToNow = (date: string) => {
  if (!isDate(new Date(date))) return "";

  const diffInHour = differenceInHours(new Date(date), Date.now());

  if (Math.abs(diffInHour) > 24) return format(new Date(date), "dd/MM/yyyy");
  return formatDistanceToNow(date);
};
