"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { HrResponseType } from "../types"
import { useSearchParams } from "next/navigation"

export const useHrList = () => {
  const companyId = localStorage.getItem("selected-company-id")
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""
  const page = Number(searchParams.get("page")) || 1
  const size = Number(searchParams.get("pageSize")) || 50

  const { data: hr, isLoading } = useQuery<HrResponseType>({
    queryKey: ["hr", companyId, search, page, size],
    queryFn: async () =>
      (
        await api.get(`/owner/${companyId}/list`, {
          params: {
            search,
            page,
            size,
          },
        })
      ).data,
  })

  return { hr, isLoading }
}
