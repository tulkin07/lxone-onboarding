"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { Badge, BadgeProps } from "@/components/Badge"
import { DataTableRowActions } from "./DataTableRowActions"
import { Usage } from "./schema"
import { DRIVER_STATUS_STYLES } from "@/constants/constants"
import { driver_statuses } from "../../../data/data"

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
  columnHelper.accessor("full_name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Driver",
    },

    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[300px] truncate">
          {row?.original?.full_name}
        </span>
      )
    },
  }),
  columnHelper.accessor("gmail", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Email",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.gmail}
        </span>
      )
    },
  }),
  columnHelper.accessor("app", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="App" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "App",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.app}
        </span>
      )
    },
  }),
  columnHelper.accessor("phone_number", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Phone",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[250px] truncate">
          {row?.original?.phone_number}
        </span>
      )
    },
  }),
  columnHelper.accessor("driver_status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left w-[180px]",
      displayName: "Status",
    },
    cell: ({ row }) => {
      const status = driver_statuses.find(
        (item) => item.value === row.getValue("driver_status"),
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
