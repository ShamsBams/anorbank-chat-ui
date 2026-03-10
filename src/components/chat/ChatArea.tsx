import { useEffect, useRef } from "react";
import { PanelLeft } from "lucide-react";
import { Conversation } from "@/types/chat";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "./EmptyState";

interface ChatAreaProps {
  conversation: Conversation | null;
  isLoading: boolean;
  onSend: (message: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function ChatArea({ conversation, isLoading, onSend, onToggleSidebar, sidebarOpen }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const hasMessages = conversation && conversation.messages.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Header */}
      <header className="h-12 flex items-center gap-3 px-4 border-b border-border shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <PanelLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h2 className="text-sm font-medium truncate">
          {conversation?.title || "Confluence ChatBot"}
        </h2>
      </header>

      {/* Messages or Empty State */}
      {hasMessages ? (
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="divide-y divide-border/50">
            {conversation.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && conversation.messages[conversation.messages.length - 1]?.role === "user" && (
              <TypingIndicator />
            )}
          </div>
        </div>
      ) : (
        <EmptyState onSuggestionClick={onSend} />
      )}

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
