"use client";

import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { useRouter } from "next/navigation";

export function MaintenanceError() {
  const router = useRouter();
  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <Construction className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-[7rem] leading-tight font-bold">503</h1>
        <span className="font-medium">Under Maintenance</span>
        <p className="text-muted-foreground text-center">
          We&apos;re performing scheduled maintenance. <br />
          Please check back soon.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    </div>
  );
}
