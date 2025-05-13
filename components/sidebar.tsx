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

export function Sidebar({ ...props }: React.ComponentProps<typeof UISidebar>) {
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
