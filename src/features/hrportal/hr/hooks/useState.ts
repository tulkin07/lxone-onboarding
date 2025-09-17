// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { StatesResponse } from "../types"
export const useStates = () => {
  const { data: states, isLoading:isLoadingState } = useQuery<StatesResponse>({
    queryKey: ["states"],
    queryFn: async () =>
      (await api.get(`/states`)).data,
    retry: 1,
  })

  return { states, isLoadingState }
}
