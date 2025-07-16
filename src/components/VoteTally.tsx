import type { PollOption, Activity } from "@/api/db.types"
import React, { useEffect, useState } from "react"

interface Props {
  title: string
  options: PollOption[]
}

const VoteTally: React.FC<Props> = ({ title, options }) => {
  const [counts, setCounts] = useState(
    options.map((option) => option.votes?.length || 0)
  )

  const truncateName = (name: string) => {
    if (name.length > 6) return name.slice(0, 4) + ".."
    return name
  }

  useEffect(() => {
    if (options) {
      setCounts(options.map((option) => option.votes?.length || 0))
    }
  }, [options])

  return (
    <div className=" p-app rounded-2xl bg-white shadow flex justify-between gap-4 items-center">
      <h3 className="text-[12px] font-semibold">{title}</h3>
      <div className="flex items-center gap-3">
        {options.map((option, index) => {
          const rawDisplayName =
            option.activity?.name || option.text || "Unknown"

          const firstWord = rawDisplayName.split(" ")[0]

          const truncatedDisplayName = truncateName(firstWord)

          return (
            <div className="flex items-center" key={option.id}>
              {}
              <p className="max-w-[65px] text-[10px]">
                {`${truncatedDisplayName}:`}
              </p>
              <p className="text-[10px]">{counts[index]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VoteTally
