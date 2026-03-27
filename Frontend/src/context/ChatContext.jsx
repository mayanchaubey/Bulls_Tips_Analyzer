import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

const STORAGE_KEY = 'marketmind_chat_history';

/**
 * Enhanced Message Schema:
 * {
 *   id: string (unique),
 *   role: "user" | "assistant",
 *   content: string,
 *   type: "text" | "file" | "mixed",
 *   status: "sending" | "processing" | "done" | "error",
 *   attachments: [
 *     { url, name, mimeType, size (optional) }
 *   ],
 *   timestamp: number
 * }
 */

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeChatId, setActiveChatId] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const createChat = (initialMessage = null) => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: initialMessage ? initialMessage.slice(0, 40) : 'New Conversation',
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
    return newChatId;
  };

  const deleteChat = (id) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const switchChat = (id) => {
    setActiveChatId(id);
  };

  const addMessage = (chatId, message) => {
    setChats(prev => {
      const updated = prev.map(chat => {
        if (chat.id === chatId) {
          let newTitle = chat.title;
          if (chat.messages.length === 0 && message.role === 'user') {
            newTitle = message.content.slice(0, 40) + (message.content.length > 40 ? '...' : '');
          }
          
          const enhancedMessage = {
            id: message.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...message, 
            timestamp: message.timestamp || Date.now(),
            type: message.type || 'text',
            status: message.status || 'done',
            intelligence: message.intelligence || null,
            attachments: (message.attachments || []).map(a => ({
              url: a.url || '',
              name: a.name || 'attachment',
              mimeType: a.mimeType || 'application/octet-stream',
              size: a.size || 0
            }))
          };

          return {
            ...chat,
            title: newTitle,
            messages: [...chat.messages, enhancedMessage],
            updated_at: Date.now()
          };
        }
        return chat;
      });
      // Sort by updated_at (latest first)
      return updated.sort((a, b) => b.updated_at - a.updated_at);
    });
  };

  const updateMessage = (chatId, messageId, updates) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.map(m => 
            m.id === messageId ? { ...m, ...updates } : m
          ),
          updated_at: Date.now()
        };
      }
      return chat;
    }));
  };

  const clearCurrentChat = () => {
    if (!activeChatId) return;
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [], updated_at: Date.now() };
      }
      return chat;
    }));
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <ChatContext.Provider value={{
      chats,
      activeChatId,
      activeChat,
      createChat,
      deleteChat,
      switchChat,
      addMessage,
      updateMessage,
      clearCurrentChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
