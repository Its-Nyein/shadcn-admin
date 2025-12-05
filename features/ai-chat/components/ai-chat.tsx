"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Card, CardContent } from "@/components/ui/card";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import {
  CopyIcon,
  GlobeIcon,
  MessageSquareIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { useState } from "react";

const models = [
  {
    name: "Gemini 2.0 Flash",
    value: "google/gemini-2.0-flash-001",
  },
  {
    name: "Gemini 2.5 Pro",
    value: "google/gemini-2.5-pro-preview-05-06",
  },
  {
    name: "Gemini 2.5 Flash",
    value: "google/gemini-2.5-flash-preview-05-20",
  },
];

const isSourceUrlPart = (
  part: UIMessage["parts"][number],
): part is UIMessage["parts"][number] & { type: "source-url"; url: string } => {
  return part.type === "source-url";
};

const ChatBotDemo = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, regenerate, error } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
        },
      },
    );
    setInput("");
  };

  const sourceUrlParts = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return [];
    return message.parts.filter(isSourceUrlPart);
  };

  return (
    <>
      <div className="px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">AI Chat</h1>
          <p className="text-muted-foreground">
            Chat with AI models and get intelligent responses
          </p>
        </div>
      </div>

      <div className="@container/main flex flex-1 flex-col overflow-hidden px-4 pb-4 lg:px-6">
        <Card className="flex flex-1 flex-col overflow-hidden border">
          <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
            <Conversation className="flex-1">
              <ConversationContent>
                {messages.length === 0 ? (
                  <ConversationEmptyState
                    title="Start a conversation"
                    description="Ask me anything or try asking about a topic you'd like to learn more about."
                    icon={
                      <MessageSquareIcon className="size-8 text-muted-foreground" />
                    }
                  />
                ) : (
                  messages.map((message) => {
                    const sources = sourceUrlParts(message.id);
                    return (
                      <div key={message.id} className="space-y-4">
                        {message.role === "assistant" && sources.length > 0 && (
                          <Sources>
                            <SourcesTrigger count={sources.length} />
                            {sources.map((part, i) => (
                              <SourcesContent key={`${message.id}-source-${i}`}>
                                <Source
                                  href={part.url}
                                  title={part.title || part.url}
                                />
                              </SourcesContent>
                            ))}
                          </Sources>
                        )}
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Message
                                  key={`${message.id}-${i}`}
                                  from={message.role}
                                >
                                  <MessageContent>
                                    <MessageResponse>
                                      {part.text}
                                    </MessageResponse>
                                  </MessageContent>
                                  {message.role === "assistant" && (
                                    <MessageActions>
                                      {i === message.parts.length - 1 &&
                                        messages[messages.length - 1]?.id ===
                                          message.id && (
                                          <MessageAction
                                            onClick={() => regenerate()}
                                            label="Retry"
                                            tooltip="Regenerate response"
                                          >
                                            <RefreshCcwIcon className="size-3" />
                                          </MessageAction>
                                        )}
                                      <MessageAction
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            part.text,
                                          );
                                        }}
                                        label="Copy"
                                        tooltip="Copy message"
                                      >
                                        <CopyIcon className="size-3" />
                                      </MessageAction>
                                    </MessageActions>
                                  )}
                                </Message>
                              );
                            case "reasoning":
                              return (
                                <Reasoning
                                  key={`${message.id}-${i}`}
                                  className="w-full"
                                  isStreaming={
                                    status === "streaming" &&
                                    i === message.parts.length - 1 &&
                                    message.id === messages.at(-1)?.id
                                  }
                                >
                                  <ReasoningTrigger />
                                  <ReasoningContent>
                                    {part.text}
                                  </ReasoningContent>
                                </Reasoning>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                    );
                  })
                )}
                {status === "submitted" && <Loader />}
                {error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    <p className="font-medium">Error</p>
                    <p className="mt-1">
                      {error.message || "An error occurred"}
                    </p>
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
            <div className="border-t bg-background p-4">
              <PromptInput onSubmit={handleSubmit}>
                <PromptInputBody>
                  <PromptInputTextarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder="Type your message..."
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    {/* <PromptInputActionMenu>
                      <PromptInputActionMenuTrigger />
                      <PromptInputActionMenuContent>
                        <PromptInputActionAddAttachments />
                      </PromptInputActionMenuContent>
                    </PromptInputActionMenu> */}
                    <PromptInputButton
                      variant={webSearch ? "default" : "ghost"}
                      onClick={() => setWebSearch(!webSearch)}
                      title={
                        webSearch ? "Disable web search" : "Enable web search"
                      }
                    >
                      <GlobeIcon size={16} />
                    </PromptInputButton>
                    <PromptInputSelect
                      onValueChange={(value) => {
                        setModel(value);
                      }}
                      value={model}
                    >
                      <PromptInputSelectTrigger className="w-auto max-w-[130px] md:max-w-[160px]">
                        <PromptInputSelectValue />
                      </PromptInputSelectTrigger>
                      <PromptInputSelectContent>
                        {models.map((modelOption) => (
                          <PromptInputSelectItem
                            key={modelOption.value}
                            value={modelOption.value}
                          >
                            {modelOption.name}
                          </PromptInputSelectItem>
                        ))}
                      </PromptInputSelectContent>
                    </PromptInputSelect>
                  </PromptInputTools>
                  <PromptInputSubmit
                    disabled={!input.trim() && status !== "streaming"}
                    status={status}
                  />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChatBotDemo;
