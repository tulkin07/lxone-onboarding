import AnimatePulse from "@/components/AnimatePulse"
import { flexRender } from "@tanstack/react-table"

export default function TableBody({
  table,
  isLoading,
  onEdit,
}: {
  table: any
  isLoading: boolean
  onEdit: (data: any) => void
}) {
  const rows = table.getRowModel().rows
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
          >
            <AnimatePulse row={8} col={7} />
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {rows.length === 0 ? (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
          >
            No data found
          </td>
        </tr>
      ) : (
        rows.map((row: any, index: number) => (
          <tr
            onClick={(e) => {
              const selection = window.getSelection()
              if (selection && selection.toString().length > 0) {
                return
              }
              onEdit(row?.original)
            }}
            key={row.id}
            className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
              index % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            {row.getVisibleCells().map((cell: any) => (
              <td
                key={cell.id}
                className="whitespace-nowrap px-6 py-1 text-xs font-medium text-gray-700 dark:text-gray-400"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  )
}
