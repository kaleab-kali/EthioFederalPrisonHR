import { useQuery } from "@tanstack/react-query";
import { getAllComplaints, getComplaintById } from "./api";

export const useFetchComplaint = (id: string, centerName: string) =>
  useQuery({
    queryKey: ["complaint", id],
    queryFn: () => getComplaintById(id, centerName),
    enabled: !!id,
  });
export function useAllComplaints(centerName: string) {
  return useQuery({
    queryKey: ["complaint"],
    queryFn: async () => {
      const data = await getAllComplaints(centerName);
      return data;
    },
  });
}
