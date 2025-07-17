import React from 'react';

export const MinimaxLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center gap-2 font-bold text-xl ${className}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
            <path d="M3 12C3 11.4477 3.44772 11 4 11H5C5.55228 11 6 11.4477 6 12V18C6 18.5523 5.55228 19 5 19H4C3.44772 19 3 18.5523 3 18V12Z" fill="currentColor"/>
            <path d="M9 6C9 5.44772 9.44772 5 10 5H11C11.5523 5 12 5.44772 12 6V18C12 18.5523 11.5523 19 11 19H10C9.44772 19 9 18.5523 9 18V6Z" fill="currentColor"/>
            <path d="M15 9C15 8.44772 15.4477 8 16 8H17C17.5523 8 18 8.44772 18 9V18C18 18.5523 17.5523 19 17 19H16C15.4477 19 15 18.5523 15 18V9Z" fill="currentColor"/>
            <path d="M20.3721 13.9281C20.6272 13.5252 21.1633 13.3333 21.6318 13.5583L21.7578 13.628C22.2263 13.853 22.4503 14.3838 22.2253 14.8523L22.2197 14.8643C20.658 17.988 18.814 18.9856 18.5029 19.0835" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.77466 14.8643C1.54966 14.3958 1.77369 13.865 2.24219 13.64L2.36815 13.5703C2.83665 13.3453 3.37276 13.5372 3.62788 13.9401L5.49712 17.0003" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>MINIMAX</span>
    </div>
);
