"use client";

import { useSnow } from "@/contexts/snow-context";
import { Button } from "@/components/ui/button";
import { Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

export function SnowToggle() {
  const { isSnowing, toggleSnow } = useSnow();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSnow}
      className={cn(
        "relative transition-all duration-300",
        isSnowing
          ? "bg-sky-100 text-sky-600 hover:bg-sky-200 hover:text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-800/50 dark:hover:text-sky-200"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Snowflake
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-transform duration-300",
          isSnowing && "animate-spin-slow",
        )}
      />
      <span className="sr-only">Toggle snow effect</span>
    </Button>
  );
}
