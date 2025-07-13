import useSWR from "swr"
import { fetcher } from "./swr"
import type { Activity } from "./db.types"

export const getRandomActivities = (limit: number = 4) => {
  try {
    const activitiesRequest = useSWR<Activity[]>(
      `/activities/random?limit=${limit}`,
      fetcher,
      {
        revalidateOnFocus: false,
      }
    )
    return activitiesRequest
  } catch (error) {
    console.error(error)
  }
}
export const getAllActivities = () => {
  try {
    const activitiesRequest = useSWR<Activity[]>(`/activities`, fetcher, {
      revalidateOnFocus: false,
    })
    return activitiesRequest
  } catch (error) {
    console.error(error)
  }
}
