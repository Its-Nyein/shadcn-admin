"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/features/calendar/components/calendar";
import {
  events,
  eventDates,
  calendars,
} from "@/features/calendar/utils/calendar-data";
import {
  CalendarDays,
  Calendar as CalendarIcon,
  Clock,
  Users,
} from "lucide-react";

export default function CalendarPage() {
  const stats = {
    total: events.length,
    meetings: events.filter((e) => e.type === "meeting").length,
    tasks: events.filter((e) => e.type === "task").length,
    calendars: calendars.length,
  };

  const upcomingCount = events.filter((e) => e.date >= new Date()).length;

  const cards = [
    {
      title: "Total Events",
      value: stats.total.toString(),
      change: `${upcomingCount} upcoming`,
      icon: CalendarDays,
      gradient: "from-violet-500/5",
    },
    {
      title: "Meetings",
      value: stats.meetings.toString(),
      change: "Scheduled",
      icon: Users,
      gradient: "from-blue-500/5",
    },
    {
      title: "Tasks",
      value: stats.tasks.toString(),
      change: "To complete",
      icon: Clock,
      gradient: "from-amber-500/5",
    },
    {
      title: "Calendars",
      value: stats.calendars.toString(),
      change: "Active",
      icon: CalendarIcon,
      gradient: "from-fuchsia-500/5",
    },
  ];

  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className={`@container/card bg-linear-to-br ${card.gradient} via-background to-background border-border/50 shadow-sm hover:shadow-md transition-shadow`}
              >
                <CardHeader>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {card.value}
                  </CardTitle>
                  <CardAction>
                    <Badge
                      variant="outline"
                      className="border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    >
                      <Icon className="mr-1 size-3" />
                      {card.change}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                    Track your schedule
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Calendar Card */}
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              View and manage your calendar events
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar events={events} eventDates={eventDates} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
