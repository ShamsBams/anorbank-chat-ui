import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
  } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onCreate={createConversation}
        onDelete={deleteConversation}
        isOpen={sidebarOpen}
      />
      <ChatArea
        conversation={activeConversation}
        isLoading={isLoading}
        onSend={sendMessage}
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
};

export default Index;
