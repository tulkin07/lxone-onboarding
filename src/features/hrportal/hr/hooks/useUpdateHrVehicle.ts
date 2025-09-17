import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
// import { HrDriverFormData } from "../components/DrawerEditHrDriver "
import { CreateVehicleSetupDto } from "../types"
// import { getSuccessMessage } from "@/lib/getSuccessMessage"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useUpdateHrVehicle = () => {
  const queryClient = useQueryClient()
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (data: CreateVehicleSetupDto) => {
      return (await api.patch(`/vehicle-setups/${data.id}?company_id=${data.company_id}`, data)).data
    },

    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      getSuccessMessage("Updated!")
      queryClient.invalidateQueries({ queryKey: ["hr-vehicle-details"] })
    },
  })

  return { update, isPending }
}
