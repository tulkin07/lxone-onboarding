"use client"

import { Usage } from "@/data/schema"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { ConditionFilter } from "./DataTableFilter"
import { formatDate } from "@/utils/utcToZonedTime"
import { Star } from "lucide-react"
import { copyToClipboard } from "@/utils"

const columnHelper = createColumnHelper<Usage>()

export const columns = [
  columnHelper.accessor("posted_datetime", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Received" />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-left w-[100px]",
      displayName: "Received",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[100px] truncate">
          {formatDate(row?.original?.posted_datetime, "HH:mm a")}
        </span>
      )
    },
  }),
  columnHelper.accessor("pickup_location", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pick-up" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[250px]",
      displayName: "Pick-up",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[250px] truncate">
          {row?.original?.pickup_location}
        </span>
      )
    },
  }),
  columnHelper.accessor("delivery_location", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[250px]",
      displayName: "Delivery",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[250px] truncate">
          {row?.original?.delivery_location}
        </span>
      )
    },
  }),
  columnHelper.accessor("vehicle_required", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left w-[150px]",
      displayName: "Vehicle",
    },
    filterFn: "arrIncludesSome",
    cell: ({ row }: any) => {
      return (
        <span className="block w-[150px] truncate">
          {row?.original?.vehicle_required}
        </span>
      )
    },
  }),
  columnHelper.accessor("miles", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miles" />
    ),
    enableSorting: true,
    meta: {
      className: "text-center w-[100px]",
      displayName: "Miles",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[100px] truncate text-center">
          {row?.original?.miles}
        </span>
      )
    },
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      const value = row.getValue(columnId) as number
      const [min, max] = filterValue.value as [number, number]

      switch (filterValue.condition) {
        case "is-equal-to":
          return value == min
        case "is-between":
          return value >= min && value <= max
        case "is-greater-than":
          return value > min
        case "is-less-than":
          return value < min
        default:
          return true
      }
    },
  }),
  columnHelper.accessor("match", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Match" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left w-[100px]",
      displayName: "Match",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[100px] truncate">
          {row?.original?.miles_out > 0
            ? row?.original?.miles_out + " ml"
            : "0 ml"}{" "}
          / {row?.original?.nearby_drivers_count}
        </span>
      )
    },
  }),
  columnHelper.accessor("broker_company", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brokerage" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Brokerage",
    },
    cell: ({ row }: any) => {
      return (
        <div
          className="h-full max-w-[200px] cursor-pointer truncate px-2 "
          // onClick={(e) => {
          //   e.preventDefault()
          //   e.stopPropagation()
          //   copyToClipboard(
          //     row?.original?.broker_company,
          //     "Copied brokerage name",
          //   )
          // }}
        >
          {row?.original?.broker_company}
        </div>
      )
    },
  }),

  columnHelper.display({
    id: "edit",
    header: "",
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-right",
      displayName: "",
    },
    cell: ({ row }) => {
      const rate = row?.original?.broker_rate ?? 0 // null bo‘lsa 0 bo‘lib qoladi
      const stars = Array.from({ length: 5 }, (_, i) => i + 1)

      return (
        <div className="flex items-center gap-1">
          {stars.map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= rate ? "fill-blue-500 text-blue-500" : "fill-none"
              }
            />
          ))}
        </div>
      )
    },
  }),
] as ColumnDef<Usage>[]
