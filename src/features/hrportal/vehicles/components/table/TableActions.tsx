"use client"

import { Input } from "@/components/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { vehicleStatusOptions } from "@/constants/constants"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// ✅ custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default function TableActions() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 🔎 search state
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const debouncedSearch = useDebounce(search, 500)

  // ✅ status state
  const [status, setStatus] = useState(searchParams.get("status") || "all")

  // 🔄 update query when debounced search changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (debouncedSearch) {
      newParams.set("search", debouncedSearch)
    } else {
      newParams.delete("search")
    }
    router.replace(`?${newParams.toString()}`)
  }, [debouncedSearch])

  // 🔄 update query when status changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (!status || status === "all") {
      newParams.delete("status")
    } else {
      newParams.set("status", status)
    }
    router.replace(`?${newParams.toString()}`)
  }, [status])

  return (
    <div className="flex w-full items-center justify-between pb-4">
      <div className="flex w-full items-center gap-3">
        {/* 🔍 Search */}
        <div style={{ width: "200px" }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="text-sm"
            type="search"
          />
        </div>

        {/* ✅ Status filter */}
        <div style={{ width: "200px" }}>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {vehicleStatusOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
