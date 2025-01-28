import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData, getAllEmployees } from "./api";

export const useFetchEmployee = (id: string) =>
  useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployeeData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
}
