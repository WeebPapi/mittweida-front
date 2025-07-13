import type { GroupMember } from "@/api/db.types"
import React, { useEffect } from "react"
import { RxCross1 } from "react-icons/rx"

interface Props {
  members: GroupMember[]
  setDisplayMembers: React.Dispatch<React.SetStateAction<boolean>>
}
const MembersList: React.FC<Props> = ({ members, setDisplayMembers }) => {
  //TODO: Implement some form of fetching of users from their userIds to display group members here
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
        {members.map((member) => (
          <div key={member.id}>
            <img
              src={member.user?.profilePicture || "https://placehold.co/100"}
            />
            <p>{member.user?.firstName}</p>
          </div>
        ))}
      </div>
    )
}

export default MembersList
