import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import {
  submitDepartmentForm,
  submitPositionForm,
  submitTitleForm,
  updateDepartmentData,
  updatePositionData,
  updateTitleData,
} from "./api";

// Mutation for creating an Department
export function useSubmitDepartment() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitDepartmentForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Department");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Department created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateDepartment(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateDepartmentData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Department");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({
        queryKey: ["department", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

export function useSubmitTitle() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitTitleForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Title");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Title created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["titles"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateTitle(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateTitleData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Title");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Title updated successfully");
      queryClient.invalidateQueries({ queryKey: ["titles"] });
      queryClient.invalidateQueries({
        queryKey: ["title", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

export function useSubmitPosition() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitPositionForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Position");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Position created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdatePosition(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updatePositionData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Position");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Position updated successfully");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({
        queryKey: ["position", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

// Mutation for deleting/deactivating an Department
