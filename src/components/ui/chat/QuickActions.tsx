// components/chat/QuickActions.tsx
"use client";

import React from "react";
import { MapPin, Clock, Image, File } from "lucide-react";

interface QuickActionsProps {
  isMobile: boolean;
  showQuickActions: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  isMobile,
  showQuickActions,
}) => {
  const actions = [
    { icon: MapPin, label: isMobile ? "Location" : "Share Location" },
    { icon: Clock, label: isMobile ? "ETA" : "Update ETA" },
    { icon: Image, label: isMobile ? "Photo" : "Share Photo" },
    ...(isMobile ? [{ icon: File, label: "File" }] : []),
  ];

  if (isMobile && !showQuickActions) return null;

  return (
    <div className={`${isMobile ? "mb-3" : "mt-2"} flex flex-wrap gap-2`}>
      {actions.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon className="h-3 w-3 mr-1" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
