"use client";

import { useQuery } from "@tanstack/react-query";
import { createApi } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useToastMessage } from "@/hooks/useToastMessage";
import { toast } from "@/lib/useToast";


export const useSubdomains = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token") || ""
    // const {getSuccessMessage} = useToastMessage()

  const api = createApi("https://hr-api.logistix.one/api");

  const { data, isLoading, error } = useQuery({
    queryKey: ["subdomains", token], 
    queryFn: async () => {
      if (!token) throw new Error("Token is required");

      const res = await api.get(`/subdomains/token/${token}`);
      return res.data;
    },
    enabled: !!token, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
  

  return { subdomains: data, isLoading, error };
};