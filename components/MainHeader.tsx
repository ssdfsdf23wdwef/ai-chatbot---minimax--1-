import React from 'react';
import { SidebarToggleIcon } from './icons/SidebarToggleIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface MainHeaderProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
}

const MainHeader: React.FC<MainHeaderProps> = ({ onToggleSidebar, onToggleTheme, isSidebarOpen, theme }) => {
  return (
    <header className="flex-shrink-0 h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          aria-label="Toggle sidebar"
        >
          <SidebarToggleIcon className="w-6 h-6" isOpen={isSidebarOpen} />
        </button>
        <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-md shadow">Chat</button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-md">Agent</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleTheme} 
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        <div className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full font-bold text-sm">
          F
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
