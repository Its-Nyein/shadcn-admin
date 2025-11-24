import chatConversations from "@/constants/chat-conversation.json";
import chatMessages from "@/constants/chat-messages.json";
import chatUsers from "@/constants/chat-users.json";
import { Chat } from "@/features/chats/components/chats";
import {
  ChatConversation,
  ChatMessage,
  ChatUser,
} from "@/features/chats/utils/types";

export default function ChatsPage() {
  return (
    <Chat
      conversations={chatConversations as ChatConversation[]}
      messages={chatMessages as Record<string, ChatMessage[]>}
      users={chatUsers as ChatUser[]}
    />
  );
}
