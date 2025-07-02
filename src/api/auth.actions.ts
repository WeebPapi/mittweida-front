import useSWR from "swr"

import { SignInData, type SignInDataType } from "./interfaces"
import * as z from "zod"
import { axiosInstance, fetcher } from "./swr"

export const signIn = (formData: SignInDataType) => {
  const validatedData = SignInData.parse(formData)
  axiosInstance
    .post("/auth/login", validatedData)
    .then((res) => console.log(res))
}

export const getCurrentUser = () => {
  return useSWR("/users/profile", fetcher)
}
