import React from 'react';

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h8a1 1 0 100-2H6zM6 9a1 1 0 000 2h5a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);
