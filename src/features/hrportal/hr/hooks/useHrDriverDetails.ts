// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export const useHrDriverDetails = (id: string | null) => {
  const companyId = localStorage.getItem("selected-company-id")
  
  const { data: hr, isLoading, isFetching ,refetch} = useQuery({
    queryKey: ["hr-driver-details", id],
    queryFn: async () => {
      if (!id) return null
      return (await api.get(`/driver/get/${id}?company_id=${companyId}`)).data
    },
    enabled: !!id && !!companyId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  return { 
    hr, 
    isLoading: isLoading || isFetching,
    isFetching,
    refetch
  }
}