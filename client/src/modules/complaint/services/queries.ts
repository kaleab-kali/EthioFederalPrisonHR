import { useQuery } from "@tanstack/react-query";
import { getAllComplaints } from "./api";

export const useFetchEmployee = (id: string) =>
  useQuery({
    queryKey: ["complaint", id],
    queryFn: () => getAllComplaints(),
    enabled: !!id, 
  });
export function useAllEmployees() {
  return useQuery({
    queryKey: ["complaint"],
    queryFn: getAllComplaints,
  });
}
