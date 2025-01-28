import { useQuery } from "@tanstack/react-query";
import { getAllComplaints } from "./api";

export const useFetchComplaint = (id: string) =>
  useQuery({
    queryKey: ["complaint", id],
    queryFn: () => getAllComplaints(),
    enabled: !!id, 
  });
export function useAllComplaints() {
  return useQuery({
    queryKey: ["complaint"],
    queryFn: getAllComplaints,
  });
}
