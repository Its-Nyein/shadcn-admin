"use client";

import { create } from "zustand";
import type { ChatConversation, ChatMessage, ChatUser } from "./types";

export type {
  ChatConversation,
  ChatMessage,
  ChatUser,
  MessageAttachment,
} from "./types";

interface ChatState {
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  users: ChatUser[];
  selectedConversation: string | null;
  searchQuery: string;
  isTyping: Record<string, boolean>;
  onlineUsers: string[];
}

interface ChatActions {
  setConversations: (conversations: ChatConversation[]) => void;
  setMessages: (conversationId: string, messages: ChatMessage[]) => void;
  setUsers: (users: ChatUser[]) => void;
  setSelectedConversation: (conversationId: string | null) => void;
  setSearchQuery: (query: string) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  markAsRead: (conversationId: string) => void;
  togglePin: (conversationId: string) => void;
  toggleMute: (conversationId: string) => void;
  setTyping: (conversationId: string, isTyping: boolean) => void;
  setOnlineUsers: (userIds: string[]) => void;
}

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  // State
  conversations: [],
  messages: {},
  users: [],
  selectedConversation: null,
  searchQuery: "",
  isTyping: {},
  onlineUsers: [],

  // Actions
  setConversations: (conversations) => set({ conversations }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),

  setUsers: (users) => set({ users }),

  setSelectedConversation: (conversationId) => {
    set({ selectedConversation: conversationId });
    if (conversationId) {
      get().markAsRead(conversationId);
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: {
                id: message.id,
                content: message.content,
                timestamp: message.timestamp,
                senderId: message.senderId,
              },
            }
          : conv,
      ),
    })),

  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
      ),
    })),

  togglePin: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, isPinned: !conv.isPinned }
          : conv,
      ),
    })),

  toggleMute: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isMuted: !conv.isMuted } : conv,
      ),
    })),

  setTyping: (conversationId, isTyping) =>
    set((state) => ({
      isTyping: { ...state.isTyping, [conversationId]: isTyping },
    })),

  setOnlineUsers: (userIds) => set({ onlineUsers: userIds }),
}));

// Alias for backwards compatibility
export const useChat = useChatStore;
