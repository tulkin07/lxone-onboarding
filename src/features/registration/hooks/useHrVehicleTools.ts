"use client"
import { useQuery } from "@tanstack/react-query"
import api, { createApi } from "@/lib/api"
import { useCompanyInfo } from "@/context/CompanyInfoContext"

export const useHrVehicleTools = () => {
  const { companyInfo } = useCompanyInfo()
    const api = createApi(companyInfo?.subdomain || "");
  const { data: vehicleTools, isLoading: isLoadingVehicleTools } = useQuery<{
    id: string
    name: string
    short_name: string
  }[]>({
    queryKey: ["vehicle-setups-tools"],
    queryFn: async () => (await api.get(`/vehicle-setups/tools`)).data,
  })

  return { vehicleTools, isLoadingVehicleTools }
}
