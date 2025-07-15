import { getCurrentUser, getGroupOfUser } from "@/api/auth.actions"
import { createPoll, getMostRecentPollInGroup } from "@/api/group.actions"
import ActivitySelectPoll from "@/components/ActivitySelectPoll"
import { useEffect, useState } from "react"
import VotePoll from "./VotePoll"
import type { SWRResponse } from "swr"
import type { Poll } from "@/api/db.types"

const PollCreation = () => {
  const { data: userData, isLoading } = getCurrentUser()!
  const { data: groupData } = getGroupOfUser()!
  const pollData = getMostRecentPollInGroup(groupData?.id!) as SWRResponse<
    Poll,
    any,
    any
  >
  const [voteOngoing, setVoteOngoing] = useState(
    new Date(pollData.data?.expiresAt!) > new Date()
  )

  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const handlePollCreation = async () => {
    if (selectedActivities.length <= 1) {
      window.alert("Please pick 2-3 activities")
    } else {
      const response = await createPoll(groupData?.id!, selectedActivities)
      if (response.success) window.location.reload()
    }
  }
  useEffect(() => {
    if (pollData.data)
      setVoteOngoing(new Date(pollData.data?.expiresAt!) > new Date())
  }, [pollData])

  if (isLoading) return <p>Loading...</p>

  if (voteOngoing)
    return <VotePoll poll={pollData.data!} userId={userData?.id!} />

  return (
    <main className="w-full h-full flex justify-center items-center relative">
      <ActivitySelectPoll
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
      />
      <div
        onClick={handlePollCreation}
        className="w-full fixed bottom-0  p-app rounded-3xl bg-primary-indigo flex justify-center items-center text-white font-semibold text-[20px]"
      >
        Proceed
      </div>
    </main>
  )
}

export default PollCreation
