import React from 'react';

export const SidebarToggleIcon: React.FC<{ className?: string; isOpen: boolean }> = ({ className, isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <path d={isOpen ? "M14 16l-4-4 4-4" : "M15 8l4 4-4 4"} />
  </svg>
);
