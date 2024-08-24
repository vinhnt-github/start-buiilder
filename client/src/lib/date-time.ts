import {
  differenceInHours,
  format,
  formatDistanceToNow,
  isDate,
} from "date-fns";

export const getDistanceTimeToNow = (date: string) => {
  if (!isDate(new Date(date))) return "";

  const diffInHour = differenceInHours(date, Date.now());

  if (diffInHour > 24) return format(date, "ii LLL");
  return formatDistanceToNow(date);
};
