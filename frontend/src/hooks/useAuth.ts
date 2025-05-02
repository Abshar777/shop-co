"use client";
import loginSchema from "@/schema/loginSchema";
import { useMutationData } from "./useMutation";
import { useZodFormV2 } from "./useZodForm";
import { signIn } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import signUpSchema from "@/schema/signUpSchema";
import { IAuthSchema } from "@/types";
import { signUp } from "@/api/auth";
import { login } from "@/api/auth";
import { IApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export const useAuth = (type: "login" | "signup" = "login") => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = (type !== "login" ? signUpSchema : loginSchema) as IAuthSchema;

  const defaultValues = type === "login" ? { email: "", password: "" } : { email: "", password: "", name: "", role: "" };

  const apiFn = type === "login" ? login : signUp;


  const router = useRouter();

  const { mutate, isPending, error: mutationError, isSuccess } = useMutationData(['user'],
    (data: any) => apiFn(data),
    ["user"],
    onSubmit
  )

  useEffect(() => {
    if (isPending) setIsLoading(true);
    if (mutationError) setIsLoading(false);
  }, [isPending, mutationError]);

  const { form, control, errors, onFormSubmit, reset } = useZodFormV2(schema, (data: any) => mutate(data), defaultValues as any, { mode: "onSubmit", showToastOnError: true });

  async function onSubmit(data: IApiResponse) {
    try {
      await signIn("credentials", {
        email: data.user.email,
        token: data.accessToken,
        id: data.user._id,
        name: data.user.name,
        redirect: false
      })
      const message = type === "login" ? "Login successful" : "Signup successful";
      toast.success(message);
      router.push("/home/profile");
      reset();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return { form, control, errors, onFormSubmit, mutate, isPending: isLoading, error: mutationError, isSuccess }

}

