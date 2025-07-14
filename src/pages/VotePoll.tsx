import type { Poll } from "@/api/db.types"
import SelectableActivityCard from "@/components/SelectableActivityCard"
import VotableActivity from "@/components/VotableActivity"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface Props {
  poll: Poll
  userId: string
}

const VotePoll: React.FC<Props> = ({ poll, userId }) => {
  const [selected, setSelected] = useState<string>("")
  const [expired, setExpired] = useState(false)
  const [seconds, setSeconds] = useState(
    Math.floor(
      (new Date(poll.expiresAt).getTime() - new Date().getTime()) / 1000
    )
  )
  const navigate = useNavigate()

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

  if (expired) navigate("/group")

  return (
    <main className=" w-full h-max mt-24">
      <div className="flex flex-col justify-between items-center gap-4 min-h-[100vh] w-full">
        <h1>Time Left: {seconds}s</h1>
        {poll.options?.map(({ activity }) => (
          <VotableActivity
            key={activity?.id!}
            name={activity?.name!}
            imgUrl={activity?.imageUrl || "https://placehold.co/300x200"}
            address={activity?.address!}
            category={activity?.category!}
            id={activity?.id!}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </main>
  )
}

export default VotePoll
