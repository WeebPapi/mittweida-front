import useSWR from "swr"
import { useLocation } from "react-router"

import {
  SignInData,
  SignUpData,
  type SignInDataType,
  type SignUpDataType,
} from "./interfaces"
import { axiosInstance, fetcher } from "./swr"
import type { User } from "./db.types"

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
  const location = useLocation()
  const returnVal = useSWR<User>("/users/profile", fetcher)
  if (returnVal.error)
    setTimeout(() => (window.location.href = location.pathname), 2000)
  return returnVal
}
