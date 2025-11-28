"use client";

import { format, isToday, isYesterday } from "date-fns";
import { CheckCheck, Copy, MoreVertical, Reply, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ChatMessage, ChatUser } from "../utils/types";
import { MessageAttachment } from "./message-attachment";

interface MessageListProps {
  messages: ChatMessage[];
  users: ChatUser[];
  currentUserId?: string;
}

export function MessageList({
  messages,
  users,
  currentUserId = "current-user",
}: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const isInitialLoadRef = useRef(true);
  const previousConversationRef = useRef<string | null>(null);

  useEffect(() => {
    const currentConversationId =
      messages.length > 0 ? messages[0]?.id?.split("-")[0] : null;
    if (currentConversationId !== previousConversationRef.current) {
      isInitialLoadRef.current = true;
      previousConversationRef.current = currentConversationId;
    }
  }, [messages]);

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      previousMessageCountRef.current = messages.length;
      return;
    }

    if (
      messages.length > previousMessageCountRef.current &&
      bottomRef.current
    ) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    previousMessageCountRef.current = messages.length;
  }, [messages]);

  const getUserById = (userId: string) => {
    if (userId === currentUserId) {
      return {
        id: currentUserId,
        name: "You",
        avatar: "https://github.com/shadcn.png",
        status: "online" as const,
        email: "you@example.com",
        lastSeen: new Date().toISOString(),
        role: "Developer",
        department: "Engineering",
      };
    }
    return users.find((user) => user.id === userId);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    } else {
      return format(date, "MMM d, HH:mm");
    }
  };

  const shouldShowAvatar = (message: ChatMessage, index: number) => {
    if (message.senderId === currentUserId) return false;
    if (index === 0) return true;

    const prevMessage = messages[index - 1];
    return prevMessage.senderId !== message.senderId;
  };

  const shouldShowName = (message: ChatMessage, index: number) => {
    if (message.senderId === currentUserId) return false;
    if (index === 0) return true;

    const prevMessage = messages[index - 1];
    return prevMessage.senderId !== message.senderId;
  };

  const isConsecutiveMessage = (message: ChatMessage, index: number) => {
    if (index === 0) return false;

    const prevMessage = messages[index - 1];
    const timeDiff =
      new Date(message.timestamp).getTime() -
      new Date(prevMessage.timestamp).getTime();

    return (
      prevMessage.senderId === message.senderId && timeDiff < 5 * 60 * 1000
    );
  };

  const groupMessagesByDay = (msgs: ChatMessage[]) => {
    const groups: { date: string; messages: ChatMessage[] }[] = [];

    msgs.forEach((message) => {
      const messageDate = format(new Date(message.timestamp), "yyyy-MM-dd");
      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.date === messageDate) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });

    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "EEEE, MMMM d");
    }
  };

  const messageGroups = groupMessagesByDay(messages);

  return (
    <ScrollArea className="flex-1 h-full overflow-auto" ref={scrollAreaRef}>
      <div className="space-y-4 py-4 px-4">
        {messageGroups.map((group) => (
          <div key={group.date}>
            <div className="flex items-center justify-center py-4">
              <div className="text-xs font-medium text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full">
                {formatDateHeader(group.date)}
              </div>
            </div>

            <div className="space-y-3">
              {group.messages.map((message, messageIndex) => {
                const user = getUserById(message.senderId);
                const isOwnMessage = message.senderId === currentUserId;
                const showAvatar = shouldShowAvatar(message, messageIndex);
                const showName = shouldShowName(message, messageIndex);
                const isConsecutive = isConsecutiveMessage(
                  message,
                  messageIndex,
                );

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 group",
                      isOwnMessage && "flex-row-reverse",
                      isConsecutive && !isOwnMessage && "ml-12",
                    )}
                  >
                    {!isOwnMessage && (
                      <div className="w-8">
                        {showAvatar && user && (
                          <Avatar className="size-8 cursor-pointer">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}

                    <div
                      className={cn(
                        "flex-1 max-w-[70%]",
                        isOwnMessage && "flex flex-col items-end",
                      )}
                    >
                      {showName && user && !isOwnMessage && (
                        <div className="text-sm font-medium text-foreground mb-1">
                          {user.name}
                        </div>
                      )}

                      <div className="relative group/message">
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2.5 text-sm wrap-break-word shadow-sm",
                            isOwnMessage
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted rounded-bl-md",
                            isConsecutive && "mt-1",
                          )}
                        >
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/message:opacity-100 transition-opacity z-10">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "size-6 rounded-full",
                                    isOwnMessage
                                      ? "hover:bg-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground"
                                      : "hover:bg-background/50 text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  <MoreVertical className="size-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align={isOwnMessage ? "start" : "end"}
                              >
                                <DropdownMenuItem className="cursor-pointer">
                                  <Reply className="size-4" />
                                  Reply
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Copy className="size-4" />
                                  Copy
                                </DropdownMenuItem>
                                {isOwnMessage && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                      <Trash2 className="size-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <p>{message.content}</p>

                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {message.attachments.map((attachment) => (
                                  <MessageAttachment
                                    key={attachment.id}
                                    attachment={attachment}
                                    isOwnMessage={isOwnMessage}
                                  />
                                ))}
                              </div>
                            )}

                          {message.reactions.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {message.reactions.map((reaction, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border cursor-pointer",
                                    "bg-background/90 backdrop-blur-sm shadow-sm",
                                  )}
                                >
                                  <span>{reaction.emoji}</span>
                                  <span className="text-muted-foreground">
                                    {reaction.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div
                            className={cn(
                              "flex items-center gap-1 mt-1 text-xs",
                              isOwnMessage
                                ? "text-primary-foreground/70 justify-end"
                                : "text-muted-foreground",
                            )}
                          >
                            <span>{formatMessageTime(message.timestamp)}</span>
                            {message.isEdited && (
                              <span className="italic">(edited)</span>
                            )}
                            {isOwnMessage && (
                              <div className="flex">
                                <CheckCheck className="size-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
