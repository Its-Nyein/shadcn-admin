"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", {
        description: "You have been logged out of your account.",
      });
      router.push("/sign-in");
    } catch {
      toast.error("Logout failed", {
        description: "An error occurred while logging out.",
      });
    }
  };

  return { showLogoutDialog, setShowLogoutDialog, handleLogout };
}
