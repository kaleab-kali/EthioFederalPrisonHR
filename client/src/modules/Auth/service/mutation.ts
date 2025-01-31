import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../../../common/components/context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { createFirstTimePasswordEmployee, forgotPasswordRequest, loginEmployee } from "./api";
import { useAuth } from "../../../common/components/context/AuthContex";

export const useFirstTimePasswordEmployeeMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  // const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (passw: any) => {
      setLoading(true);
      return createFirstTimePasswordEmployee(passw);
    },
    onError: (error: any) => {
      console.log("error");
      toast.error(
        error.messageerror.message || "Failed to create new password"
      );
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      navigate("/login");
      toast.success("Set new password successfully!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        // await queryClient.invalidateQueries({ queryKey: ["request"] });
      }
    },
  });
};


export const useLoginMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: { userName: string; password: string }) => {
      setLoading(true);
        return await loginEmployee(values.userName, values.password);
    },
    onError: (error: any) => {
      console.log("error");
      toast.error(error.message || "Failed to login");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      login(data.token, data.role, data.name, data?.empId, data?.id, data?.centerName);
      navigate("/");
      toast.success("Login successful!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
};

export const useForgetPasswordRequestMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  //   const { login } = useAuth();
  //   const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userName: string) => {
      setLoading(true);
      return forgotPasswordRequest(userName);
    },
    onError: (error: any) => {
      console.log("error");
      toast.error(error.message || "Failed to send reset password");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      toast.success("Sent Request successfully!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["request"] });
      }
    },
  });
};