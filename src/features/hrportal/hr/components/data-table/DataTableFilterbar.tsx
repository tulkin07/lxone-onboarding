"use client"

import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"
import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import { Searchbar } from "@/components/Searchbar"
import { statuses } from "../../data/data"
import { Button } from "@/components/Button"
import { RiDownloadLine } from "@remixicon/react"
import { Link2, LinkIcon, Plus } from "lucide-react"
import { DrawerAddHr } from "../DrawerAddHr"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openModal, setOpenModal] = useState(false);
  const debouncedSetFilterValue = useDebouncedCallback((value) => {
    // table.getColumn("driver")?.setFilterValue(value)
    table.setGlobalFilter(value)
  }, 300)

  const handleSearchChange = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetFilterValue(value)
  }
  return (
    <>
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        {/* {table.getColumn("status")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            type="select"
          />
        )} */}
        <Searchbar
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          // onClick={() => (window.location.href = "/registration/step-one")}
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <LinkIcon className="size-4 shrink-0" aria-hidden="true" />
          Invite Link
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <Plus className="size-4 shrink-0" aria-hidden="true" />
          Add Request
        </Button>
        <ViewOptions table={table} />
      </div>
    </div>
    <DrawerAddHr open={openModal} closeDrawer={() => setOpenModal(false)} />
    </>
  )
}
