import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardTopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string;
    href: string;
    isActive: boolean;
    disabled?: boolean;
  }[];
}

export function DashboardTopNav({
  className,
  links,
  ...props
}: DashboardTopNavProps) {
  return (
    <>
      <div className="md:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {links.map(({ title, href, isActive, disabled }) => (
              <DropdownMenuItem key={`${title}-${href}`}>
                <Link
                  href={href}
                  className={isActive ? "text-muted-foreground" : ""}
                  aria-disabled={disabled}
                >
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          "hidden items-center space-x-4 md:flex lg:space-x-6",
          className,
        )}
        {...props}
      >
        {links.map(({ title, href, isActive, disabled }) => (
          <Link
            key={`${title}-${href}`}
            href={href}
            aria-disabled={disabled}
            className={`hover:text-primary text-sm font-medium transition-colors ${
              isActive ? "" : "text-muted-foreground"
            }`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}
