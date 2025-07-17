
import React from 'react';

const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2zm0 2h.01M12 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 4h8v6H8v-6z" />
    <circle cx="9.5" cy="12.5" r="1.5" />
    <circle cx="14.5" cy="12.5" r="1.5" />
    <path d="M9 16h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z" />
  </svg>
);

export default BotIcon;
