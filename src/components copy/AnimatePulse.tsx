import React from "react"

export default function AnimatePulse({row=1, col = 1 }: { row?:number,col?: number }) {
  return (
   <div className="animate-pulse space-y-2">
  {[...Array(row)].map((_, rowIndex) => ( // 3 qator
    <div key={rowIndex} className="flex gap-2">
      {[...Array(col)].map((_, colIndex) => ( // har qator col ta element
        <div
          key={colIndex}
          className="h-8 flex-1 rounded bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  ))}
</div>

  )
}

