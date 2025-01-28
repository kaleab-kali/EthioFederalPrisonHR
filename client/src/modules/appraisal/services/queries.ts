import { useQuery } from "@tanstack/react-query";
import { fetchAppraisalData, getAllAppraisals } from "./api";

export const useFetchAppraisal = (id: string) =>
  useQuery({
    queryKey: ["appraisal", id],
    queryFn: () => fetchAppraisalData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllAppraisals() {
  return useQuery({
    queryKey: ["appraisals"],
    queryFn: getAllAppraisals,
  });
}
