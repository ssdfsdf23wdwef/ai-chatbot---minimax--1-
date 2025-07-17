import React from 'react';

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M10 2a1 1 0 011 1v1.017a4.985 4.985 0 013.91 4.912 5.013 5.013 0 01-1.378 3.538 3.5 3.5 0 00.368 5.28A1 1 0 0113 19h-1a1 1 0 010-2h.382a1.5 1.5 0 01-1.298-2.268 4.992 4.992 0 01-1.15-2.627C9.932 12.001 10 11.997 10 12c0-.683-.066-1.35-.19-1.993A5.002 5.002 0 016.09 5.084 4.984 4.984 0 019 4.017V3a1 1 0 011-1z" />
  </svg>
);
