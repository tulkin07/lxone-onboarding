// features/auth/hooks/useMeQuery.ts
"use client"
import { useCompanyInfo } from "@/context/CompanyInfoContext"
import api, { createApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
export const useStates = () => {
  const { companyInfo } = useCompanyInfo()
  const api = createApi(companyInfo?.subdomain || "")
  const { data: states, isLoading: isLoadingState } = useQuery({
    queryKey: ["states"],
    queryFn: async () => (await api.get(`/states`)).data,
    retry: 1,
  })

  return { states, isLoadingState }
}
