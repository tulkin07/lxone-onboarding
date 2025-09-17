"use client"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import TableActions from "./TableActions"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import Pagination from "./TablePagination"
import { columnsWithActions } from "./TableColumns"
import { useSearchParams } from "next/navigation"

interface VehiclesTableProps {
  data: any[]
  isLoading: boolean
  pages: number
  total: number
}

export default function HrVehiclesTable({
  pages,
  total,
  data,
  isLoading,
}: VehiclesTableProps) {
  const columns = columnsWithActions()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const table = useReactTable({
    data,
    columns,
    pageCount: pages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: 50,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div>
        <TableActions />
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
          <table className="w-full">
            <TableHeader table={table} />
            <TableBody table={table} isLoading={isLoading} />
          </table>
        </div>

        <Pagination total={total} table={table} />
      </div>
    </>
  )
}
