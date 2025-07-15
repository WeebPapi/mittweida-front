import type { PollOption } from "@/api/db.types"
import React, { useEffect, useState } from "react"

interface Props {
  title: string
  options: PollOption[]
}

const VoteTally: React.FC<Props> = ({ title, options }) => {
  const [counts, setCounts] = useState(
    options.map((option) => option.votes?.length)
  )

  useEffect(() => {
    if (options) setCounts(options.map((option) => option.votes?.length))
  }, [options])
  return (
    <div className=" p-app rounded-2xl bg-white shadow flex justify-between gap-4 items-center">
      <h3 className="text-[12px] font-semibold">{title}</h3>
      <div className="flex items-center gap-3">
        {options.map((option, index) => (
          <div className="flex items-center" key={option.id}>
            <p className="max-w-[65px] text-[10px]">
              {option.activity?.name.split(" ")[0]}:
            </p>
            <p className="text-[10px]">{counts[index]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VoteTally
