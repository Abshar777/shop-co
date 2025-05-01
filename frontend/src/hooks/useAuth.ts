"use client";
import loginSchema from "@/schema/loginSchema";
// import { login, signUp, verifyOtp } from "@/api/auth";
import { useMutationData } from "./useMutation";
import { useZodFormV2 } from "./useZodForm";

import { signIn } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import signUpSchema from "@/schema/signUpSchema";
import { ZodTypeAny } from "zod";
import { ZodString } from "zod";
import { ZodObject } from "zod";

export const useAuth = (type: "login" | "signup" = "login") => {
  const schema = (type !== "login" ? signUpSchema : loginSchema) as ZodObject<{
    email: ZodString;
    password: ZodString;
  }, "strip", ZodTypeAny, {
    email: string;
    password: string;
    name: string;
  }, {
    email: string;
    password: string;
    name: string;
  }>;
  const defaultValues = type === "login" ? { email: "", password: "" } : { email: "", password: "", name: "", role: "" }
  const { form, control, errors, onFormSubmit } = useZodFormV2(schema, () => { }, defaultValues as any, { mode: "onSubmit", showToastOnError: true });
  const { mutate, isPending, error: mutationError, isSuccess } = useMutationData(['user'],
    async (data: any) => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })
    },
    ["user"],
    onSubmit
  )

  function onSubmit(response: any) {
    console.log(response)
  }
  return { form, control, errors, onFormSubmit, mutate, isPending, error: mutationError, isSuccess }

}

