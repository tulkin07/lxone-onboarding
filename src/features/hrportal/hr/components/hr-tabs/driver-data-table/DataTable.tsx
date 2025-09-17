"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { cx } from "@/lib/utils"
import * as React from "react"

import { Filterbar } from "./DataTableFilterbar"
import { DataTablePagination } from "./DataTablePagination"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table"

import AnimatePulse from "@/components/AnimatePulse"
import { useRouter } from "next/navigation"
import { DrawerEditHrDriver } from "../../DrawerEditHrDriver "

interface DataTableProps<TData extends { id: string | number }> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  isLoading: boolean
}

export function DriverDataTable<TData extends { id: string | number }>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData>) {
  const router = useRouter()
    const [driverData, setDriverData] = React.useState<{ id: string } | null>(null)
    const [openDriverModal, setDriverModal] = React.useState(false)

  const onEdit = (row: any) => {
    setDriverData(row?.original)
    setDriverModal(true)
  }

  const pageSize = 50
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (isLoading) {
    return (
      <div className="relative overflow-hidden overflow-x-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
              >
                <AnimatePulse row={50} col={8} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        <Filterbar table={table} />
        <div className="relative overflow-hidden overflow-x-auto mt-2">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-y border-gray-200 dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={cx(
                        "whitespace-nowrap py-1 text-sm sm:text-xs",
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={(e) => {
                      const selection = window.getSelection()
                      if (selection && selection.toString().length > 0) {
                        return
                      }
                      onEdit(row)
                    }}
                    className="group hover:bg-gray-50 hover:dark:bg-gray-900"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cx(
                          (row.original as any)?.is_read &&
                            "font-thin opacity-70 dark:opacity-50",
                          "relative cursor-pointer whitespace-nowrap py-0 text-xs font-medium text-gray-600 first:w-10 dark:text-gray-400",
                          cell.column.columnDef.meta?.className,
                        )}
                      >
                        {index === 0 && row.getIsSelected() && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-500" />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} pageSize={pageSize} />
      </div>

      {/* <DrawerEditVehicle
        open={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        data={vehicle}
        isLoading={isLoadingVehicle}
      /> */}

      <DrawerEditHrDriver
        id={driverData && driverData?.id}
        open={openDriverModal}
        closeDrawer={() => setDriverModal(false)}
      />
    </>
  )
}
