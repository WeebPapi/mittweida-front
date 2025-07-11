import React, { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import Separator from "./Separator"
import { joinGroup } from "@/api/group.actions"
import { Link } from "react-router"

const JoinGroup: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const handleJoin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setError(false)
    const response = await joinGroup(inputValue)
    if (response.success === true) window.location.reload()
    else if (response.errorCode === 404) setError(true)
  }

  return (
    <>
      <h1 className="text-2xl">Join a group or create your own!</h1>
      <div className="flex flex-col justify-center h-full p-app">
        <div className="flex flex-col gap-2 mb-6">
          <Label htmlFor="groupcode">Join Code</Label>
          <div className="flex gap-2">
            <Input
              maxLength={6}
              className="w-[150px]"
              name="groupcode"
              placeholder="Code"
              value={inputValue.toUpperCase()}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="button"
              onClick={(e) => {
                handleJoin(e)
              }}
            >
              Join
            </Button>
          </div>
          {error && <p className="text-red-800 py-4">Invalid Code</p>}
        </div>
        <Separator text="Or" />
        <Link to="/create-group">
          <Button className="mt-6" variant={"secondary"}>
            Create a group
          </Button>
        </Link>
      </div>
    </>
  )
}

export default JoinGroup
