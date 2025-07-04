import { getRandomActivities } from "@/api/activities.actions"
import { getCurrentUser } from "@/api/auth.actions"
import ActivityCard from "@/components/ActivityCard"
import ActivityFiltration from "@/components/ActivityFiltration"

const HomePage = () => {
  const { error } = getCurrentUser()
  const { data: activities, error: activitiesError } = getRandomActivities()!
  if (error || activitiesError) return null
  return (
    <main className="h-full">
      <h1>Hello</h1>
      <ActivityFiltration />
      <div className="flex flex-col justify-center items-center h-full gap-10 py-16">
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
