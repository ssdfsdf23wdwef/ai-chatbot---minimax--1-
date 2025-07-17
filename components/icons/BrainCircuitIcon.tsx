import React from 'react';

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.993.129" />
    <path d="M12 5a3 3 0 1 0 5.993.129" />
    <path d="M15 13a3 3 0 1 0-5.993.129" />
    <path d="M15 13a3 3 0 1 0 5.993.129" />
    <path d="M9 13a3 3 0 1 0-5.993.129" />
    <path d="M6 8.5V13" />
    <path d="M18 8.5V13" />
    <path d="M12 11.5V13" />
    <path d="M12 16.5V20" />
    <path d="M12 20a2 2 0 1 0 4 0" />
    <path d="M12 20a2 2 0 1 1-4 0" />
  </svg>
);
