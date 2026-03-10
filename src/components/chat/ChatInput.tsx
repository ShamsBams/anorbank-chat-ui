import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-4">
      <div className="relative flex items-end bg-input rounded-2xl border border-border focus-within:ring-1 focus-within:ring-ring transition-shadow">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Confluence documentation..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent px-4 py-3.5 text-sm resize-none focus:outline-none placeholder:text-muted-foreground max-h-[200px] min-h-[48px]"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="p-2.5 m-1 rounded-xl bg-foreground text-background disabled:opacity-30 hover:opacity-90 transition-opacity"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-2">
        Confluence ChatBot can make mistakes. Verify important information.
      </p>
    </div>
  );
}
