import { getRandomActivities } from "@/api/activities.actions"
import { getCurrentUser } from "@/api/auth.actions"
import type { Activity } from "@/api/db.types"
import { fetcher } from "@/api/swr"
import ActivityCard from "@/components/ActivityCard"
import ActivityFiltration from "@/components/ActivityFiltration"
import { useGeolocation } from "@/hooks/useGeolocation"
import { useState } from "react"
import useSWR from "swr"

const HomePage = () => {
  const { error } = getCurrentUser()
  const [toggleFilters, setToggleFilters] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  useGeolocation()
  const { data: activities, error: activitiesError } = !toggleFilters
    ? getRandomActivities()!
    : useSWR<Activity[]>(newUrl, fetcher)
  if (error || activitiesError) return null

  return (
    <main className="h-full mt-16">
      <ActivityFiltration
        setToggleFilters={setToggleFilters}
        setNewUrl={setNewUrl}
      />
      <div className="flex flex-col justify-center items-center h-full gap-10 py-6">
        {activities?.map((activity) => (
          <ActivityCard
            key={activity.id}
            name={activity.name}
            description={activity.description}
            imgUrl={activity.imageUrl || "https://placehold.co/300x200"}
            address={activity.address}
            category={activity.category}
            openHours={activity.openHours!}
            id={activity.id}
          />
        ))}
      </div>
    </main>
  )
}

export default HomePage
