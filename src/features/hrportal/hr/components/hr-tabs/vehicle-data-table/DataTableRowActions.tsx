"use client"

import { Button } from "@/components/Button"
import { RiMoreFill } from "@remixicon/react"
import { Row } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import { useUpdateHrVehicleStatus } from "../../../hooks/useUpdateHrVehicleStatus"
import { Check, X } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: any
}

export function DataTableRowActions<
  TData,
>({row}: DataTableRowActionsProps<TData>) {
   const { isPendingStatus:isPending, updateHrVehicleStatus } = useUpdateHrVehicleStatus()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group aspect-square p-1.5 hover:border hover:border-gray-300 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
        >
          <RiMoreFill
            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-data-[state=open]:text-gray-700 group-hover:dark:text-gray-300 group-data-[state=open]:dark:text-gray-300"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {/* <DropdownMenuItem>Add</DropdownMenuItem> */}
        <DropdownMenuItem >Edit</DropdownMenuItem>
        {row?.original?.status != "accepted" && (
                    <DropdownMenuItem
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateHrVehicleStatus({ id: row.original?.id, status: "accepted" })
                      }}
                      className="flex items-center gap-2"
                    >
                      {/* <Check size={18} className="text-green-600" /> */}
                      <span className="text-base">
                        {isPending ? "Loading..." : "Accept"}
                      </span>
                    </DropdownMenuItem>
                  )}
        
                  {row.original?.status != "rejected" && (
                    <DropdownMenuItem
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation()
                        updateHrVehicleStatus({ id: row?.original?.id, status: "rejected" })
                      }}
                      className="flex items-center gap-2"
                    >
                      {/* <X size={18} className="text-red-500" /> */}
                      <span className="text-base">
                        {isPending ? "Loading..." : "Reject"}
                      </span>
                    </DropdownMenuItem>
                  )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
