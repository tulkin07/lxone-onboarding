"use client"
import { useEffect } from "react"
import { Button } from "@/components/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Pagination({
  table,
  total,
}: {
  table: any
  total: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = table.getState().pagination.pageIndex + 1
  const pageSize = table.getState().pagination.pageSize || 50
  const totalPages = table.getPageCount()

  useEffect(() => {
    if (!table.getState().pagination.pageSize) {
      table.setPageSize(50)
    }
  }, [table])

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    table.setPageIndex(newPage - 1)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(newPage))
    router.push(`?${params.toString()}`)
  }

  const setPageSize = (newSize: number) => {
    table.setPageSize(newSize)
    const params = new URLSearchParams(searchParams.toString())
    params.set("pageSize", String(newSize))
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }

  const visiblePages = () => {
    const pages: (number | string)[] = []

    for (let i = 1; i <= Math.min(2, totalPages); i++) pages.push(i)
    if (page > 4) pages.push("...")
    const startMiddle = Math.max(3, page - 1)
    const endMiddle = Math.min(totalPages - 2, page + 1)
    for (let i = startMiddle; i <= endMiddle; i++) pages.push(i)
    if (page < totalPages - 3) pages.push("...")
    for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++)
      pages.push(i)

    return [...new Set(pages)]
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-3">
        <span className="text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>
        <select
          value={searchParams.get("pageSize") || ""}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="rounded border p-2 py-1 outline-none dark:bg-gray-700 dark:text-gray-200"
        >
          {[
            { value: 20, label: "Show 20" },
            { value: 50, label: "Show 50" },
            { value: 100, label: "Show 100" },
          ].map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="rounded px-3 py-1 disabled:opacity-50 dark:text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {visiblePages().map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <Button
              key={idx}
              variant={p === page ? "primary" : "secondary"}
              onClick={() => setPage(Number(p))}
              className={`rounded px-3 py-1 ${
                p === page ? "bg-blue-500 text-white" : "dark:text-gray-300"
              }`}
            >
              {p}
            </Button>
          ),
        )}

        <Button
          variant="primary"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="rounded px-3 py-1 disabled:opacity-50 dark:text-gray-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
