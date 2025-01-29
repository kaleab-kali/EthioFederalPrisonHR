import { useQuery } from "@tanstack/react-query";
import { fetchAppraisalData, fetchAppraisalHistoryData, getAllAppraisalHistories, getAllAppraisals } from "./api";

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

export const useFetchAppraisalHistory = (id: string) =>
  useQuery({
    queryKey: ["appraisalHistory", id],
    queryFn: () => fetchAppraisalHistoryData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllAppraisalHistories() {
  return useQuery({
    queryKey: ["appraisalHistorys"],
    queryFn: getAllAppraisalHistories,
  });
}
