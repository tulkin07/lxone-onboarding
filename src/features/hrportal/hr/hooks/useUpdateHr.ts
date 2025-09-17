import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
import { HrFormData } from "../types"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useUpdateHr = () => {
  const queryClient = useQueryClient()
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (data: HrFormData) => {
     data.owner_uuid = data.uuid;
    //  delete data.uuid 
    //  delete data.id 
      return (await api.patch(`/owner/${data.owner_uuid}`, data)).data
    },
    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr-details"] })
    },
  })

  return { update, isPending }
}
