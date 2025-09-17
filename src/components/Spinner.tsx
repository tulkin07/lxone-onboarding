import React from "react"

export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
    </div>
  )
}
