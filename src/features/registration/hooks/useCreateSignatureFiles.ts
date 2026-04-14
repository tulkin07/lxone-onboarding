"use client"
import { useMutation } from "@tanstack/react-query"
import api, { createApi } from "@/lib/api"
import { useToastMessage } from "@/hooks/useToastMessage"
import { useRouter, useSearchParams } from "next/navigation"
import { useCompanyInfo } from "@/context/CompanyInfoContext"

export const useCreateSignatureFiles = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { companyInfo } = useCompanyInfo()
  const api = createApi(companyInfo?.subdomain || "");
  const ids = JSON.parse(localStorage.getItem("registration_ids") || "{}");

  const { getErrorMessage } = useToastMessage()
  const { mutate, isPending } = useMutation({
    mutationFn: async (item: any) =>
      (await api.post(`/invite-link/registeration/signature/${searchParams.get("token")}?driver_company_id=${ids?.driver_company_id}`, item)).data,
    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      router.replace(`/application-success`)
      // router.refresh()
    }
  })

  return { mutate, isPending }
}
