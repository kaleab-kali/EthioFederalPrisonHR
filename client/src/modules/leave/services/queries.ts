import { useQuery } from "@tanstack/react-query";
import { fetchLeaveData, getAllLeaves } from "./api";

export const useFetchLeave = (id: string) =>
  useQuery({
    queryKey: ["leave", id],
    queryFn: () => fetchLeaveData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllLeaves() {
  return useQuery({
    queryKey: ["leaves"],
    queryFn: getAllLeaves,
  });
}
