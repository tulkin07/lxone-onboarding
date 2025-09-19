"use client"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Input } from "@/components/Input"
import { useZipCodeList } from "../hooks/useZipCodeList"

type ZipOption = {
  zip: string
  city: string
  state: string | null
}

export default function ZipCodeSelect() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedZip, setSelectedZip] = useState<ZipOption | null>(null)

  // 🔹 Hookdan olish
  const { zipCodeList, isPending, mutate } = useZipCodeList()

  // 🔹 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  // 🔹 Debounced query bo‘lganda backendga so‘rov
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      mutate(debouncedQuery)
    }
  }, [debouncedQuery, mutate])

  const zipCodes = zipCodeList?.detail || []

  return (
    <Select
      value={selectedZip ? JSON.stringify(selectedZip) : ""}
      onValueChange={(val) => {
        const obj = JSON.parse(val) as ZipOption
        setSelectedZip(obj)
        console.log("Tanlangan obyekt:", obj) // 🔎 { zip, city, state }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select ZIP code" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto relative">
        {/* 🔹 Search doim yuqorida turadi */}
        <div className="sticky top-0 z-10 bg-white p-2 border-b">
          <Input
            placeholder="Search ZIP..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-2"
          />
        </div>

        {isPending ? (
          <div className="p-2 text-center text-gray-500">Loading...</div>
        ) : zipCodes.length === 0 ? (
          <SelectItem value="no-data" disabled className="text-center">
            No data
          </SelectItem>
        ) : (
          zipCodes.map((option: ZipOption) => (
            <SelectItem key={option.zip} value={JSON.stringify(option)}>
              {option.zip} – {option.city} {option.state ? `(${option.state})` : ""}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
