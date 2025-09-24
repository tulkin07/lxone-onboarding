
"use client"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
export const useBusinessType = () => {
  const { data: businessTypes, isLoading } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () =>
      (await api.get(`/owner/company-types`)).data,
    retry: 1,
  })

  return { businessTypes, isLoading }
}
