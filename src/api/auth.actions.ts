import useSWR from "swr"

import {
  SignInData,
  SignUpData,
  type SignInDataType,
  type SignUpDataType,
} from "./interfaces"
import { axiosInstance, fetcher } from "./swr"
import type { AxiosError } from "axios"

export const signIn = async (formData: SignInDataType) => {
  const validatedData = SignInData.parse(formData)
  try {
    await axiosInstance.post("/auth/login", validatedData)
    return { success: true }
  } catch (error: any) {
    return { success: false, error }
  }
}

export const signUp = async (formData: SignUpDataType) => {
  const validatedData = SignUpData.parse(formData)
  try {
    await axiosInstance.post("/auth/register", validatedData)
    return { success: true }
  } catch (error: any) {
    return { success: false, error }
  }
}

export const getCurrentUser = () => {
  return useSWR("/users/profile", fetcher)
}
