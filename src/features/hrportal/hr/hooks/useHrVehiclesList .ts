// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { HrVehicleResponse } from "../types"
import { useParams, useSearchParams } from "next/navigation"
export const useHrVehiclesList = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const companyId = localStorage.getItem("selected-company-id")
  const page = Number(searchParams.get("page")) || 1
  const size = Number(searchParams.get("pageSize")) || 50
  const { data: hrVehicles, isLoading } = useQuery<HrVehicleResponse>({
    queryKey: ["hr-vehicles",page,size],
    queryFn: async () =>
      (
        await api.get(
          `/vehicle-setups/list?company_id=${companyId}&owner_company_id=${params?.id}`,
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

  return { hrVehicles, isLoading }
}
