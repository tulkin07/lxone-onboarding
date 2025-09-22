// components/chat/MessageList.tsx
"use client";

import React from "react";
import MessageBubble, { Message } from "./MessageBubble";
import DateSeparator from "./DateSeparator";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isTyping: boolean;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  isTyping,
  formatTime,
  formatDate,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto py-2 sm:py-4 sm:px-4">
      <div className="space-y-1 sm:space-y-2">
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === currentUserId;
          const showDate =
            index === 0 ||
            formatDate(message.timestamp) !==
              formatDate(messages[index - 1].timestamp);

          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <DateSeparator date={formatDate(message.timestamp)} />
              )}
              <MessageBubble
                message={message}
                isCurrentUser={isCurrentUser}
                formatTime={formatTime}
              />
            </React.Fragment>
          );
        })}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
