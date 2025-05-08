import React from "react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

export function Sidebar({ ...props }: React.ComponentProps<typeof UISidebar>) {
  return (
    <UISidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  );
}
