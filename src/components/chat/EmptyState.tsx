import { BookOpen, Code, FileText, HelpCircle } from "lucide-react";

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  { icon: BookOpen, text: "How do I set up the development environment?", label: "Getting Started" },
  { icon: Code, text: "What are the API integration guidelines?", label: "API Docs" },
  { icon: FileText, text: "Show me the deployment procedures", label: "DevOps" },
  { icon: HelpCircle, text: "Where can I find HR policies?", label: "HR & Policies" },
];

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="mb-2">
        <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mx-auto">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-1">Confluence ChatBot</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Ask me anything about your Confluence documentation
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => onSuggestionClick(s.text)}
            className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-left group"
          >
            <s.icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0 group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">{s.label}</p>
              <p className="text-sm">{s.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
