import useSWR from "swr"

import {
  SignInData,
  SignUpData,
  type SignInDataType,
  type SignUpDataType,
} from "./interfaces"
import { axiosInstance, fetcher } from "./swr"

export const signIn = (formData: SignInDataType) => {
  const validatedData = SignInData.parse(formData)
  axiosInstance.post("/auth/login", validatedData)
}

export const signUp = (formData: SignUpDataType) => {
  const validatedData = SignUpData.parse(formData)
  axiosInstance
    .post("/auth/register", validatedData)
    .then((res) => console.log(res))
}

export const getCurrentUser = () => {
  return useSWR("/users/profile", fetcher)
}
