"use client";

import React from "react";
import { Phone, Video, MoreVertical, MapPin, Truck } from "lucide-react";
export interface ChatUser {
  id: string;
  name: string;
  status: "online" | "away" | "offline" | string;
  currentLocation?: string;
  vehicle?: string;
  role:string
}

interface ChatHeaderProps {
  user: ChatUser;
  isMobile: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, isMobile }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          {/* User Avatar */}
          <div className="relative flex-shrink-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm sm:text-base">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-white dark:border-gray-950 ${getStatusColor(
                user.status
              )}`}
            />
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {user.name}
            </h3>
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="capitalize">{user.status}</span>
              {user.currentLocation && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center space-x-1 min-w-0">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{user.currentLocation}</span>
                  </div>
                </>
              )}
              {user.vehicle && !isMobile && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-3 w-3 flex-shrink-0" />
                    <span>{user.vehicle}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button className="rounded-lg p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <Phone className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <Video className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
