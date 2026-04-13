
"use client"
import { useCompanyInfo } from "@/context/CompanyInfoContext"
import api, { createApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
export const useBusinessType = () => {
  const { companyInfo } = useCompanyInfo()
  const api = createApi(companyInfo?.subdomain || "");
  const { data: businessTypes, isLoading } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () =>
      (await api.get(`/owner/company-types`)).data,
  
    retry: 1,
    
  })

  return { businessTypes, isLoading }
}
