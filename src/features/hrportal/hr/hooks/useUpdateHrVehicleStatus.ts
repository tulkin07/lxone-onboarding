import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
// import { getSuccessMessage } from "@/lib/getSuccessMessage"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useUpdateHrVehicleStatus = () => {
  const queryClient = useQueryClient()
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: updateHrVehicleStatus, isPending: isPendingStatus } =
    useMutation({
      mutationFn: async (data: { status: string; id: string }) => {
        return (
          await api.patch(`/vehicle-setups/status/update/${data.id}`, data)
        ).data
      },
      onError: (error) => {
        getErrorMessage(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["hr-vehicles"] })
        getSuccessMessage("Status updated")
      },
    })

  return { updateHrVehicleStatus, isPendingStatus }
}
