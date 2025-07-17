import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserModel = message.role === 'model';
  
  // A simple way to check if the content is just a thinking indicator
  const isThinking = isUserModel && message.content === '...';

  return (
    <div className={`flex ${!isUserModel ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xl lg:max-w-3xl px-4 py-2.5 rounded-xl shadow-sm ${
          isUserModel
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            : 'bg-blue-500 text-white'
        }`}
      >
        <p className={`whitespace-pre-wrap ${isThinking ? 'animate-pulse' : ''}`}>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;