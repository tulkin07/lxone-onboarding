"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { Badge, BadgeProps } from "@/components/Badge"
import { DataTableRowActions } from "./DataTableRowActions"
import { Usage } from "./schema"
import { DRIVER_STATUS_STYLES } from "@/constants/constants"
import { driver_statuses, vehicle_statuses } from "../../../data/data"

const columnHelper = createColumnHelper<Usage>()

export const columns = [
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-left w-[100px]",
      displayName: "ID",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[100px] truncate">{row?.original?.id}</span>
      )
    },
  }),
  columnHelper.accessor("make", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Make",
    },

    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[300px] truncate">
          {row?.original?.make}
        </span>
      )
    },
  }),
  columnHelper.accessor("model", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Model",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.model}
        </span>
      )
    },
  }),
columnHelper.accessor(
  (row) => row.main_driver?.full_name ?? "", 
  {
    id: "main_driver",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Driver",
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.main_driver?.full_name}
        </span>
      )
    },
  }
)
,
  columnHelper.accessor("vehicle_vin", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "VIN",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[250px] truncate">
          {row?.original?.vehicle_vin}
        </span>
      )
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left w-[180px]",
      displayName: "Status",
    },
    cell: ({ row }) => {
      const status = vehicle_statuses.find(
        (item) => item.value === row.getValue("status"),
      )

      if (!status) {
        return null
      }

      return (
        <Badge variant={status.variant as BadgeProps["variant"]}>
          {status.label}
        </Badge>
      )
    },
  }),
  columnHelper.display({
    id: "edit",
    header: "Edit",
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-right",
      displayName: "Edit",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
] as ColumnDef<Usage>[]
