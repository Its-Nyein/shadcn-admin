"use client";

import {
  FileText,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
      setIsTyping(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }

    if (value.trim() && !isTyping) {
      setIsTyping(true);
    } else if (!value.trim() && isTyping) {
      setIsTyping(false);
    }
  };

  const handleFileUpload = (type: "image" | "file") => {
    console.log(`Upload ${type}`);
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-end gap-2">
        <TooltipProvider>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    className="cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem
                onClick={() => handleFileUpload("image")}
                className="cursor-pointer"
              >
                <ImageIcon className="size-4 mr-2" />
                Photo or video
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFileUpload("file")}
                className="cursor-pointer"
              >
                <FileText className="size-4 mr-2" />
                Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>

        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyPress}
            disabled={disabled}
            className={cn(
              "min-h-[40px] max-h-[120px] resize-none cursor-text disabled:cursor-not-allowed",
              "pr-20",
            )}
            rows={1}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={disabled}
                    className="size-6 p-0 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Smile className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={disabled}
                    className="size-6 p-0 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {message.trim() ? (
                <Button
                  onClick={handleSendMessage}
                  disabled={disabled}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="size-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  <Mic className="size-4" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{message.trim() ? "Send message" : "Voice message"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {isTyping && (
        <div className="text-xs text-muted-foreground mt-2">
          You are typing...
        </div>
      )}
    </div>
  );
}
