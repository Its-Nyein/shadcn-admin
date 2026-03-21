"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

interface Requirement {
  key: string;
  label: string;
  met: boolean;
}

export function PasswordRequirements({
  password,
  className,
}: PasswordRequirementsProps) {
  const requirements: Requirement[] = useMemo(
    () => [
      {
        key: "minLength",
        label: "At least 8 characters",
        met: password.length >= 8,
      },
      {
        key: "lowercase",
        label: "Lowercase letter (a-z)",
        met: /[a-z]/.test(password),
      },
      {
        key: "uppercase",
        label: "Uppercase letter (A-Z)",
        met: /[A-Z]/.test(password),
      },
      {
        key: "number",
        label: "Number (0-9)",
        met: /\d/.test(password),
      },
      {
        key: "specialChar",
        label: "Special character (!@#$%^&*)",
        met: /[!@#$%^&*]/.test(password),
      },
    ],
    [password],
  );

  if (!password) return null;

  return (
    <div className={cn("space-y-1.5 pt-1", className)}>
      <p className="text-xs font-medium text-muted-foreground">
        Password must contain:
      </p>
      <ul className="space-y-1">
        {requirements.map((req) => (
          <li key={req.key} className="flex items-center gap-1.5 text-xs">
            {req.met ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
            ) : (
              <X className="h-3.5 w-3.5 shrink-0 text-red-500" />
            )}
            <span
              className={cn(
                req.met
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
