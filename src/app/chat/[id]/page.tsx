'use client';

import { useChat } from '@ai-sdk/react';
import ThemeToggle from '@/components/common/ThemeToggle';
import ChatSection from '@/components/layout/ChatSection';
import ChatHistory from '@/components/layout/ChatHistory';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getChat, saveChat, createNewChat } from '@/lib/chat-history';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Message } from 'ai';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id as string;
  const [currentChat, setCurrentChat] = useState(() => getChat(chatId));

  // 如果找不到聊天記錄，創建一個新的
  useEffect(() => {
    if (!currentChat) {
      const newChat = createNewChat();
      newChat.id = chatId; // 使用 URL 中的 ID
      saveChat(newChat);
      setCurrentChat(newChat);
    }
  }, [chatId, currentChat]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    initialMessages: currentChat?.messages || [],
    onFinish: (message) => {
      if (currentChat) {
        const updatedChat = {
          ...currentChat,
          messages: [...messages, message],
          updatedAt: new Date()
        };
        saveChat(updatedChat);
        setCurrentChat(updatedChat);
      }
    },
  });

  // 監聽 messages 變化，確保每次更新都保存
  useEffect(() => {
    if (currentChat && messages.length > 0) {
      const updatedChat = {
        ...currentChat,
        messages: messages,
        updatedAt: new Date()
      };
      saveChat(updatedChat);
      setCurrentChat(updatedChat);
    }
  }, [messages]);

  return (
    <SidebarProvider>
      <div className="w-full h-full flex bg-zinc-300 dark:bg-zinc-950">
        <ThemeToggle className="fixed top-4 right-4" />
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