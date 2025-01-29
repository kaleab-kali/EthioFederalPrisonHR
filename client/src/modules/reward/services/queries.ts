import { useQuery } from "@tanstack/react-query";
import { fetchRewardData, getAllRaises, getAllRewards } from "./api";

export const useFetchReward = (id: string) =>
  useQuery({
    queryKey: ["reward", id],
    queryFn: () => fetchRewardData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllRewards() {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: getAllRewards,
  });
}

export function useAllRaises() {
  return useQuery({
    queryKey: ["raises"],
    queryFn: getAllRaises,
  });
}
