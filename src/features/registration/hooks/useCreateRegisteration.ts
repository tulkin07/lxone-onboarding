"use client"
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"
import { useToastMessage } from "@/hooks/useToastMessage"

export const useCreateRegisteration = () => {
   const {getErrorMessage,getSuccessMessage} = useToastMessage()
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ item, token }: { item: any; token: string | null }) =>
      (await api.post(`/invite-link/registeration/${token}`, item)).data,
    onError: (error) => {
      console.log(error)
      getErrorMessage(error)
      // console.log(error)
    },
  })

  return { mutate, isPending }
}
