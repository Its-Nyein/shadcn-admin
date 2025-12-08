"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Bell, Monitor, Palette, UserCog, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
    icon: UserCog,
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: Wrench,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Display",
    href: "/settings/display",
    icon: Monitor,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: typeof sidebarNavItems;
}

function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start gap-2",
              isActive
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
            )}
          >
            <Icon className="size-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarNavMobile({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentItem = items.find((item) => item.href === pathname) ?? items[0];
  const CurrentIcon = currentItem.icon;

  return (
    <Select value={pathname} onValueChange={(value) => router.push(value)}>
      <SelectTrigger className="w-full">
        <SelectValue>
          <CurrentIcon className="size-4" />
          {currentItem.title}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <SelectItem key={item.href} value={item.href}>
              <Icon className="size-4" />
              {item.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

function SidebarNavTabs({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
      <TabsList>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <TabsTrigger key={item.href} value={item.href}>
              <Icon className="size-4" />
              {item.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] flex-col">
      <div className="shrink-0 px-4 pt-6 lg:px-6">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="md:hidden">
          <SidebarNavMobile items={sidebarNavItems} />
        </div>
        <div className="hidden md:block lg:hidden">
          <SidebarNavTabs items={sidebarNavItems} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-12 px-4 lg:px-6 mt-2">
        <aside className="hidden shrink-0 lg:block lg:w-52">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <div className="flex-1 overflow-y-auto pb-6">{children}</div>
      </div>
    </div>
  );
}
