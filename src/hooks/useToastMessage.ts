// hooks/useToastMessage.ts
import { useToast } from "../lib/useToast"

export type AxiosErrorType = {
  response?: {
    data?: {
      detail?: string | { msg: string }[];
      message?: string;
    };
    status?: number;
  };
  message?: string;
  code?: string;
};

export function useToastMessage() {
  const { toast } = useToast();

  function getSuccessMessage(message?: string) {
    toast({
      variant: "success",
      title: "Success",
      description: message || "Success!",
      duration:3000
    });
  }

  function getErrorMessage(error: AxiosErrorType) {
    const detail = error?.response?.data?.detail;

    if (detail) {
      if (typeof detail === "string") {
        toast({
          variant: "error",
          title: "Error",
          description: detail,
           duration:3000
        });
        return;
      }

      if (Array.isArray(detail)) {
        const messages = detail.map((item) => item.msg).join(", ");
        toast({
          variant: "error",
          title: "Error",
          description: messages,
           duration:3000
        });
        return;
      }
    }

    if (error?.response?.data?.message) {
      toast({
        variant: "error",
        title: "Error",
        description: error.response.data.message,
         duration:3000
      });
      return;
    }

    if (error?.message) {
      toast({
        variant: "error",
        title: "Error",
        description: error.message,
         duration:3000
      });
      return;
    }

    toast({
      variant: "error",
      title: "Error",
      description: "An unknown error occurred. Please try again later.",
       duration:3000
    });
  }

  return { getSuccessMessage, getErrorMessage };
}
