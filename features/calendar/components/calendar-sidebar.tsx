"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendars } from "./calendars";
import { DatePicker } from "./date-picker";

interface CalendarSidebarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onNewCalendar?: () => void;
  onNewEvent?: () => void;
  events?: Array<{ date: Date; count: number }>;
  className?: string;
}

export function CalendarSidebar({
  selectedDate,
  onDateSelect,
  onNewCalendar,
  onNewEvent,
  events = [],
  className,
}: CalendarSidebarProps) {
  return (
    <div
      className={`flex flex-col h-full bg-background rounded-lg ${className}`}
    >
      <div className="p-6 border-b">
        <Button
          className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600"
          onClick={onNewEvent}
        >
          <Plus className="size-4" />
          Add New Event
        </Button>
      </div>

      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        events={events}
      />

      <Separator />

      <div className="flex-1 p-4">
        <Calendars
          onNewCalendar={onNewCalendar}
          onCalendarToggle={(calendarId, visible) => {
            console.log(`Calendar ${calendarId} visibility: ${visible}`);
          }}
          onCalendarEdit={(calendarId) => {
            console.log(`Edit calendar: ${calendarId}`);
          }}
          onCalendarDelete={(calendarId) => {
            console.log(`Delete calendar: ${calendarId}`);
          }}
        />
      </div>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start cursor-pointer border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/50"
          onClick={onNewCalendar}
        >
          <Plus className="size-4" />
          New Calendar
        </Button>
      </div>
    </div>
  );
}
