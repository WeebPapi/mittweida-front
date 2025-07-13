import { getAllActivities } from "@/api/activities.actions"
import React from "react"
import ActivityCard from "./ActivityCard"
import SelectableActivityCard from "./SelectableActivityCard"

interface Props {
  selectedActivities: string[]
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}

const ActivitySelectPoll: React.FC<Props> = ({
  selectedActivities,
  setSelectedActivities,
}) => {
  const { data, isLoading } = getAllActivities()!
  if (isLoading) return <p>Loading...</p>
  return (
    <div className="mt-16">
      <h1 className="text-2xl">Select 3 activities</h1>
      <div className="flex flex-col justify-center items-center h-full gap-10 py-6">
        {data?.map((activity) => (
          <SelectableActivityCard
            key={activity.id}
            name={activity.name}
            description={activity.description}
            imgUrl={activity.imageUrl || "https://placehold.co/300x200"}
            address={activity.address}
            category={activity.category}
            openHours={activity.openHours!}
            id={activity.id}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />
        ))}
      </div>
    </div>
  )
}

export default ActivitySelectPoll
