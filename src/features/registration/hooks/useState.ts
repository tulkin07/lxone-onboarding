// features/auth/hooks/useMeQuery.ts
"use client"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
export const useStates = () => {
  const { data: states, isLoading: isLoadingState } = useQuery({
    queryKey: ["states"],
    queryFn: async () => (await api.get(`/states`)).data,
    retry: 1,
  })

  return { states, isLoadingState }
}
