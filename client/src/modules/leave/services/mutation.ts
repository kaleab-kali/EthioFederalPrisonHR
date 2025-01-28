import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import { submitLeaveForm, updateLeaveData } from "./api";

// Mutation for creating an Leave
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

// Mutation for updating an Leave
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

// Mutation for deleting/deactivating an Leave
