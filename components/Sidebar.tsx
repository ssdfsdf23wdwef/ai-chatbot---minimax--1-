
import React from 'react';
import { MinimaxLogo } from './icons/MinimaxLogo';
import { PlusIcon } from './icons/PlusIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { FavoriteIcon } from './icons/FavoriteIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { XIcon } from './icons/XIcon';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import type { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  chats: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, chats, activeChatId, onNewChat, onSelectChat }) => {
  return (
    <aside
      className={`bg-gray-50 dark:bg-gray-900/70 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="p-4 flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <MinimaxLogo className="h-7 text-gray-800 dark:text-gray-200" />
        </div>

        <button 
          onClick={onNewChat}
          className="flex items-center justify-between w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            New Chat
          </div>
          <kbd className="px-1.5 py-0.5 text-xs font-sans font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">⌘K</kbd>
        </button>

        <nav className="mt-8 flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-2 py-1">
              <div className="flex items-center gap-2 font-medium">
                <HistoryIcon className="w-4 h-4" />
                Chat History
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="mt-2 space-y-1">
                {chats.length > 0 ? chats.map((chat) => (
                    <button 
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`w-full text-left block truncate text-sm px-2 py-1.5 rounded-md ${
                          chat.id === activeChatId 
                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        {chat.title}
                    </button>
                )) : (
                     <p className="text-sm text-gray-400 dark:text-gray-500 px-2">No chat history</p>
                )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-2 py-1">
              <div className="flex items-center gap-2 font-medium">
                <FavoriteIcon className="w-4 h-4" />
                Favorited
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
             <div className="mt-2">
                <p className="text-sm text-gray-400 dark:text-gray-500 px-2">No favorited chats</p>
            </div>
          </div>
        </nav>

        <div className="mt-auto">
            {/* TODO: Kullanıcı kendi repo URL'sini eklemeli */}
            <a href="https://github.com/your-username/your-repo-name" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                API ACCESS
            </a>
            <div className="flex items-center justify-center gap-4 mt-4">
                <a href="https://x.com/googledevs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><XIcon className="w-4 h-4" /></a>
                {/* TODO: Kullanıcı kendi repo URL'sini eklemeli */}
                <a href="https://github.com/your-username/your-repo-name" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><GithubIcon className="w-4 h-4" /></a>
                <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><BrainCircuitIcon className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/company/google/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><LinkedInIcon className="w-4 h-4" /></a>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">About MiniMax</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;