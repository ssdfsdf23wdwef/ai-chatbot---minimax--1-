
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message, ChatSession } from './types';
import { createChatSession, generateTitle } from './services/geminiService';
import type { Chat } from '@google/genai';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import MainHeader from './components/MainHeader';

const App: React.FC = () => {
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const [allChats, setAllChats] = useState<Record<string, ChatSession>>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');

  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialization: check API key and load chats from localStorage
  useEffect(() => {
    if (!process.env.API_KEY) {
      setApiKeyError("API_KEY environment variable not set. Please add it to your environment variables.");
    }

    try {
      const storedChats = localStorage.getItem('chatSessions');
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        setAllChats(parsedChats);
        const lastActiveId = localStorage.getItem('activeChatId');
        if (lastActiveId && parsedChats[lastActiveId]) {
           setActiveChatId(lastActiveId);
        } else if (Object.keys(parsedChats).length > 0) {
           setActiveChatId(Object.keys(parsedChats)[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load chats from localStorage", e);
    }
  }, []);
  
  // Save chats to localStorage whenever they change
  useEffect(() => {
    if(Object.keys(allChats).length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(allChats));
    }
    if(activeChatId) {
      localStorage.setItem('activeChatId', activeChatId);
    }
  }, [allChats, activeChatId]);


  // Effect to initialize or switch chat instance when activeChatId changes
  useEffect(() => {
    if (activeChatId && allChats[activeChatId]) {
      const activeChat = allChats[activeChatId];
      chatRef.current = createChatSession(activeChat.messages);
    } else {
      chatRef.current = null;
    }
  }, [activeChatId, allChats]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allChats, activeChatId, isLoading]);

  // Theme management
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  const handleNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChatSession: ChatSession = {
      id: newChatId,
      title: 'Yeni Sohbet',
      messages: [],
    };
    setAllChats(prev => ({ ...prev, [newChatId]: newChatSession }));
    setActiveChatId(newChatId);
    setError(null);
  };
  
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setError(null);
  }

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);

    let chatId = activeChatId;
    let isFirstApiMessage = false;

    // Determine chat ID and if it's the first message for the API call
    if (!chatId || !allChats[chatId]) {
        chatId = `chat_${Date.now()}`;
        isFirstApiMessage = true;
        setActiveChatId(chatId);
        chatRef.current = createChatSession(); // Create a fresh chat session for the API
    } else {
        isFirstApiMessage = allChats[chatId].messages.length === 0;
        // Ensure chatRef is up-to-date for existing chat.
        // The `useEffect` hook is the primary way to sync chatRef. This is a safeguard.
        // Removed check for `history.length` as it's a private property.
        if (!chatRef.current) {
             chatRef.current = createChatSession(allChats[chatId].messages);
        }
    }

    const finalChatId = chatId;
    const userMessage: Message = { role: 'user', content: userInput };

    // Atomically update state: add new chat if needed, and add user message + placeholder
    setAllChats(prev => {
        const currentChat = prev[finalChatId] || { id: finalChatId, title: 'Yeni Sohbet', messages: [] };
        const modelPlaceholder: Message = { role: 'model', content: '' };
        const updatedMessages = [...currentChat.messages, userMessage, modelPlaceholder];
        return {
            ...prev,
            [finalChatId]: {
                ...currentChat,
                messages: updatedMessages
            }
        };
    });

    // Perform async operations
    try {
        if (!chatRef.current) throw new Error("Sohbet oturumu başlatılamadı.");

        const stream = await chatRef.current.sendMessageStream({ message: userInput });

        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk.text;
            setAllChats(prev => {
                const currentChat = prev[finalChatId];
                if (!currentChat) return prev;

                const newMessages = [...currentChat.messages];
                const updatedModelMessage: Message = { role: 'model', content: fullResponse };
                newMessages[newMessages.length - 1] = updatedModelMessage;
                
                return {
                    ...prev,
                    [finalChatId]: {
                        ...currentChat,
                        messages: newMessages
                    }
                };
            });
        }

        // After successful response, generate a title if it was the first message
        if (isFirstApiMessage && fullResponse.trim()) {
            const title = await generateTitle(`${userInput}\n\n${fullResponse}`);
            setAllChats(prev => {
                const currentChat = prev[finalChatId];
                // Guard against chat being deleted during title generation
                if (!currentChat) return prev;
                
                return {
                    ...prev,
                    [finalChatId]: {
                        ...currentChat,
                        title: title
                    }
                }
            });
        }

    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Bilinmeyen bir hata oluştu.";
        const displayError = `API Hatası: ${errorMessage}`;
        setError(displayError);
        // Replace the placeholder with an error message
        setAllChats(prev => {
            const currentChat = prev[finalChatId];
            if (!currentChat) return prev;
            
            const messages = [...currentChat.messages];
            const errorModelMessage: Message = { role: 'model', content: `Üzgünüm, bir hatayla karşılaştım: ${errorMessage}` };
            messages[messages.length - 1] = errorModelMessage;
            return {
                ...prev,
                [finalChatId]: { ...currentChat, messages }
            };
        });
    } finally {
        setIsLoading(false);
    }
  };


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (apiKeyError) {
     return (
        <div className="flex h-screen items-center justify-center bg-red-50 dark:bg-gray-900">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md">
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Configuration Error</h1>
                <p className="text-gray-700 dark:text-gray-300">{apiKeyError}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Refer to the <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">README.md</code> for setup instructions.</p>
            </div>
        </div>
     )
  }

  const activeChatMessages = activeChatId ? allChats[activeChatId]?.messages : [];

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        chats={Object.values(allChats)}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <MainHeader 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          onToggleTheme={toggleTheme}
          isSidebarOpen={isSidebarOpen}
          theme={theme}
        />
        <main ref={chatContainerRef} className="flex-1 overflow-y-auto relative flex flex-col">
          {activeChatMessages.length === 0 ? (
             <div className="flex-1 flex flex-col justify-center items-center px-4">
               <div className="w-full max-w-3xl text-center">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">Good afternoon,</h1>
                  <h2 className="text-4xl font-bold text-gray-600 dark:text-gray-400 mb-12">how can I help you today?</h2>
                  <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
               </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto p-4 md:p-6 flex-1 chat-message-container">
              {activeChatMessages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
            </div>
          )}
        </main>
        {activeChatMessages.length > 0 && (
          <footer className="w-full max-w-4xl mx-auto p-4 md:px-6 md:pb-6">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
