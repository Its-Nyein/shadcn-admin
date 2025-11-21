"use client";

import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";
import { useRouter } from "next/navigation";

export function InternalServerError() {
  const router = useRouter();
  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <ServerCrash className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-[7rem] leading-tight font-bold">500</h1>
        <span className="font-medium">Internal Server Error</span>
        <p className="text-muted-foreground text-center">
          Something went wrong on our end. <br />
          Our team has been notified. Please try again later.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
