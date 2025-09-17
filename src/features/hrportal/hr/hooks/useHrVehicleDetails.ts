
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export const useHrVehicleDetails = (id: string | null) => {
    const companyId = localStorage.getItem("selected-company-id");
  const {
    data: hrVehicle,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["hr-vehicle-details", id],
    queryFn: async () => {
      if (!id) return null;
      return (await api.get(`/vehicle-setups/${id}?company_id=${companyId}`)).data;
    },
    enabled: !!id, // id bo‘lsa query ishlaydi
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    hrVehicle,
    isLoading: isLoading || isFetching,
    refetch,
  };
};
