// components/chat/TypingIndicator.tsx
"use client";

import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4 px-2 sm:px-0">
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 dark:bg-gray-800">
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
