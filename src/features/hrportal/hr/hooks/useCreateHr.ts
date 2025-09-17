import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
import { HrFormData } from "../types"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useCreateHr = () => {
  const queryClient = useQueryClient()
  const companyId = localStorage.getItem("selected-company-id")
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: create, isPending } = useMutation({
    mutationFn: async (data: HrFormData) => {
      data.company_id = companyId ? companyId : ""
      data.business_type = Number(data.business_type)
      // data.accounting_number = Number(data.accounting_number)
      // data.routing_number = Number(data.routing_number)
      return (await api.post(`/owner/create/`, data)).data
    },

    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr"] })
    },
  })

  return { create, isPending }
}
