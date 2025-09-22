"use client"

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { conditions, regions, statuses } from "@/data/data"
import { formatters } from "@/lib/utils"
import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"
import { TRUCK_TYPES } from "@/constants/constants"
import { RefreshCcwIcon } from "lucide-react"
import { useIsFetching, useQueryClient } from "@tanstack/react-query"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchTerm, setSearchTerm] = useState<string>("")

  const debouncedSetFilterValue = useDebouncedCallback((value) => {
    table.getColumn("owner")?.setFilterValue(value)
  }, 300)

  const handleSearchChange = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetFilterValue(value)
  }
  const queryClient = useQueryClient()
  const isRefreshing = useIsFetching({ queryKey: ["despatchs"] }) > 0
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        <button
          disabled={isRefreshing}
          // variant="primary"
          className="flex w-full items-center gap-x-1.5 whitespace-nowrap rounded-md border border-dashed border-gray-300 px-2 py-1.5 font-medium text-blue-500 outline-0 outline-offset-2 outline-blue-500 hover:bg-gray-50 focus-visible:outline-2 dark:border-gray-700 dark:text-blue-500 dark:outline-blue-500 hover:dark:bg-gray-900 sm:w-fit sm:text-xs"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["despatchs"] })
          }}
        >
          <RefreshCcwIcon
            className={`rotate-180 transition-transform ${
              isRefreshing ? "animate-spin" : ""
            }`}
            size={18}
          />
        </button>
        {table.getColumn("pickup_location")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("pickup_location")}
            title="Pick-up"
            options={[]}
            type="text"
          />
        )}
        {table.getColumn("delivery_location")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("delivery_location")}
            title="Delivery"
            options={[]}
            type="text"
          />
        )}
        {table.getColumn("vehicle_required")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("vehicle_required")}
            title="Vehicle"
            options={TRUCK_TYPES}
            type="checkbox"
          />
        )}
        {table.getColumn("miles")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("miles")}
            title="Miles"
            options={conditions}
            type="number"
            formatter={(value) => formatters.simpleNumber({ number: value })}
          />
        )}
        {table.getColumn("broker_company")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("broker_company")}
            title="Brokerage"
            options={[]}
            type="text"
          />
        )}
        {/* {table.getColumn("region")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("region")}
            title="Region"
            options={regions}
            type="checkbox"
          />
        )} */}
        {/* {table.getColumn("costs")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("costs")}
            title="Costs"
            type="number"
            options={conditions}
            formatter={formatters.currency}
          />
        )}
        {table.getColumn("owner")?.getIsVisible() && (
          <Searchbar
            type="search"
            placeholder="Search by owner..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Clear filters
          </Button>
        )} */}
      </div>
      <div className="flex items-center gap-2">
        {/* <Button
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
          Export
        </Button> */}
        <ViewOptions table={table} />
      </div>
    </div>
  )
}
