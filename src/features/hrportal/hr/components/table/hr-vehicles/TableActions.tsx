"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { CREATE_USER_ROLES } from "@/constants/constants"
import { Link } from "lucide-react"
import { useState, useEffect } from "react"
import { DrawerAddHr } from "../../DrawerAddHr"
import { useRouter, useSearchParams } from "next/navigation"

// custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function TableActions() {
  const [openModal, setOpenModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  // 🔎 search state
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const debouncedSearch = useDebounce(search, 500)

  // ✅ role state
  const [role, setRole] = useState(searchParams.get("role") || "all")

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

  // 🔄 update query when role changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (!role || role === "all") {
      newParams.delete("role")
    } else {
      newParams.set("role", role)
    }
    router.replace(`?${newParams.toString()}`)
  }, [role])

  return (
    <>
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

          <div style={{ width: "200px" }}>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CREATE_USER_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ➕ Actions */}
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-1 text-sm font-normal">
            <Link size={16} />
            <span className="pl-1">Invite Link</span>
          </Button>
          <Button
            className="text-sm font-normal"
            onClick={() => setOpenModal(true)}
          >
            Add Request
          </Button>
        </div>
      </div>

      {/* ➕ Drawer */}
      <DrawerAddHr open={openModal} closeDrawer={() => setOpenModal(false)} />
    </>
  )
}


