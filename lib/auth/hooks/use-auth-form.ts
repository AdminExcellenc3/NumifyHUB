"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import type { SignUpFormData } from "../validation";
import { authService } from "../services/auth-service";
import { AUTH_MESSAGES, AUTH_ROUTES } from "../constants";

export function useAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (values: SignUpFormData) => {
    setIsLoading(true);

    try {
      const { user, error } = await authService.signUp({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        companyName: values.companyName,
        phoneNumber: values.phoneNumber,
      });

      if (error) throw error;

      if (user) {
        toast({
          title: AUTH_MESSAGES.REGISTRATION_SUCCESS,
          description: AUTH_MESSAGES.CHECK_EMAIL,
        });
        router.push(AUTH_ROUTES.LOGIN);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registratie mislukt",
        description: error.message || "Er is een onverwachte fout opgetreden.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignUp,
  };
}