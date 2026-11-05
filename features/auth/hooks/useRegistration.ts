import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { authService } from "@/features/auth/services/auth.service";
import type { RegistrationPayload } from "@/types/auth";

function getResponseMessage(error: unknown): string | undefined {
  if (!isAxiosError(error)) return undefined;

  const responseData: unknown = error.response?.data;
  if (
    typeof responseData === "object" &&
    responseData !== null &&
    "message" in responseData &&
    typeof responseData.message === "string"
  ) {
    return responseData.message;
  }

  return undefined;
}

export function useRegistration() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegistrationPayload) => authService.register(payload),
    onSuccess: (response, variables) => {
      const isSuccess = response.statusCode === 200;

      if (isSuccess) {
        toast.success(response.message || "Account created successfully!");

        // Pass registration data via query params
        const params = new URLSearchParams();
        if (variables.email) params.set("email", variables.email);
        if (variables.fName) params.set("firstName", variables.fName);
        if (variables.lName) params.set("lastName", variables.lName);

        router.push(`/welcome-letter?${params.toString()}`);
      } else {
        toast.error(response.message || "Registration failed. Please try again.");
      }
    },
    onError: (error: unknown) => {
      console.error("Registration error:", error);
      toast.error(getResponseMessage(error) || "Registration failed. Please try again.");
    },
  });
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => authService.getCountries(),
  });
}

export function useValidateReferral() {
  return useMutation({
    mutationFn: (referralId: string) => authService.validateReferral(referralId),
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        toast.success("Referral ID validated successfully!");
      } else {
        toast.error(response.message || "Referral ID not found");
      }
    },
    onError: () => {
      toast.error("Invalid referral ID");
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: ({ userid, password }: { userid: string; password: string }) =>
      authService.sendOtp(userid, password),
    onSuccess: (response) => {
      toast.success(response.message || "OTP sent successfully!");
    },
    onError: (error: unknown) => {
      const errorMessage = getResponseMessage(error);
      // Suppress the specific 401 error message about incorrect credentials
      if (errorMessage !== "Details are incorrect, please enter correct credentials.") {
        toast.error(errorMessage || "Failed to send OTP. Please try again.");
      }
    },
  });
}
