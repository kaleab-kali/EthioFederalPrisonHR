import { useQuery } from "@tanstack/react-query";
import {
  fetchCenterData,
  fetchDepartmentData,
  fetchLeaveData,
  fetchPositionData,
  fetchTitleData,
  getAllCenters,
  getAllDepartments,
  getAllLeaves,
  getAllPositions,
  getAllTitles,
} from "./api";

export const useFetchCenter = (id: string) =>
  useQuery({
    queryKey: ["center", id],
    queryFn: () => fetchCenterData(id),
    enabled: !!id, // Ensures the query runs only when ID is available
  });
export function useAllCenters() {
  return useQuery({
    queryKey: ["centers"],
    queryFn: getAllCenters,
  });
}
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