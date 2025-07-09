import React, { useEffect, useState } from "react"
import { getGroupOfUser } from "@/api/auth.actions"
import GroupFeed from "@/components/GroupFeed"
import JoinGroup from "@/components/JoinGroup"

const GroupPage: React.FC = () => {
  const groupData = getGroupOfUser()
  const [userGroup, setUserGroup] = useState(groupData?.data || null)
  const [photos, setPhotos] = useState(groupData?.data?.photos?.reverse())
  useEffect(() => {
    if (groupData) {
      setUserGroup(groupData.data!)
      setPhotos(groupData.data?.photos?.reverse())
    }
  }, [groupData])
  if (groupData && groupData.isLoading) return <p>Loading...</p>
  if (groupData && groupData.error) return null

  return (
    <main className="h-full">
      {userGroup ? (
        <GroupFeed photos={photos} group={userGroup} />
      ) : (
        <JoinGroup />
      )}
    </main>
  )
}

export default GroupPage
