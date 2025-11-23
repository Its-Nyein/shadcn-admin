"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tasksData from "@/constants/tasks.json";
import { columns } from "@/features/tasks/components/columns";
import { DataTable } from "@/features/tasks/components/data-table";
import type { Task } from "@/features/tasks/utils/schema";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckCircle,
  Circle,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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

  const performanceMetrics = [
    {
      title: "Total Tasks",
      current: stats.total.toString(),
      previous: "35",
      growth: 14.3,
      icon: Circle,
    },
    {
      title: "Completed",
      current: stats.done.toString(),
      previous: "12",
      growth: completionRate > 50 ? 8.5 : -5.2,
      icon: CheckCircle,
    },
    {
      title: "In Progress",
      current: stats.inProgress.toString(),
      previous: "8",
      growth: 12.5,
      icon: Clock,
    },
    {
      title: "Completion Rate",
      current: `${completionRate}%`,
      previous: "45%",
      growth: completionRate - 45,
      icon: TrendingUp,
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="border">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <metric.icon className="text-muted-foreground size-6" />
                  <Badge
                    variant="outline"
                    className={cn(
                      metric.growth >= 0
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400",
                    )}
                  >
                    {metric.growth >= 0 ? (
                      <>
                        <TrendingUp className="me-1 size-3" />+{metric.growth}%
                      </>
                    ) : (
                      <>
                        <TrendingDown className="me-1 size-3" />
                        {metric.growth}%
                      </>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">
                    {metric.title}
                  </p>
                  <div className="text-2xl font-bold">{metric.current}</div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span>from {metric.previous}</span>
                    <ArrowUpRight className="size-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Table Card */}
        <Card className="border">
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
