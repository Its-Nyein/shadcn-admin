"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ChatConversation, ChatMessage, ChatUser } from "../utils/types";
import { useChat } from "../utils/use-chat";
import { ChatConversationList } from "./chat-conversation-list";
import { ChatHeader } from "./chat-header";
import { MessageInput } from "./message-input";
import { MessageList } from "./message-list";

interface ChatProps {
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  users: ChatUser[];
}

export function Chat({ conversations, messages, users }: ChatProps) {
  const chatStore = useChat();
  const {
    selectedConversation,
    setSelectedConversation,
    setConversations,
    setMessages,
    setUsers,
    addMessage,
    toggleMute,
  } = chatStore;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" ? window.innerWidth : 0 >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    setConversations(conversations);
    setUsers(users);

    Object.entries(messages).forEach(
      ([conversationId, conversationMessages]) => {
        setMessages(conversationId, conversationMessages);
      },
    );

    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0].id);
    }
  }, [
    conversations,
    messages,
    users,
    selectedConversation,
    setConversations,
    setMessages,
    setUsers,
    setSelectedConversation,
  ]);

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation,
  );

  const storeMessages = chatStore.messages;
  const currentMessages = selectedConversation
    ? storeMessages[selectedConversation] ||
      messages[selectedConversation] ||
      []
    : [];

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      senderId: "current-user",
      type: "text" as const,
      isEdited: false,
      reactions: [],
      replyTo: null,
    };

    addMessage(selectedConversation, newMessage);
  };

  const handleToggleMute = () => {
    if (selectedConversation) {
      toggleMute(selectedConversation);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-[calc(95vh-180px)] min-h-[500px] flex rounded-xl border shadow-sm overflow-hidden bg-background">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`
          w-100 border-r bg-background shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:relative lg:block
          fixed inset-y-0 left-0 z-50
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="lg:hidden p-4 border-b flex items-center justify-between bg-background">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="cursor-pointer"
            >
              <X className="size-4" />
            </Button>
          </div>

          <ChatConversationList
            conversations={conversations}
            users={users}
            selectedConversation={selectedConversation}
            onSelectConversation={(id: string) => {
              setSelectedConversation(id);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex items-center h-16 px-4 border-b bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="cursor-pointer lg:hidden mr-2"
            >
              <Menu className="size-4" />
            </Button>

            <div className="flex-1">
              <ChatHeader
                conversation={currentConversation || null}
                users={users}
                onToggleMute={handleToggleMute}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            {selectedConversation ? (
              <>
                <MessageList messages={currentMessages} users={users} />

                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder={`Message ${currentConversation?.name || ""}...`}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Welcome to Chat
                  </h3>
                  <p className="text-muted-foreground">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
