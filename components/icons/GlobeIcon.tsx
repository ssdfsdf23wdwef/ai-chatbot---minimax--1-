import React from 'react';

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 0110.153-.491A3.502 3.502 0 018.5 13.5H8a.5.5 0 000 1h.5a4.5 4.5 0 100-9H8a.5.5 0 000 1h.5a2.5 2.5 0 110 5c-.382 0-.75-.04-1.1-.111a6.001 6.001 0 01-3.067-5.362z"
      clipRule="evenodd"
    />
  </svg>
);
