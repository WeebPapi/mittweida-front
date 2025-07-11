import { getCurrentUser } from "@/api/auth.actions"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
import React, { useState } from "react"

const ProfilePage: React.FC = () => {
  const { data, error, isLoading } = getCurrentUser()

  if (isLoading) return <p>Loading...</p>
  else if (error) return null

  const [editMode, setEditMode] = useState<
    "Picture" | "Name" | "Email" | "Password" | "None"
  >("None")
  return (
    <div className="max-w-md mx-auto p-app mt-24 bg-white rounded-lg shadow-lg h-full flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-4">
        <span className="flex items-center relative">
          <img
            className="rounded-full object-cover w-[200px] h-[200px]"
            width={200}
            height={200}
            src={data?.profilePicture || "https://placehold.co/200"}
          />
          <PencilIcon className="absolute right-[-50px]" />
        </span>
        <span className="flex items-center relative">
          <h1 className="text-3xl w-[200px] text-center">
            {data?.firstName + " " + data?.lastName}
          </h1>
          <PencilIcon className="absolute right-[-50px]" />
        </span>
      </div>
      <div className="flex flex-col w-[200px] gap-8 items-center">
        <span className="flex items-center relative">
          <h1 className="text-xl  text-center">{data?.email}</h1>
          <PencilIcon className="absolute right-[-50px]" />
        </span>
        <span className="flex items-center relative">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="text-lg p-8 text-center"
          >
            Change your password
          </Button>
        </span>
      </div>
    </div>
  )
}

export default ProfilePage
