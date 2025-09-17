import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
// import { getSuccessMessage } from "@/lib/getSuccessMessage"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useUpdateHrDriverStatus = () => {
  const queryClient = useQueryClient()
    const companyId = localStorage.getItem("selected-company-id")
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: updateHrDriverStatus, isPending: isPendingStatus } =
    useMutation({
      mutationFn: async (data: { driver_status: string; id: string }) => {
        return (
          await api.patch(`/driver/status/update/${data.id}?company_id=${companyId}`, data)
        ).data
      },
      onError: (error) => {
        getErrorMessage(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["hr-drivers"] })
        getSuccessMessage("Status updated")
      },
    })

  return { updateHrDriverStatus, isPendingStatus }
}
