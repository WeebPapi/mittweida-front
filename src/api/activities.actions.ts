import useSWR from "swr"
import { fetcher } from "./swr"
import type { Activity } from "./db.types"

export const getRandomActivities = (limit: number = 4) => {
  try {
    const activitiesRequest = useSWR<Activity[]>(
      `/activities/random?limit=${limit}`,
      fetcher
    )
    return activitiesRequest
  } catch (error) {
    console.error(error)
  }
}
