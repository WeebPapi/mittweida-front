import axios from "axios"

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
