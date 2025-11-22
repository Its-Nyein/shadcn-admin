import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChartBar,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

export const sidebarData = {
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "NextJs + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Business Dashboard",
          url: "/dashboard2",
          icon: IconChartBar,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: IconChecklist,
        },
        {
          title: "Apps",
          url: "/apps",
          icon: IconPackages,
        },
        {
          title: "Chats",
          url: "/chats",
          badge: "3",
          icon: IconMessages,
        },
        {
          title: "Users",
          url: "/users",
          icon: IconUsers,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Auth",
          icon: IconLockAccess,
          items: [
            {
              title: "Sign In 1",
              url: "/sign-in-1",
            },
            {
              title: "Sign In (2 Col)",
              url: "/sign-in-2",
            },
            {
              title: "Sign Up 1",
              url: "/sign-up-1",
            },
            {
              title: "Sign Up 2 (2 Col)",
              url: "/sign-up-2",
            },
            {
              title: "Reset Password 1",
              url: "/reset-password-1",
            },
            {
              title: "Reset Password 2",
              url: "/reset-password-2",
            },
          ],
        },
        {
          title: "Errors",
          icon: IconBug,
          items: [
            {
              title: "Unauthorized",
              url: "/unauthorized",
              icon: IconLock,
            },
            {
              title: "Forbidden",
              url: "/forbidden",
              icon: IconUserOff,
            },
            {
              title: "Not Found",
              url: "/not-found",
              icon: IconError404,
            },
            {
              title: "Internal Server Error",
              url: "/internal-server-error",
              icon: IconServerOff,
            },
            {
              title: "Maintenance Error",
              url: "/maintenance-error",
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings/profile",
              icon: IconUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: IconTool,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: IconPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: IconNotification,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: IconHelp,
        },
      ],
    },
  ],
};
