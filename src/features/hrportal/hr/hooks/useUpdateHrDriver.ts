import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
import { HrDriverFormData } from "../components/DrawerEditHrDriver "
import { useToastMessage } from "@/hooks/useToastMessage"

export const useUpdateHrDriver = () => {
  const queryClient = useQueryClient()
  const companyId = localStorage.getItem("selected-company-id")
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (data: HrDriverFormData) => {
      return (
        await api.patch(
          `/driver/update/${data.id}?company_id=${companyId}`,
          data,
        )
      ).data
    },

    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr-drivers"] })
    },
  })

  return { update, isPending }
}
