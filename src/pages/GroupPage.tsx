import React, { useEffect, useState } from "react"
import { getGroupOfUser } from "@/api/auth.actions"
import GroupFeed from "@/components/GroupFeed"
import JoinGroup from "@/components/JoinGroup"

const GroupPage = () => {
  const groupData = getGroupOfUser()
  const [userGroup, setUserGroup] = useState(groupData?.data || null)
  useEffect(() => {
    if (groupData) setUserGroup(groupData.data!)
  }, [groupData])
  if (groupData && groupData.isLoading) return <p>Loading...</p>
  if (groupData && groupData.error) return null

  return (
    <main className="h-full">
      {userGroup ? <GroupFeed group={userGroup} /> : <JoinGroup />}
    </main>
  )
}

export default GroupPage
