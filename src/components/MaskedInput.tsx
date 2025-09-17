"use client"

import React from "react"
import { IMaskInput } from "react-imask"
import { tv, type VariantProps } from "tailwind-variants"
import { cx, focusInput, hasErrorInput } from "@/lib/utils"

const inputStyles = tv({
  base: [
    "relative block w-full appearance-none rounded-md border px-2.5 py-2 shadow-sm outline-none transition sm:text-sm",
    "border-gray-300 dark:border-gray-800",
    "text-gray-900 dark:text-gray-50",
    "placeholder-gray-400 dark:placeholder-gray-500",
    "bg-white dark:bg-gray-950",
    "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
    "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
    focusInput,
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
})

interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    VariantProps<typeof inputStyles> {
  mask: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  inputClassName?: string
  required:boolean
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  placeholder,
  hasError,
  inputClassName,
  required,
  name,
  ...props
}) => {
  return (
    <div className="w-full">
      <IMaskInput
        mask={mask}
        lazy={true}
        value={value}
        placeholder={placeholder}
        inputRef={(el) => {
          if (el) el.required = required
        }}
        className={cx(inputStyles({ hasError }), inputClassName)}
        onAccept={(val) => {
          const cleaned = val.replace(/[\s()-]/g, "") // Barcha keraksiz belgilarni olib tashlash
          onChange && onChange(cleaned)
        }}
        {...props}
      />

      {/* {required && (
        <input
          type="text"
          tabIndex={-1}
          style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
          value={value || ""}
          name={name}
          required
          readOnly
        />
      )} */}
    </div>
  )
}

export default MaskedInput
