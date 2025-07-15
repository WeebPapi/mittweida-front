import React, { useState } from "react"
import { Link } from "react-router"
import { BiPoll } from "react-icons/bi"
import { MdPeopleAlt } from "react-icons/md"
import { IoExit } from "react-icons/io5"
import { leaveGroup } from "@/api/group.actions"

interface Props {
  setDisplayMembers: React.Dispatch<React.SetStateAction<boolean>>
  groupId: string
}

const MiniNavbar: React.FC<Props> = ({ setDisplayMembers, groupId }) => {
  const handleGroupLeave = async () => {
    await leaveGroup(groupId)
    window.location.reload()
  }
  return (
    <div className="flex justify-end fixed right-1">
      <div className=" bg-white rounded-4xl p-app flex gap-4 shadow">
        <Link to={"/group/create-poll"}>
          <div className="bg-indigo-600 w-fit p-1 rounded-full">
            <BiPoll size={24} color="white" />
          </div>
        </Link>
        <div
          onClick={() => {
            setDisplayMembers((prev) => !prev)
          }}
          className=" bg-yellow-300 p-1 rounded-4xl"
        >
          <MdPeopleAlt size={24} color="white" />
        </div>
        <div onClick={handleGroupLeave} className=" bg-red-700 p-1 rounded-4xl">
          <IoExit size={24} color="white" />
        </div>
      </div>
    </div>
  )
}

export default MiniNavbar
