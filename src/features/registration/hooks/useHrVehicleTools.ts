"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export const useHrVehicleTools = () => {
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
