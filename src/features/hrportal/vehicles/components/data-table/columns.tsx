"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { TRUCK_TYPES } from "@/constants/constants"
import { formatDateString } from "@/utils"
import { Badge, BadgeProps } from "@/components/Badge"
import { statuses } from "../../data/data"
import { DataTableRowActions } from "./DataTableRowActions"
import { Usage } from "./schema"

const columnHelper = createColumnHelper<Usage>()

export const columns = [
  columnHelper.accessor("id", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-left w-[100px]",
      displayName: "#",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[100px] truncate">{row?.original?.id}</span>
      )
    },
  }),
  columnHelper.accessor((row) => row?.main_driver?.full_name, {
    id: "main_driver", 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Driver",
    },
    cell: ({ getValue }) => (
      <span className="block w-[200px] truncate ">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("truck_type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Type" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left w-[150px]",
      displayName: "Vehicle Type",
    },

    cell: ({ row }: any) => {
      const found = TRUCK_TYPES.find(
        (item) => item.value === row?.original?.truck_type,
      )
      return <span className="block w-[150px] truncate ">{found ? found.label : "..."}</span>
    },
  }),
  // columnHelper.accessor("size", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Registration Exp" />
  //   ),
  //   enableSorting: false,
  //   meta: {
  //     className: "text-left w-[180px]",
  //     displayName: "Registration Exp",
  //   },
  //   filterFn: "arrIncludesSome",
  //   cell: ({ row }: any) => {
  //     return (
  //       <span className="block w-[180px] truncate text-left ">
  //         {row?.original?.length}&times;{row?.original?.width}&times;
  //         {row?.original?.height}
  //       </span>
  //     )
  //   },
  // }),
 
  columnHelper.accessor("insurance_expire_date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Insurance Exp " />
    ),
    enableSorting: false,
    meta: {
      className: "text-left w-[200px]",
      displayName: "Insurance Exp ",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block w-[200px] truncate">
         {row?.original?.insurance_expire_date}
        </span>
      )
    },
  }),
  columnHelper.accessor("license_expire_date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Exp" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "License Exp",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
          {row?.original?.license_expire_date}
        </span>
      )
    },
  }),
    columnHelper.accessor("actions", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Docs" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Docs",
    },
    cell: ({ row }: any) => {
      return (
        <span className="block max-w-[250px] truncate">
         <Badge>
          {row?.original?.document_count +
            "/" +
            row?.original?.total_doc_numbers}
        </Badge>
        </span>
      )
    },
  }),
   columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    meta: {
      className: "text- w-[180px]",
      displayName: "Status",
    },
    cell: ({ row }) => {
      const status = statuses.find(
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
] as ColumnDef<Usage>[]
