import { useQuery } from "@tanstack/react-query";
import { fetchRetirementData, getAllRetirements } from "./api";

export const useFetchRetirement = (id: string) =>
  useQuery({
    queryKey: ["retirement", id],
    queryFn: () => fetchRetirementData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllRetirements() {
  return useQuery({
    queryKey: ["retirements"],
    queryFn: getAllRetirements,
  });
}
