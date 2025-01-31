import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import {
  submitCenterForm,
  submitDepartmentForm,
  submitLeaveForm,
  submitPositionForm,
  submitTitleForm,
  updateCenterData,
  updateDepartmentData,
  updateLeaveData,
  updatePositionData,
  updateTitleData,
  submitSalaryLimitForm,
  updateSalaryLimitData,
  submitChangeRole,
  submitChangePassword,
  submitAddPassword,
} from "./api";
import { useAuth } from "../../../common/components/context/AuthContex";

// Mutation for creating an Department
export function useSubmitCenter() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitCenterForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Center");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Center created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["centers"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitChangeRole() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitChangeRole(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to change Role");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Role created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitAddPassword() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  const {user}=useAuth()
  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitAddPassword(data,user?.centerName || '');
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to change Password", error);
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("password created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitChangePassword() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitChangePassword(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to change Password", error);
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("password created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
export function useUpdateCenter(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateCenterData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Center");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Center updated successfully");
      queryClient.invalidateQueries({ queryKey: ["centers"] });
      queryClient.invalidateQueries({
        queryKey: ["center", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}
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

export function useSubmitLeave() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitLeaveForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Leave");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Leave created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateLeave(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateLeaveData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Leave");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Leave updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      queryClient.invalidateQueries({
        queryKey: ["leave", { id: variables.id }],
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

export function useSubmitSalaryLimit() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitSalaryLimitForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create salary limit");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("salary limit created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["salaryLimit"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateSalaryLimit(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateSalaryLimitData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update SalaryLimit");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("salary limit updated successfully");
      queryClient.invalidateQueries({ queryKey: ["salaryLimit"] });
      queryClient.invalidateQueries({
        queryKey: ["salaryLimit", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}