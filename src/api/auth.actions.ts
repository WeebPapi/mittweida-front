import useSWR, { type SWRResponse } from "swr"

import {
  SignInData,
  SignUpData,
  type SignInDataType,
  type SignUpDataType,
} from "./interfaces"
import { axiosInstance, fetcher } from "./swr"
import type { Group, User } from "./db.types"
import type { ProfileUpdate } from "@/pages/profile-update.interface"
import { AxiosError } from "axios"

export const getUserById = async (userId: string) => {
  const { data } = useSWR<User>(`users/${userId}`)
  return data
}

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

export const logOut = async () => {
  try {
    await axiosInstance.post("/auth/logout")

    return { success: true }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }

    return { success: false }
  }
}

export const getCurrentUser = () => {
  const returnVal = useSWR<User>("/users/profile", fetcher)

  return returnVal
}

interface GetGroupOfUserResult extends SWRResponse<Group, any> {}

export const getGroupOfUser = (): GetGroupOfUserResult => {
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = getCurrentUser()

  let groupId: string | null = null
  if (userData?.groups && userData?.groups.length! > 0) {
    groupId = userData?.groups[0].groupId
  }

  const shouldFetchGroup = !isUserLoading && !userError && groupId

  const swrResponse = useSWR<Group>(
    shouldFetchGroup ? `/groups/${groupId}` : null
  )

  return swrResponse
}

export const updateProfile = async (updateInfo: ProfileUpdate) => {
  try {
    const response = await axiosInstance.put("/users/profile", updateInfo)
    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }

    return { success: false }
  }
}
