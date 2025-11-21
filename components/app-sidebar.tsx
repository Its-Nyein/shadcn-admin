"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  Sidebar as UISidebar,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants/sidebar-data";
import { useAuth } from "@/contexts/auth-context";
import { useSidebarConfig } from "@/contexts/sidebar-context";
import React from "react";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof UISidebar>) {
  const { user } = useAuth();
  const { config } = useSidebarConfig();

  return (
    <UISidebar
      variant={config.variant}
      collapsible={config.collapsible}
      side={config.side}
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((nav) => (
          <NavGroup key={nav.title} {...nav} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              avatar: user.avatar || "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
