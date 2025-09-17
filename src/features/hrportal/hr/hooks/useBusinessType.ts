// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { BusinessType } from "../types"
export const useBusinessType = () => {
  const { data: businessTypes, isLoading } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () =>
      (await api.get(`/owner/company-types`)).data,
    retry: 1,
  })

  return { businessTypes, isLoading }
}
