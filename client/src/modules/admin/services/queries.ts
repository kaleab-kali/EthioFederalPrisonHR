import { useQuery } from "@tanstack/react-query";
import {
  fetchDepartmentData,
  fetchPositionData,
  fetchTitleData,
  getAllDepartments,
  getAllPositions,
  getAllTitles,
} from "./api";

export const useFetchDepartment = (id: string) =>
  useQuery({
    queryKey: ["department", id],
    queryFn: () => fetchDepartmentData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });
}

export const useFetchTitle = (id: string) =>
  useQuery({
    queryKey: ["title", id],
    queryFn: () => fetchTitleData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllTitles() {
  return useQuery({
    queryKey: ["titles"],
    queryFn: getAllTitles,
  });
}

export const useFetchPosition = (id: string) =>
  useQuery({
    queryKey: ["position", id],
    queryFn: () => fetchPositionData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllPositions() {
  return useQuery({
    queryKey: ["positions"],
    queryFn: getAllPositions,
  });
}
