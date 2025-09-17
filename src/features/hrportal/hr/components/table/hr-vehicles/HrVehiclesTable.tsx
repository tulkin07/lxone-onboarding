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
import { HrVehicleItem } from "../../../types"
import { useSearchParams } from "next/navigation"

interface UsersTableProps {
  pages: number
  total: number
  data: HrVehicleItem[]
  isLoading: boolean
  isPending: boolean
  updateStatus: (d: { status: string; id: string }) => void
  onEdit: (data: any) => void
}

export default function HrVehiclesTable({
  pages,
  total,
  data,
  isLoading,
  isPending,
  updateStatus,
  onEdit,
}: UsersTableProps) {
  const columns = columnsWithActions(isPending, updateStatus, onEdit)
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
          <TableBody table={table} isLoading={isLoading} onEdit={onEdit} />
        </table>
      </div>

      <Pagination total={total} table={table} />
    </div>
  )
}
