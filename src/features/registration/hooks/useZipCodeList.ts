"use client"
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"

export const useZipCodeList = () => {
  // const companyId = localStorage.getItem("selected-company-id")

  const { data: zipCodeList, isPending,mutate } = useMutation({
    mutationKey: ["zip-code-list"],
    mutationFn: async (zipCode: string | null) =>
      (await api.post(`/invite-link/zip_code_match?zip_code=${zipCode}`)).data,
    retry: 2,
  })

  return { zipCodeList, isPending ,mutate}
}
