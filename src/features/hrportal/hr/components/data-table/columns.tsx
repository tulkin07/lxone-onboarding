"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { Badge, BadgeProps } from "@/components/Badge"
import { statuses } from "../../data/data"
import { DataTableRowActions } from "./DataTableRowActions"
import { Usage } from "./schema"
import { copyToClipboard } from "@/utils"

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
  columnHelper.accessor("company_name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Company Name",
    },

    cell: ({ row }: any) => {
      return (
        <div
          className="h-full max-w-[200px] cursor-pointer truncate px-2 py-2"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            copyToClipboard(row?.original?.company_name, "Copied company name")
          }}
        >
          {row?.original?.company_name}
        </div>
      )
    },
  }),
  columnHelper.accessor("owner_first_name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name " />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Name",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.owner_first_name}
        </span>
      )
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Email",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.email}
        </span>
      )
    },
  }),
  columnHelper.accessor("registration_date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reg. Date" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Reg. Date",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[250px] truncate">
          {row?.original?.registration_date}
        </span>
      )
    },
  }),
  columnHelper.accessor("document_count", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Docs" />
    ),
    enableSorting: false,
    meta: {
      className: "text- w-[180px]",
      displayName: "Docs",
    },
    cell: ({ row }) => {
      return (
        <Badge variant="default">
          {row?.original?.document_count +
            "/" +
            row?.original?.all_document_count}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("manager", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manager" />
    ),
    enableSorting: false,
    meta: {
      className: "text- w-[180px]",
      displayName: "Manager",
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.manager?.full_name}
        </span>
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
