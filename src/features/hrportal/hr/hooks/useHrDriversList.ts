// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { HrDriversResponse } from "../types"
import { useParams, useSearchParams } from "next/navigation"
export const useHrDriversList = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const companyId = localStorage.getItem("selected-company-id")
  const page = Number(searchParams.get("page")) || 1
  const size = Number(searchParams.get("pageSize")) || 50
  const { data: hrDrivers, isLoading: isLoadingDriversList } =
    useQuery<HrDriversResponse>({
      queryKey: ["hr-drivers", page, size],
      queryFn: async () =>
        (
          await api.get(
            `/driver/list?company_id=${companyId}&owner_company_id=${params?.id}`,
            {
              params: {
                page,
                size,
              },
            },
          )
        ).data,
      retry: 1,
    })

  return { hrDrivers, isLoadingDriversList }
}
