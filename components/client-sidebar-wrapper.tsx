"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "./theme-provider";

export function ClientSidebarWrapper({ children }: { children: React.ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const collapsed = Cookies.get("sidebar-collapsed") !== "false";
    setDefaultOpen(collapsed);
  }, []);

  if (defaultOpen === null) return null;
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar />
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}
