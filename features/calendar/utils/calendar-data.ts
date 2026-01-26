import { type CalendarEvent, type Calendar } from "./types";

// Import JSON data from constants
import eventsData from "@/constants/events.json";
import eventDatesData from "@/constants/event-dates.json";
import calendarsData from "@/constants/calendars.json";

/**
 * Parse calendar events from JSON and convert to CalendarEvent objects
 * Uses current month/year with the day and time from JSON data
 */
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

/**
 * Parse event dates for calendar date picker highlighting
 * Uses current month/year with the day from JSON data
 */
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
