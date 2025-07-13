import { getCurrentUser, getGroupOfUser } from "@/api/auth.actions"
import { createPoll, getMostRecentPollInGroup } from "@/api/group.actions"
import ActivitySelectPoll from "@/components/ActivitySelectPoll"
import React, { useState } from "react"
import VotePoll from "./VotePoll"

const PollCreation = () => {
  const { data, isLoading } = getCurrentUser()!
  const { data: groupData } = getGroupOfUser()!
  const { data: pollData } = getMostRecentPollInGroup(groupData?.id!)!

  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const handlePollCreation = async () => {
    if (selectedActivities.length <= 1) {
      window.alert("Please pick 2-3 activities")
    } else {
      const response = await createPoll(groupData?.id!, selectedActivities)
      if (response.success) window.location.reload()
    }
  }

  if (isLoading) return <p>Loading...</p>

  if (pollData) return <VotePoll />

  return (
    <main className="w-full h-full flex justify-center items-center relative">
      <ActivitySelectPoll
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
      />
      <div
        onClick={handlePollCreation}
        className="fixed bottom-0  p-app rounded-3xl bg-teal-400 flex justify-center items-center text-white font-semibold text-[20px]"
      >
        Proceed
      </div>
    </main>
  )
}

export default PollCreation
