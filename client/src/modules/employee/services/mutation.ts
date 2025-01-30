import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import { submitDocumentForm, submitFamilyForm, submitHealthForm, submitRegistrationForm, submitTransferHandle, submitTransferRequestForm, submitWorkForm, updateEmployeeData } from "./api";

// Mutation for creating an employee
export function useSubmitRegistration() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitRegistrationForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create employee");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Employee created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitWork() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitWorkForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create work employee");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Employee work created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitDocument() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
    data.forEach((value, key) => console.log(key, value));

      setLoading(true);
      return await submitDocumentForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create work employee");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Employee work created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitFamily(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await submitFamilyForm(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update employee");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({
        queryKey: ["employee", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

export function useSubmitHealth(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await submitHealthForm(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update employee");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({
        queryKey: ["employee", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

export function useSubmitTransferRequest() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitTransferRequestForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to transfer request employee");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Employee transfer request successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useSubmitTransferHandle() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitTransferHandle(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to transfer employee");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Employee transfered successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
// Mutation for uploading a file
// export function useCreateUpload() {
//   const { setLoading } = useLoading();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: FormData) => {
//       setLoading(true);
//       return await createUpload(data);
//     },
//     onError: (error: any) => {
//       console.error("Error:", error);
//       toast.error(error.message || "Failed to upload file");
//       setLoading(false);
//     },
//     onSuccess: (data: { filePath: string; fileName: string }) => {
//       toast.success("File uploaded successfully");
//       console.log("File uploaded:", data.filePath);
//       console.log("File Name:", data.fileName);
//       setLoading(false);
//       queryClient.invalidateQueries({ queryKey: ["uploads"] });
//     },
//     onSettled: () => {
//       setLoading(false);
//     },
//   });
// }

// Mutation for updating an employee
export function useUpdateEmployee(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateEmployeeData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update employee");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({
        queryKey: ["employee", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

// Mutation for deleting/deactivating an employee
