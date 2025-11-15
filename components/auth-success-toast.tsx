"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function AuthSuccessToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Welcome back!", {
        description: "You have successfully signed in.",
      });
    }
  }, [searchParams]);

  return null;
}
