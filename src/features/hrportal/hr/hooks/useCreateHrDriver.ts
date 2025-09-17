import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
import { HrDriverCreate } from "../types"
import { useParams } from "next/navigation"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useCreateHrDriver = () => {
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const params = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const companyId = localStorage.getItem("selected-company-id")
  const { mutate: create, isPending } = useMutation({
    mutationFn: async (data: HrDriverCreate) => {
      data.owner_company_id = params.id
      return (await api.post(`/driver/add?company_id=${companyId}`, data)).data
    },

    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr-drivers"] })
    },
  })

  return { create, isPending }
}
