"use client";

import { useState, useCallback } from "react";
import { type CalendarEvent } from "../types";

export interface UseCalendarState {
  selectedDate: Date;
  showEventForm: boolean;
  editingEvent: CalendarEvent | null;
  showCalendarSheet: boolean;
  events: CalendarEvent[];
}

export interface UseCalendarActions {
  setSelectedDate: (date: Date) => void;
  setShowEventForm: (show: boolean) => void;
  setEditingEvent: (event: CalendarEvent | null) => void;
  setShowCalendarSheet: (show: boolean) => void;
  handleDateSelect: (date: Date) => void;
  handleNewEvent: () => void;
  handleNewCalendar: () => void;
  handleSaveEvent: (_eventData: Partial<CalendarEvent>) => void;
  handleDeleteEvent: (_eventId: number) => void;
  handleEditEvent: (event: CalendarEvent) => void;
}

export interface UseCalendarReturn
  extends UseCalendarState, UseCalendarActions {}

export function useCalendar(
  initialEvents: CalendarEvent[] = [],
): UseCalendarReturn {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showCalendarSheet, setShowCalendarSheet] = useState(false);
  const [events] = useState<CalendarEvent[]>(initialEvents);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    // Auto-close mobile sheet when date is selected
    setShowCalendarSheet(false);
  }, []);

  const handleNewEvent = useCallback(() => {
    setEditingEvent(null);
    setShowEventForm(true);
  }, []);

  const handleNewCalendar = useCallback(() => {}, []);

  const handleSaveEvent = useCallback((_eventData: Partial<CalendarEvent>) => {
    setShowEventForm(false);
    setEditingEvent(null);
  }, []);

  const handleDeleteEvent = useCallback((_eventId: number) => {
    setShowEventForm(false);
    setEditingEvent(null);
  }, []);

  const handleEditEvent = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setShowEventForm(true);
  }, []);

  return {
    // State
    selectedDate,
    showEventForm,
    editingEvent,
    showCalendarSheet,
    events,
    // Actions
    setSelectedDate,
    setShowEventForm,
    setEditingEvent,
    setShowCalendarSheet,
    handleDateSelect,
    handleNewEvent,
    handleNewCalendar,
    handleSaveEvent,
    handleDeleteEvent,
    handleEditEvent,
  };
}
