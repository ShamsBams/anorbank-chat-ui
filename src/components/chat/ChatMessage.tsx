import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-4 px-4 py-6 max-w-3xl mx-auto w-full", isUser ? "" : "")}>
      <div
        className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
          isUser ? "bg-chat-user" : "bg-accent"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">
          {isUser ? "You" : "Confluence Bot"}
        </p>
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-4 px-4 py-6 max-w-3xl mx-auto w-full">
      <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 pt-3">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
}
