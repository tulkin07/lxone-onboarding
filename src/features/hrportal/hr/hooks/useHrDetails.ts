// features/auth/hooks/useMeQuery.ts
"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
export const useHrDetails = (id:string) => {
const companyId = localStorage.getItem("selected-company-id");
  const { data: hr, isLoading } = useQuery({
    queryKey: ["hr-details"],
    queryFn: async () =>
      (await api.get(`/owner/${id}?company_id=${companyId}`)).data,
    retry: 1,
    enabled:!!id
  })

  return { hr, isLoading }
}
