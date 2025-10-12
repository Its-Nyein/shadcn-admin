"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "./theme-provider";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];

export function ClientSidebarWrapper({ children }: { children: React.ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const collapsed = Cookies.get("sidebar-collapsed") !== "false";
    setDefaultOpen(collapsed);
  }, []);

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  if (defaultOpen === null) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {isAuthRoute ? (
        // Render without sidebar for auth routes
        children
      ) : (
        // Render with sidebar for protected routes
        <SidebarProvider defaultOpen={defaultOpen}>
          <Sidebar />
          {children}
        </SidebarProvider>
      )}
    </ThemeProvider>
  );
}
