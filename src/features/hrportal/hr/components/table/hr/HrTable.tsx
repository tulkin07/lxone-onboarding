"use client"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { columnsWithActions } from "./TableColumns"
import TableHeader from "./TableHeader"
import Pagination from "./TablePagination"
import TableActions from "./TableActions"
import TableBody from "./TableBody"
import { useSearchParams } from "next/navigation"

interface UsersTableProps {
  data: any[]
  pages: number
  total: number
  isLoading: boolean
  onEdit?: (row: any) => void
  onReset?: (row: any) => void
}

export default function HrTable({
  pages,
  total,
  data,
  isLoading,
  onEdit,
  onReset,
}: UsersTableProps) {
  const columns = columnsWithActions(onEdit, onReset)

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
  )
}
