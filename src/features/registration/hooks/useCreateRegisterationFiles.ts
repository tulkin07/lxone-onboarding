"use client"
import { useMutation } from "@tanstack/react-query"
import api, { createApi } from "@/lib/api"
import { useToastMessage } from "@/hooks/useToastMessage"
import { useSearchParams } from "next/navigation"
import { useCompanyInfo } from "@/context/CompanyInfoContext"

export const useCreateRegisterationFiles = () => {
   const searchParams = useSearchParams()
   const {companyInfo} = useCompanyInfo()
  const api = createApi(companyInfo?.subdomain||"");

   const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate, isPending } = useMutation({
    mutationFn: async (item:any) =>
      (await api.post(`/invite-link/registeration/files/${searchParams.get("token")}`, item)).data,
    onError: (error) => {
      console.log(error)
      getErrorMessage(error)
    },
  })

  return { mutate, isPending }
}
