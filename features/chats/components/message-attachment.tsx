"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Download,
  Eye,
  FileText,
  Headphones,
  Image as ImageIcon,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { MessageAttachment } from "../utils/types";

interface MessageAttachmentProps {
  attachment: MessageAttachment;
  isOwnMessage: boolean;
}

export function MessageAttachment({
  attachment,
  isOwnMessage,
}: MessageAttachmentProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (attachment.type === "image") {
    return (
      <div className="w-[140px] overflow-hidden rounded-lg">
        <Image
          src={attachment.url}
          alt={attachment.name}
          width={140}
          height={100}
          className="w-[140px] h-[100px] cursor-pointer object-cover transition-transform hover:scale-105"
        />
      </div>
    );
  }

  if (attachment.type === "pdf") {
    return (
      <div
        className={cn(
          "mt-2 flex items-center gap-3 rounded-lg border p-3",
          isOwnMessage
            ? "border-primary-foreground/20 bg-primary-foreground/10"
            : "border-border bg-muted/50",
        )}
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            isOwnMessage ? "bg-primary-foreground/20" : "bg-red-500/10",
          )}
        >
          <FileText
            className={cn(
              "size-5",
              isOwnMessage ? "text-primary-foreground" : "text-red-500",
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-sm font-medium",
              isOwnMessage ? "text-primary-foreground" : "text-foreground",
            )}
          >
            {attachment.name}
          </p>
          <p
            className={cn(
              "text-xs",
              isOwnMessage
                ? "text-primary-foreground/70"
                : "text-muted-foreground",
            )}
          >
            {attachment.size}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              isOwnMessage && "hover:bg-primary-foreground/20",
            )}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              isOwnMessage && "hover:bg-primary-foreground/20",
            )}
          >
            <Download className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (attachment.type === "audio") {
    return (
      <div
        className={cn(
          "mt-2 flex items-center gap-3 rounded-xl p-3 min-w-[220px]",
          isOwnMessage
            ? "bg-primary-foreground/10"
            : "bg-muted/80 border border-border",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 shrink-0 rounded-full",
            isOwnMessage
              ? "bg-primary-foreground/20 hover:bg-primary-foreground/30"
              : "bg-foreground text-background hover:bg-foreground/90",
          )}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4 ml-0.5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[2px] h-6 mb-1">
            {[
              35, 55, 25, 70, 45, 60, 30, 80, 40, 65, 35, 75, 50, 60, 28, 85,
              42, 55, 32, 68,
            ].map((height, i) => (
              <div
                key={i}
                className={cn(
                  "w-[3px] rounded-full",
                  isOwnMessage
                    ? "bg-primary-foreground/50"
                    : "bg-foreground/40",
                  isPlaying &&
                    i < 7 &&
                    (isOwnMessage ? "bg-primary-foreground" : "bg-foreground"),
                )}
                style={{ height: `${height}%`, minHeight: "3px" }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-xs",
                isOwnMessage
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground",
              )}
            >
              {isPlaying ? "0:45" : "0:00"} / {attachment.duration || "2:34"}
            </span>
            <Headphones
              className={cn(
                "size-3",
                isOwnMessage
                  ? "text-primary-foreground/50"
                  : "text-muted-foreground",
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-2 flex items-center gap-3 rounded-lg border p-3",
        isOwnMessage
          ? "border-primary-foreground/20 bg-primary-foreground/10"
          : "border-border bg-muted/50",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          isOwnMessage ? "bg-primary-foreground/20" : "bg-muted",
        )}
      >
        <ImageIcon
          className={cn(
            "size-5",
            isOwnMessage ? "text-primary-foreground" : "text-muted-foreground",
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            isOwnMessage ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {attachment.name}
        </p>
        <p
          className={cn(
            "text-xs",
            isOwnMessage
              ? "text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        >
          {attachment.size}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "size-8",
          isOwnMessage && "hover:bg-primary-foreground/20",
        )}
      >
        <Download className="size-4" />
      </Button>
    </div>
  );
}
