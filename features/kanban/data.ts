import { nanoid } from "nanoid";
import type { KanbanTask } from "./schema";

export const initialTasks: KanbanTask[] = [
  {
    id: nanoid(),
    title: "Setup CI/CD Pipeline",
    description:
      "Configure automated deployment pipeline with GitHub Actions and AWS",
    assignee: { name: "Alex Morgan", avatar: "https://github.com/shadcn.png" },
    priority: "high",
    status: "todo",
  },
  {
    id: nanoid(),
    title: "Design System Documentation",
    description:
      "Create comprehensive documentation for the design system components",
    assignee: { name: "Jordan Lee", avatar: "https://github.com/leerob.png" },
    priority: "medium",
    status: "todo",
  },
  {
    id: nanoid(),
    title: "API Integration",
    description: "Integrate third-party payment gateway API",
    assignee: { name: "Taylor Swift", avatar: "https://github.com/rauchg.png" },
    priority: "high",
    status: "in_progress",
  },
  {
    id: nanoid(),
    title: "User Authentication Flow",
    description: "Implement OAuth2 authentication with social login support",
    assignee: {
      name: "Casey Brooks",
      avatar: "https://github.com/timneutkens.png",
    },
    priority: "high",
    status: "in_progress",
  },
  {
    id: nanoid(),
    title: "Database Migration",
    description: "Migrate legacy database to new PostgreSQL schema",
    assignee: {
      name: "Riley Carter",
      avatar: "https://github.com/jaredpalmer.png",
    },
    priority: "medium",
    status: "in_progress",
  },
  {
    id: nanoid(),
    title: "Unit Tests Setup",
    description: "Configure Jest and React Testing Library for unit tests",
    assignee: {
      name: "Morgan Davis",
      avatar: "https://github.com/shuding.png",
    },
    priority: "low",
    status: "done",
  },
  {
    id: nanoid(),
    title: "Landing Page Redesign",
    description: "Complete redesign of the marketing landing page",
    assignee: {
      name: "Quinn Foster",
      avatar: "https://github.com/evilrabbit.png",
    },
    priority: "medium",
    status: "done",
  },
  {
    id: nanoid(),
    title: "Performance Optimization",
    description: "Optimize bundle size and implement lazy loading",
    assignee: { name: "Avery Grant", avatar: "https://github.com/leeerob.png" },
    priority: "high",
    status: "done",
  },
];
