import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
// import { getErrorMessage } from "@/lib/getErrorMessage"
import { CreateVehicleSetupDto } from "../types"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useCreateHrVehicles = () => {
  const queryClient = useQueryClient()
    const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate: create, isPending } = useMutation({
    mutationFn: async (data: CreateVehicleSetupDto) => {
      return (await api.post(`/vehicle-setups/create`, data)).data
    },

    onError: (error) => {
      getErrorMessage(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr-vehicles"] })
    },
  })

  return { create, isPending }
}
