export interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastSeen: string;
  role: string;
  department: string;
}

export interface MessageAttachment {
  id: string;
  type: "image" | "pdf" | "audio" | "file";
  name: string;
  url: string;
  size: string;
  mimeType?: string;
  thumbnail?: string;
  duration?: string; // for audio files
}

export interface MessageReaction {
  emoji: string;
  users: string[];
  count: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  type: "text" | "image" | "file" | "audio";
  isEdited: boolean;
  reactions: MessageReaction[];
  replyTo: string | null;
  attachments?: MessageAttachment[];
}

export interface LastMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
}

export interface ChatConversation {
  id: string;
  type: "direct" | "group";
  participants: string[];
  name: string;
  avatar: string;
  lastMessage: LastMessage;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
}

export interface ChatState {
  conversations: ChatConversation[];
  messages: Record<string, ChatMessage[]>;
  users: ChatUser[];
  selectedConversation: string | null;
  searchQuery: string;
  isTyping: Record<string, boolean>;
  onlineUsers: string[];
}

export interface ChatActions {
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
