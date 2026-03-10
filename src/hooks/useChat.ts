import { useState, useCallback } from "react";
import { Message, Conversation } from "@/types/chat";

const generateId = () => Math.random().toString(36).substring(2, 15);

const MOCK_RESPONSES = [
  "Based on the Confluence documentation, here's what I found:\n\n**Getting Started Guide**\n\nThe onboarding process consists of several steps:\n\n1. Complete your profile setup\n2. Review the company handbook\n3. Set up your development environment\n\n> Note: Make sure to contact IT support if you encounter any issues.\n\nFor more details, refer to the [Internal Wiki](https://confluence.anorbank.uz).",
  "I found the following information in your Confluence space:\n\n### API Integration Guidelines\n\nWhen integrating with our banking APIs, please follow these standards:\n\n- Use **OAuth 2.0** for authentication\n- All requests must include the `X-Request-ID` header\n- Rate limiting is set to `100 requests/minute`\n\n```json\n{\n  \"endpoint\": \"/api/v2/transactions\",\n  \"method\": \"POST\",\n  \"auth\": \"Bearer <token>\"\n}\n```\n\nContact the Platform team for API key provisioning.",
  "Here's the relevant documentation from Confluence:\n\n### Deployment Procedures\n\n| Environment | Branch | Approval Required |\n|-------------|--------|-------------------|\n| Development | develop | No |\n| Staging | release/* | Team Lead |\n| Production | main | CTO + DevOps |\n\n**Important:** All production deployments must go through the CI/CD pipeline. Manual deployments are strictly prohibited.\n\nRefer to the DevOps runbook for emergency procedures.",
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const createConversation = useCallback(() => {
    const newConv: Conversation = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      let convId = activeConversationId;
      if (!convId) {
        convId = createConversation();
      }

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c;
          const isFirst = c.messages.length === 0;
          return {
            ...c,
            title: isFirst ? content.slice(0, 40) + (content.length > 40 ? "..." : "") : c.title,
            messages: [...c.messages, userMessage],
            updatedAt: new Date(),
          };
        })
      );

      setIsLoading(true);

      // Simulate streaming response
      const mockResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const assistantId = generateId();

      // Simulate typing with streaming
      let accumulated = "";
      const words = mockResponse.split(" ");

      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? "" : " ") + words[i];
        const current = accumulated;

        await new Promise((r) => setTimeout(r, 20 + Math.random() * 30));

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== convId) return c;
            const existing = c.messages.find((m) => m.id === assistantId);
            if (existing) {
              return {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantId ? { ...m, content: current } : m
                ),
                updatedAt: new Date(),
              };
            }
            return {
              ...c,
              messages: [
                ...c.messages,
                { id: assistantId, role: "assistant" as const, content: current, timestamp: new Date() },
              ],
              updatedAt: new Date(),
            };
          })
        );
      }

      setIsLoading(false);
    },
    [activeConversationId, createConversation]
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
  };
}
