import type { GroupMember } from "@/api/db.types"
import React, { useEffect, useState } from "react"
import { RxCross1 } from "react-icons/rx"

interface Props {
  members: GroupMember[]
  setDisplayMembers: React.Dispatch<React.SetStateAction<boolean>>
}
const MembersList: React.FC<Props> = ({ members, setDisplayMembers }) => {
  const [users, setUsers] = useState(members.map((member) => member.user))
  //TODO: Implement some form of fetching of users from their userIds to display group members here
  useEffect(() => {
    setUsers(members.map((member) => member.user))
  }, [members])
  if (members)
    return (
      <div className="fixed z-50 w-full h-full flex flex-col bg-white">
        <RxCross1
          size={24}
          className="absolute right-6 z-60"
          onClick={() => {
            setDisplayMembers(false)
          }}
        />
        {users.map((user) => (
          <div key={user?.id}>
            <img
              className="w-[80px] h-[80px] object-cover rounded-full"
              src={user?.profilePicture || "https://placehold.co/80"}
            />
            <p>{user?.firstName}</p>
          </div>
        ))}
      </div>
    )
}

export default MembersList
