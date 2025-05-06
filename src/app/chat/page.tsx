'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createNewChat, saveChat } from '@/lib/chat-history';
import ThemeToggle from '@/components/common/ThemeToggle';
import ChatSection from '@/components/layout/ChatSection';
import ChatHistory from '@/components/layout/ChatHistory';

export default function Page() {
  const [currentChat, setCurrentChat] = useState(() => {
    const newChat = createNewChat();
    saveChat(newChat);
    return newChat;
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 10,
    onFinish: (message) => {
      const updatedChat = {
        ...currentChat,
        messages: messages,
        updatedAt: new Date()
      };
      saveChat(updatedChat);
      setCurrentChat(updatedChat);
    },
  });

  return (
    <SidebarProvider>
      <div className="w-full h-full flex bg-zinc-300 dark:bg-zinc-950">
        <ThemeToggle className="fixed top-4 right-4 z-20" />
        <ChatHistory />
        <SidebarTrigger className="fixed top-4 left-4 cursor-pointer" />
        <ChatSection 
          messages={messages} 
          input={input} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
        />
      </div>
    </SidebarProvider>
  );
}