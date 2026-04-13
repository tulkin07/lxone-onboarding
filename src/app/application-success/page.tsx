"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <div
        className={`text-center transition-all duration-700 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* TITLE */}
        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          Registration Completed
        </h1>

        {/* TEXT */}
        <p className="mt-2 text-gray-500">
          Your application has been successfully submitted.
        </p>

        
      </div>
    </div>
  );
}