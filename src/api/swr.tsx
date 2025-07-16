import axios, { AxiosError } from "axios"
import type { ReactNode } from "react"
import { SWRConfig } from "swr"

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://mittweida-back.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error?.config!
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      try {
        await axiosInstance.post("/auth/refresh-token").then(() => {
          return axiosInstance(originalRequest)
        })
      } catch (refreshError) {
        window.location.href = "/auth/"
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export const fetcher = async (url: string) => {
  return axiosInstance.get(url).then((res) => res.data)
}

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetcher(url) }}>
      {children}
    </SWRConfig>
  )
}
