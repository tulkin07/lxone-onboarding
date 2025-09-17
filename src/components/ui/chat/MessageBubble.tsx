"use client";

import React from "react";
import { MapPin, Truck } from "lucide-react";
export interface Message {
  id: string;
  type: "text" | "location" | "status";
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  metadata?: {
    location?: {
      lat: number;
      lng: number;
      address?: string;
    };
    status?: string;
  };
}

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  formatTime: (date: Date) => string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  formatTime,
}) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return (
          <div
            className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
              isCurrentUser
                ? "bg-blue-500 text-white rounded-br-md"
                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white rounded-bl-md"
            }`}
          >
            <p className="text-sm sm:text-base leading-relaxed break-words">
              {message.content}
            </p>
          </div>
        );

      case "location":
        return (
          <div
            className={`rounded-2xl p-3 border ${
              isCurrentUser
                ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 rounded-br-md"
                : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-bl-md"
            }`}
          >
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {message.content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
                  {message.metadata?.location?.address}
                </p>
                <button className="text-xs text-blue-500 hover:text-blue-600 mt-1">
                  View on map
                </button>
              </div>
            </div>
          </div>
        );

      case "status":
        return (
          <div
            className={`rounded-2xl p-3 border-l-4 ${
              isCurrentUser
                ? "bg-blue-50 border-blue-500 dark:bg-blue-950 rounded-br-md"
                : "bg-green-50 border-green-500 dark:bg-green-950 rounded-bl-md"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-green-500 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {message.metadata?.status}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3 sm:mb-4 px-2 sm:px-0`}
    >
      <div
        className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${isCurrentUser ? "order-2" : "order-1"}`}
      >
        {!isCurrentUser && (
          <p className="text-xs text-gray-500 mb-1 px-3">
            {message.senderName}
          </p>
        )}

        {renderMessageContent()}

        <p
          className={`text-xs text-gray-400 mt-1 px-3 ${isCurrentUser ? "text-right" : "text-left"}`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
