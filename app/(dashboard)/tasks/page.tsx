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
import tasksData from "@/constants/tasks.json";
import { columns } from "@/features/tasks/components/columns";
import { DataTable } from "@/features/tasks/components/data-table";
import type { Task } from "@/features/tasks/utils/schema";
import { CheckCircle, Circle, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(tasksData as Task[]);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    inProgress: tasks.filter((t) => t.status === "in progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  const completionRate = Math.round((stats.done / stats.total) * 100);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total.toString(),
      change: `${stats.todo} pending`,
      icon: Circle,
      gradient: "from-violet-500/5",
    },
    {
      title: "Completed",
      value: stats.done.toString(),
      change: `${completionRate}% done`,
      icon: CheckCircle,
      gradient: "from-emerald-500/5",
    },
    {
      title: "In Progress",
      value: stats.inProgress.toString(),
      change: "Active now",
      icon: Clock,
      gradient: "from-amber-500/5",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      change: "+5% this week",
      icon: TrendingUp,
      gradient: "from-fuchsia-500/5",
    },
  ];

  return (
    <>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your project tasks
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
                    Track your progress
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Data Table Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>
              A list of all tasks with filtering, sorting, and pagination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={tasks}
              onAddTask={handleAddTask}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
