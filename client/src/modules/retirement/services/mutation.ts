import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import { submitRetirementForm, updateRetirementData } from "./api";

// Mutation for creating an Retirement
export function useSubmitRetirement() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      return await submitRetirementForm(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      console.log(process.env.REACT_APP_API_URL + "heheheheh");

      toast.error(error.message || "Failed to create Retirement");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Retirement created successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["retirements"] });
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

// Mutation for updating an Retirement
export function useUpdateRetirement(
  options?: UseMutationOptions<void, Error, { id: string; data: any }, unknown>
) {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return await updateRetirementData(id, data);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.message || "Failed to update Retirement");
      setLoading(false);
    },
    onSuccess: (_, variables) => {
      toast.success("Retirement updated successfully");
      queryClient.invalidateQueries({ queryKey: ["retirements"] });
      queryClient.invalidateQueries({
        queryKey: ["retirement", { id: variables.id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    ...options,
  });
}

// Mutation for deleting/deactivating an Retirement
