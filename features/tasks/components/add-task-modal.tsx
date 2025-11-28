"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { Task } from "../utils/schema";
import { taskFormSchema, type TaskFormSchema } from "../utils/schema";
import { labels, priorities, statuses } from "../utils/task-data";

interface AddTaskModalProps {
  onAddTask?: (task: Task) => void;
  trigger?: React.ReactNode;
}

export function AddTaskModal({ onAddTask, trigger }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TaskFormSchema>({
    id: "",
    title: "",
    description: "",
    status: "todo",
    label: "feature",
    priority: "medium",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateTaskId = () => {
    const prefix = "TASK";
    const number = Math.floor(Math.random() * 9999) + 1000;
    return `${prefix}-${number}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = taskFormSchema.parse({
        ...formData,
        id: generateTaskId(),
      });

      const newTask: Task = {
        id: validatedData.id,
        title: validatedData.title,
        status: validatedData.status,
        label: validatedData.label,
        priority: validatedData.priority,
      };

      onAddTask?.(newTask);

      setFormData({
        id: "",
        title: "",
        description: "",
        status: "todo",
        label: "feature",
        priority: "medium",
      });
      setErrors({});
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      status: "todo",
      label: "feature",
      priority: "medium",
    });
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="size-4" />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task to track work and progress. Fill in the details
            below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide additional details about the task..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          {/* Task Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center">
                      {status.icon && (
                        <status.icon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Select
              value={formData.label}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, label: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                {labels.map((label) => (
                  <SelectItem key={label.value} value={label.value}>
                    <Badge variant="outline" className="cursor-pointer">
                      {label.label}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center">
                      {priority.icon && (
                        <priority.icon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              <Plus className="size-4" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
