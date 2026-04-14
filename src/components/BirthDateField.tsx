"use client"

import { DatePickerInput } from "@mantine/dates"
import dayjs from "dayjs"

export default function BirthDateField({
  value,
  onChange,
  required,
  id,
  placeholder = "Select date",
}: {
  value: string | null
  onChange: (v: string | null) => void
  required?: boolean
  id?: string
  placeholder?: string
}) {
  return (
    <DatePickerInput
      id={id}
      placeholder={placeholder}
      required={required}
      clearable={!required}
      value={value ? dayjs(value).toDate() : null}
      onChange={(d) => {
        onChange(d ? dayjs(d).format("YYYY-MM-DD") : null)
      }}
      valueFormat="MMMM D, YYYY"
      minDate={new Date(1900, 0, 1)}
      maxDate={new Date()}
      dropdownType="popover"
      maxLevel="decade"
      defaultLevel="month"
      size="sm"
      w="100%"
    />
  )
}
