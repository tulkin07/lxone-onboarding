// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { RiExpandUpDownLine, RiCloseLine, RiCheckLine } from "@remixicon/react";
// import { cx } from "@/lib/utils";

// interface MultiSelectProps {
//   options: { label: string; value: string }[];
//   value?: string[];
//   onValueChange?: (val: string[]) => void;
//   placeholder?: string;
//   className?: string;
//   closeOnSelect?: boolean;
// }

// export function MultiSelect({
//   options,
//   value = [],
//   onValueChange,
//   placeholder = "Select...",
//   className,
//   closeOnSelect = true,
// }: MultiSelectProps) {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<string[]>(value);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleSelect = (val: string) => {
//     const updated = selected.includes(val)
//       ? selected.filter((item) => item !== val)
//       : [...selected, val];
//     setSelected(updated);
//     onValueChange?.(updated);

//     if (closeOnSelect) setOpen(false);
//   };

//   const removeItem = (val: string) => {
//     const updated = selected.filter((item) => item !== val);
//     setSelected(updated);
//     onValueChange?.(updated);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative w-full">
//       {/* Trigger */}
//       <div
//         onClick={() => setOpen(!open)}
//         className={cx(
//           "flex w-full min-h-[40px] items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm sm:text-sm",
//           "dark:border-gray-800 dark:bg-gray-950",
//           className
//         )}
//       >
//         {/* Selected tags */}
//         <div className="flex flex-wrap gap-1 flex-1">
//           {selected.length > 0 ? (
//             selected.map((val) => {
//               const label = options.find((o) => o.value === val)?.label || val;
//               return (
//                 <span
//                   key={val}
//                   className="flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs text-white"
//                 >
//                   {label}
//                   <RiCloseLine
//                     className="size-4 cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeItem(val);
//                     }}
//                   />
//                 </span>
//               );
//             })
//           ) : (
//             <span className="text-gray-500">{placeholder}</span>
//           )}
//         </div>

//         <RiExpandUpDownLine className="size-5 text-gray-400" />
//       </div>

//       {open && (
//         <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
//           <div className="max-h-56 overflow-auto p-1">
//             {options.map((opt) => {
//               const checked = selected.includes(opt.value);
//               return (
//                 <div
//                   key={opt.value}
//                   onClick={() => handleSelect(opt.value)}
//                   className={cx(
//                     "flex cursor-pointer items-center justify-between rounded px-3 py-2 sm:text-sm",
//                     "hover:bg-gray-100 dark:hover:bg-gray-900",
//                     checked ? "font-semibold" : ""
//                   )}
//                 >
//                   <span>{opt.label}</span>
//                   {checked && (
//                     <RiCheckLine className="size-5 text-gray-800 dark:text-gray-200" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect, useRef } from "react";
import { RiExpandUpDownLine, RiCloseLine, RiCheckLine } from "@remixicon/react";
import { cx } from "@/lib/utils";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  value?: string[];
  onValueChange?: (val: string[]) => void;
  placeholder?: string;
  className?: string;
  closeOnSelect?: boolean;
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select...",
  className,
  closeOnSelect = true,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    const updated = selected.includes(val)
      ? selected.filter((item) => item !== val)
      : [...selected, val];
    setSelected(updated);
    onValueChange?.(updated);

    if (closeOnSelect) setOpen(false);
  };

  const removeItem = (val: string) => {
    const updated = selected.filter((item) => item !== val);
    setSelected(updated);
    onValueChange?.(updated);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className={cx(
          "flex w-full min-h-[40px] items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm sm:text-sm",
          "dark:border-gray-800 dark:bg-gray-950",
          className
        )}
      >
        {/* Selected tags */}
        <div className="flex flex-wrap gap-1 flex-1">
          {selected.length > 0 ? (
            selected.map((val) => {
              const label = options.find((o) => o.value === val)?.label || val;
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs text-white"
                >
                  {label}
                  <RiCloseLine
                    className="size-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(val);
                    }}
                  />
                </span>
              );
            })
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>

        {/* Clear All icon */}
        {selected.length > 0 && (
          <RiCloseLine
            className="size-4 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setSelected([]);
              onValueChange?.([]);
            }}
          />
        )}

        {/* Arrow icon */}
        <RiExpandUpDownLine className="size-5 text-gray-400" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
          <div className="max-h-56 overflow-auto p-1">
            {options.map((opt) => {
              const checked = selected.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cx(
                    "flex cursor-pointer items-center justify-between rounded px-3 py-2 sm:text-sm",
                    "hover:bg-gray-100 dark:hover:bg-gray-900",
                    checked ? "font-semibold" : ""
                  )}
                >
                  <span>{opt.label}</span>
                  {checked && (
                    <RiCheckLine className="size-5 text-gray-800 dark:text-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
