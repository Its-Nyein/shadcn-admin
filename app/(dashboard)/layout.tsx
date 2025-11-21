"use client";

import AppSidebar from "@/components/app-sidebar";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { ToggleTheme } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { Settings } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (
      mounted &&
      sessionStorage.getItem("social-sign-in-pending") === "true"
    ) {
      toast.success("Signed in successfully!", {
        description: "Welcome back to your dashboard.",
      });
      sessionStorage.removeItem("social-sign-in-pending");
    }
  }, [mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <SidebarConfigProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />

            <div className="ml-auto flex items-center gap-1">
              <ToggleTheme />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setThemeCustomizerOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Open theme customizer</span>
              </Button>

              <ThemeCustomizer
                open={themeCustomizerOpen}
                onOpenChange={setThemeCustomizerOpen}
              />

              <Separator
                orientation="vertical"
                className="mx-2 h-6 bg-border/50"
              />

              <ProfileDropdown />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarConfigProvider>
  );
}
