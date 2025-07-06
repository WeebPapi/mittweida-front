import type { Group } from "@/api/db.types"
import React from "react"

interface Props {
  group: Group
}

const GroupFeed: React.FC<Props> = ({ group }) => {
  return (
    <div>
      <h1 className="text-4xl">{group.name}</h1>
    </div>
  )
}

export default GroupFeed
