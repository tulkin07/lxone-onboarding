"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { useSearchParams } from "next/navigation"

export const useHrVehiclesList = () => {
  const companyId = localStorage.getItem("selected-company-id")
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") 
  const page = Number(searchParams.get("page")) || 1
  const size = Number(searchParams.get("pageSize")) || 50

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["hr-vehicles-list", companyId, search, page, size,status],
    queryFn: async () =>
      (
        await api.get(`/vehicle-setups/hr-vehicle/list/${companyId}`, {
          // params: { search, page, size,status },
        })
      ).data,
  })

  return { vehicles, isLoading }
}
