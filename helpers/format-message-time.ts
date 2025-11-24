import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, "h:mm a");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (isThisWeek(date)) {
    return format(date, "EEEE");
  } else if (isThisYear(date)) {
    return format(date, "MMM d");
  } else {
    return format(date, "dd/MM/yy");
  }
}
