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
    <>
      <div className="px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
          <p className="text-muted-foreground">
            Chat with your customers and team members.
          </p>
        </div>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <Chat
          conversations={chatConversations as ChatConversation[]}
          messages={chatMessages as Record<string, ChatMessage[]>}
          users={chatUsers as ChatUser[]}
        />
      </div>
    </>
  );
}
