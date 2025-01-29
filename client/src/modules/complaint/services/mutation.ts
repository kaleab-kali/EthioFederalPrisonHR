import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import { createComplaint} from "./api";

export function useCreateComplaint() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      setLoading(true);
      return await createComplaint(data);
    },
    onError: (error: any) => {
      console.error("Error:", error);

      toast.error(error.message || "Failed to create complaint");
      setLoading(false);
    },
    onSuccess: () => {
      toast.success("Complaint registered successfully");
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}


