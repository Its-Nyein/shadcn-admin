import { type CalendarEvent, type Calendar } from "./types";

import eventsData from "@/features/calendar/data/events.json";
import eventDatesData from "@/features/calendar/data/event-dates.json";
import calendarsData from "@/features/calendar/data/calendars.json";

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
      type: event.type as CalendarEvent["type"],
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

// Parsed calendar events with proper Date objects
export const events: CalendarEvent[] = parseCalendarEvents(eventsData);

// Parsed event dates for calendar picker
export const eventDates = parseEventDates(eventDatesData);

// Calendar categories
export const calendars: Calendar[] = calendarsData as Calendar[];

// Export raw data for reference
export { eventsData, eventDatesData, calendarsData };
