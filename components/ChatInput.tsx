import React, { useState, useRef, useEffect } from 'react';
import { PaperclipIcon } from './icons/PaperclipIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { UpArrowIcon } from './icons/UpArrowIcon';


interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="text-left bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-2.5">
       <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative flex items-end">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "AI is thinking..." : "Ask anything! No question too long, no query too complex"}
                disabled={isLoading}
                className="flex-grow bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none pr-12 text-base"
                rows={1}
                style={{maxHeight: '200px'}}
            />
            <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-0 bottom-0 p-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                aria-label="Send message"
            >
                {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-gray-500 dark:border-gray-300 border-solid rounded-full animate-spin"></div>
                ) : (
                <UpArrowIcon className="w-5 h-5" />
                )}
            </button>
        </div>
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
           <button type="button" className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"><PaperclipIcon className="w-5 h-5" /></button>
           <button type="button" className="flex items-center gap-1.5 text-sm p-1.5 px-2.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors">
             <GlobeIcon className="w-4 h-4" />
             Search
           </button>
            <button type="button" className="flex items-center gap-1.5 text-sm p-1.5 px-2.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors">
             <LightbulbIcon className="w-4 h-4" />
             Think
           </button>
        </div>
       </form>
    </div>
  );
};

export default ChatInput;