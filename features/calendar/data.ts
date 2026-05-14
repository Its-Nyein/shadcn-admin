import { type Calendar, type CalendarEvent } from "./types";
import eventsData from "@/features/calendar/data/events.json";
import eventDatesData from "@/features/calendar/data/event-dates.json";
import calendarsData from "@/features/calendar/data/calendars.json";

const EVENT_TYPES: CalendarEvent["type"][] = [
  "meeting",
  "event",
  "personal",
  "task",
  "reminder",
];

const CALENDAR_TYPES: Calendar["type"][] = ["personal", "work", "shared"];

export function parseCalendarEvents(
  rawEvents: typeof eventsData,
): CalendarEvent[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return rawEvents.map((event) => {
    const [dayStr, timeStr] = event.date.split("T");
    const day = parseInt(dayStr);
    const [hours, minutes] = timeStr.split(":").map((n) => parseInt(n));

    const eventDate = new Date(currentYear, currentMonth, day, hours, minutes);

    return {
      ...event,
      date: eventDate,
      type: EVENT_TYPES.includes(event.type as CalendarEvent["type"])
        ? (event.type as CalendarEvent["type"])
        : "task",
    };
  });
}

export function parseEventDates(rawDates: typeof eventDatesData) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return rawDates.map((item) => {
    const day = parseInt(item.date.split("T")[0]);
    return {
      date: new Date(currentYear, currentMonth, day),
      count: item.count,
    };
  });
}

export const events: CalendarEvent[] = parseCalendarEvents(eventsData);
export const eventDates = parseEventDates(eventDatesData);
export const calendars: Calendar[] = calendarsData.map((c) => ({
  ...c,
  type: CALENDAR_TYPES.includes(c.type as Calendar["type"])
    ? (c.type as Calendar["type"])
    : "personal",
}));
export { eventsData, eventDatesData, calendarsData };
