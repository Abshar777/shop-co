"use client";
import loginSchema from "@/schema/loginSchema";
import { login, signUp } from "@/api/auth";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { useModalStore } from "@/store/uiStore";
import { signIn } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import signUpSchema from "@/schema/signUpSchema";
import { IApiResponse } from "@/types/api";
import { useState, useEffect } from "react";
export const useAuth = (type: "login" | "signup" = "login") => {
  const router = useRouter()
  const schema = type === "login" ? loginSchema : signUpSchema;
  const fn = type === "login" ? login : signUp;
  const [isLoading, setIsLoading] = useState(false)
  const { mutate, isPending, error: mutationError, isSuccess } = useMutationData(['user'],
    (data) => fn(data),
    ["user"],
    onSubmit
  )

  useEffect(() => {
    if (isPending) {
      setIsLoading(true)
    }
  }, [isPending])

  const form = useZodForm(schema, mutate);
  const { register, onFormSubmit, errors, reset, getValues, setValue } = form;
  function onSubmit(response: IApiResponse) {
    signIn("credentials", {
      email: response.user.email,
      password: response.user.password,
      name: response.user.name,
      id: response.user._id,
      role: response.user.role,
      token: response.accessToken,
      refreshToken: response.refreshToken,
      redirect: false,
      verified: response.user.verified

    }).then(() => {
      setIsLoading(false)
      localStorage.setItem("loginId", getValues("email"))
      router.push("/admin/dashboard")
    }).catch((err) => {
      setIsLoading(false)
      toast.error("Something went wrong")
      console.log(err, "err")
    })

  }








  return { register, onFormSubmit, errors, reset, isPending: isLoading, mutationError, isSuccess, form, setValue }



}

