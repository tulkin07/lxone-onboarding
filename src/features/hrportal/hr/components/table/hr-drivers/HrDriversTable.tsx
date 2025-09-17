"use client"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { columnsWithActions } from "./TableColumns"
import TableHeader from "./TableHeader"
import Pagination from "./TablePagination"
import TableBody from "./TableBody"
import { useSearchParams } from "next/navigation"

interface UsersTableProps {
  pages: number
  total: number
  data: any[]
  isLoading: boolean
  onEdit?: (row: any) => void
  onReset?: (row: any) => void
}

export default function HrDriversTable({
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
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full">
          <TableHeader table={table} />
          <TableBody onEdit={onEdit} table={table} isLoading={isLoading} />
        </table>
      </div>

      <Pagination total={total} table={table} />
    </div>
  )
}
