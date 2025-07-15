import axios, { AxiosError } from "axios"
import type { Poll } from "./db.types"
import { axiosInstance, fetcher } from "./swr"
import useSWR from "swr"

export const uploadPhoto = async (
  file: File,
  groupId: string,
  caption?: string,
  location?: string
) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("groupId", groupId)
  if (caption) formData.append("caption", caption)
  if (location) formData.append("location", location)
  const response = await axios.post("/photos/upload", formData, {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const joinGroup = async (code: string) => {
  try {
    const response = await axios.post(
      "/groups/join",
      { code },
      {
        baseURL:
          import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
        withCredentials: true,
      }
    )

    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }

    return { success: false }
  }
}
export const leaveGroup = async (groupId: string) => {
  await axiosInstance.post(`/groups/leave/`, { groupId })
}

export const createGroup = async (name: string) => {
  try {
    const response = await axios.post(
      "/groups",
      { name },
      {
        baseURL:
          import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
        withCredentials: true,
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }

    return { success: false }
  }
}

export const createPoll = async (
  groupId: string,
  selectedActivityIds: string[],
  question: string = "Where should we go?",
  expiresAt: string = new Date(Date.now() + 90 * 1000).toISOString()
) => {
  try {
    const response = await axiosInstance.post("/polls", {
      groupId,
      selectedActivityIds,
      question,
      expiresAt,
    })
    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status, message: error.config }

    return { success: false, errorCode: 500 }
  }
}

export const getMostRecentPollInGroup = (groupId: string) => {
  try {
    const response = useSWR<Poll>(`/polls/group/${groupId}`, fetcher, {
      refreshInterval: 200,
    })

    return response
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status, message: error.config }

    return { success: false, errorCode: 500 }
  }
}

export const voteOnPoll = async (pollId: string, pollOptionId: string) => {
  try {
    const response = await axiosInstance.post(`/polls/${pollId}/vote`, {
      pollOptionId,
    })
    return { success: true, data: response.data }
  } catch (error) {
    if (error instanceof AxiosError)
      return { success: false, errorCode: error.status }
    return { success: false, errorCode: 500 }
  }
}
