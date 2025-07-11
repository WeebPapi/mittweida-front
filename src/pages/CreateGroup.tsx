import { getGroupOfUser } from "@/api/auth.actions"
import { createGroup } from "@/api/group.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { useNavigate } from "react-router"

const CreateGroup: React.FC = () => {
  const navigate = useNavigate()
  const group = getGroupOfUser()
  if (group?.data) navigate("/group")
  const [groupName, setGroupName] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const handleGroupCreation = async () => {
    let response
    setError(false)
    if (groupName) {
      response = await createGroup(groupName)
    }
    if (response?.success === false && response?.errorCode === 404)
      setError(true)
    else if (response?.success === true) navigate("/group")
  }
  return (
    <main className="max-w-md mx-auto p-app mt-24 bg-white rounded-lg shadow-lg h-full">
      <h1 className="text-3xl">Create your own group!</h1>
      <div className="flex flex-col justify-center h-[250px] gap-4">
        <Label>Group Name</Label>
        <Input
          placeholder="Name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value)
          }}
        />
        {error && (
          <p className="text-red-800">There was an error, please try again</p>
        )}
        <Button type="button" onClick={handleGroupCreation}>
          Create
        </Button>
      </div>
    </main>
  )
}

export default CreateGroup
