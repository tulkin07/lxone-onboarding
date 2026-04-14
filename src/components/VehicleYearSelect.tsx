"use client"

import { YearPickerInput } from "@mantine/dates"
import dayjs from "dayjs"

const minYearDate = new Date(1980, 0, 1)
const maxYearDate = new Date(new Date().getFullYear() + 1, 11, 31)

export default function VehicleYearSelect({
  value,
  onChange,
  required,
  id,
  placeholder = "Select model year",
}: {
  value: string | null
  onChange: (y: string) => void
  required?: boolean
  id?: string
  placeholder?: string
}) {
  return (
    <YearPickerInput
      id={id}
      placeholder={placeholder}
      required={required}
      clearable
      value={
        value && /^\d{4}$/.test(value)
          ? dayjs(`${value}-06-15`).toDate()
          : null
      }
      onChange={(d) => {
        onChange(d ? dayjs(d).format("YYYY") : "")
      }}
      valueFormat="YYYY"
      minDate={minYearDate}
      maxDate={maxYearDate}
      dropdownType="popover"
      maxLevel="decade"
      defaultLevel="decade"
      size="sm"
      w="100%"
    />
  )
}
