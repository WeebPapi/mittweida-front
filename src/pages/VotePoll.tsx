import type { Poll } from "@/api/db.types"
import { voteOnPoll } from "@/api/group.actions"
import VotableActivity from "@/components/VotableActivity"
import VoteTally from "@/components/VoteTally"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface Props {
  poll: Poll
  userId: string
}

const VotePoll: React.FC<Props> = ({ poll, userId }) => {
  const [selected, setSelected] = useState<string>("")
  const [expired, setExpired] = useState(false)
  const [voted, setVoted] = useState(
    !!poll.votes?.find((vote) => vote.userId === userId)
  )
  const [seconds, setSeconds] = useState(
    Math.floor(
      (new Date(poll.expiresAt).getTime() - new Date().getTime()) / 1000
    )
  )
  const navigate = useNavigate()

  const handlePollVote = async () => {
    if (selected && !voted) {
      await voteOnPoll(poll.id, selected)
      setVoted(true)
    }
  }

  useEffect(() => {
    const decrementTimer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) setExpired(true)
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(decrementTimer)
    }
  }, [])
  useEffect(() => {
    setVoted(!!poll.votes?.find((vote) => vote.userId === userId))
  }, [poll])

  if (expired) navigate("/group")

  return (
    <main className=" w-full h-max mt-24">
      <div className="flex flex-col justify-between items-center gap-4 min-h-[100vh] w-full relative">
        <div>
          <h1 className="text-3xl">Pick one activity and vote</h1>
          {poll.options && (
            <VoteTally title={"Current Votes:"} options={poll.options} />
          )}
          <h2 className="text-2xl">Time Left: {seconds}s</h2>
        </div>
        {poll.options?.map((pollOption) => (
          <VotableActivity
            key={pollOption.activity?.id!}
            name={pollOption.activity?.name!}
            imgUrl={
              pollOption.activity?.imageUrl || "https://placehold.co/300x200"
            }
            address={pollOption.activity?.address!}
            category={pollOption.activity?.category!}
            id={pollOption.id!}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

        <div
          style={{ backgroundColor: voted ? "gray" : "#560591" }}
          onClick={handlePollVote}
          className="w-full fixed bottom-0  p-app rounded-3xl bg-primary-indigo flex justify-center items-center text-white font-semibold text-[20px]"
        >
          Vote
        </div>
      </div>
    </main>
  )
}

export default VotePoll
