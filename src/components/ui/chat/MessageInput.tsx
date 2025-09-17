// components/chat/MessageInput.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  showQuickActions: boolean;
  setShowQuickActions: (show: boolean) => void;
  isMobile: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  showQuickActions,
  setShowQuickActions,
  isMobile,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  return (
    <div
      className={`flex gap-2 ${!newMessage.trim() ? "items-center" : "items-start"}`}
    >
      {/* Attachment Button */}
      <button
        onClick={() => setShowQuickActions(!showQuickActions)}
        className={`rounded-lg p-2 transition-colors flex-shrink-0 ${
          showQuickActions
            ? "text-blue-500 bg-blue-50 dark:bg-blue-950 dark:text-blue-400"
            : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        }`}
      >
        <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Message Input */}
      <textarea
        ref={textareaRef}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        rows={1}
        className="w-full rounded-xl sm:rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 resize-none focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm sm:text-base"
        style={{
          height: newMessage ? "auto" : isMobile ? "36px" : "40px",
          minHeight: isMobile ? "36px" : "40px",
          maxHeight: isMobile ? "100px" : "120px",
        }}
      />

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
        className="rounded-xl sm:rounded-lg bg-blue-500 p-2 sm:p-2.5 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700 transition-colors flex-shrink-0"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default MessageInput;
