import useSWR from "swr"
import { useLocation } from "react-router"

import {
  SignInData,
  SignUpData,
  type SignInDataType,
  type SignUpDataType,
} from "./interfaces"
import { axiosInstance, fetcher } from "./swr"
import type { Group, User } from "./db.types"
import type { ProfileUpdate } from "@/pages/profile-update.interface"
import axios, { AxiosError } from "axios"

export const signIn = async (formData: SignInDataType) => {
  const validatedData = SignInData.parse(formData)
  try {
    const request = await axiosInstance.post("/auth/login", validatedData)
    console.log(request)
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
  console.error(returnVal.error)

  return returnVal
}

export const getGroupOfUser = () => {
  const user = getCurrentUser()
  if (user.data?.groups!.length! > 0) {
    const groupId = user.data?.groups![0].groupId
    const returnVal = useSWR<Group>(`/groups/${groupId}`)

    return returnVal
  }
}

export const updateProfile = async (updateInfo: ProfileUpdate) => {
  try {
    const response = await axios.put("/users/profile", updateInfo, {
      baseURL:
        import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
      withCredentials: true,
    })
    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }

    return { success: false }
  }
}
