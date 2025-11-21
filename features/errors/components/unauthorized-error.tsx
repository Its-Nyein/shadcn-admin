"use client";

import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export function UnauthorizedError() {
  const router = useRouter();
  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <LockKeyhole className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-[7rem] leading-tight font-bold">401</h1>
        <span className="font-medium">Unauthorized Access</span>
        <p className="text-muted-foreground text-center">
          You need to be authenticated to access this page. <br />
          Please sign in to continue.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}
