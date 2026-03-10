import { Plus, MessageSquare, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
}

export function ChatSidebar({ conversations, activeId, onSelect, onCreate, onDelete, isOpen }: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <aside className="w-72 h-full flex flex-col bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))]">
      {/* Header */}
      <div className="p-3 space-y-3">
        <button
          onClick={onCreate}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-sidebar-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input pl-8 pr-3 py-2 rounded-lg text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            {conversations.length === 0 ? "No conversations yet" : "No results found"}
          </p>
        )}
        {filtered.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors",
              activeId === conv.id
                ? "bg-sidebar-active text-foreground"
                : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
            )}
          >
            <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
            <span className="truncate flex-1">{conv.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conv.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-accent transition-all"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center gap-2 px-2">
          <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">
            A
          </div>
          <span className="text-xs text-muted-foreground truncate">Anorbank User</span>
        </div>
      </div>
    </aside>
  );
}
