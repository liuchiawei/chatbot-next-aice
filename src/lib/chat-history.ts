import { Message } from "ai";

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export function createNewChat(): ChatHistory {
  return {
    id: crypto.randomUUID(),
    title: "新しい会話",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * 会話を保存する機能
 * @param chat 会話
 */
export function saveChat(chat: ChatHistory) {
  const chats = getChats();
  const existingIndex = chats.findIndex((c) => c.id === chat.id);

  if (existingIndex >= 0) {
    // 更新現有聊天時保留原始標題
    const existingChat = chats[existingIndex];
    chats[existingIndex] = {
      ...chat,
      title: existingChat.title, // 保留原始標題
    };
  } else {
    chats.push(chat);
  }

  localStorage.setItem("chatHistory", JSON.stringify(chats));
}

/**
 * 全ての会話を取得する機能
 * @returns chats 会話の配列
 */
export function getChats(): ChatHistory[] {
  if (typeof window === "undefined") return [];
  const chats = localStorage.getItem("chatHistory");
  return chats ? JSON.parse(chats) : [];
}

/**
 * IDで会話を取得する機能
 * @param id 会話のID
 * @returns chat 会話
 */
export function getChat(id: string): ChatHistory | undefined {
  return getChats().find((chat) => chat.id === id);
}

/**
 * IDで会話を削除する機能
 * @param id 会話のID
 */
export function deleteChat(id: string) {
  const chats = getChats().filter((chat) => chat.id !== id);
  localStorage.setItem("chatHistory", JSON.stringify(chats));
}

/**
 * 会話タイトルを編集する機能
 * @param id 会話のID
 */
export function editChatTitle(id: string, title: string) {
  const chats = getChats().find((chat) => chat.id === id);
  if (chats) {
    chats.title = title;
    chats.updatedAt = new Date();
    saveChat(chats);
  }
}
