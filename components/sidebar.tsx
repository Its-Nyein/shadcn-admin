"use client";

import React from "react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { sidebarData } from "@/data/sidebar-data";
import { TeamSwitcher } from "./team-switcher";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { useAuth } from "@/contexts/auth-context";

export function Sidebar({ ...props }: React.ComponentProps<typeof UISidebar>) {
  const { user } = useAuth();

  const userData = user
    ? {
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      }
    : sidebarData.user;

  return (
    <UISidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((nav) => (
          <NavGroup key={nav.title} {...nav} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
