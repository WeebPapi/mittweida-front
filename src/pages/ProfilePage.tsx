import { getCurrentUser, logOut, updateProfile } from "@/api/auth.actions"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import type { profileObjKeys, ProfileUpdate } from "./profile-update.interface"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"

const ProfilePage: React.FC = () => {
  const { data, error, isLoading } = getCurrentUser()
  const navigate = useNavigate()

  if (isLoading) return <p>Loading...</p>
  else if (error) return null

  const [editMode, setEditMode] = useState<
    "Picture" | "Name" | "Email" | "Password" | "None"
  >("None")

  const [changeData, setChangeData] = useState<ProfileUpdate>({
    firstName: "",
    lastName: "",
    profilePicture: "",
    email: "",
    password: "",
  })

  const handleLogout = async () => {
    const response = await logOut()
    localStorage.clear()
    if (response.success === true) navigate("/auth")
  }

  useEffect(() => {
    let sentObj: ProfileUpdate = {}
    for (let key in changeData) {
      if (changeData[key as profileObjKeys] !== "")
        sentObj[key as profileObjKeys] = changeData[key as profileObjKeys]
    }
    updateProfile(sentObj)
  }, [editMode])

  return (
    <div className="max-w-md mx-auto p-app mt-24 bg-white rounded-lg shadow-lg h-full flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-4">
        <span className="flex items-center relative">
          <img
            className="rounded-full object-cover w-[200px] h-[200px]"
            width={200}
            height={200}
            src={
              data?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
        </span>
        <span className="flex items-center relative">
          {editMode === "Name" ? (
            <div className="flex w-full">
              <div>
                <Label className="text-[12px]" htmlFor="firstname">
                  First Name
                </Label>
                <Input
                  placeholder="First Name"
                  className="w-[130px]"
                  name="firstname"
                  value={changeData.firstName}
                  onChange={(e) => {
                    setChangeData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }}
                />
              </div>
              <div>
                <Label className="text-[12px]" htmlFor="lastname">
                  Last Name
                </Label>
                <Input
                  placeholder="Last Name"
                  className="w-[130px]"
                  name="lastname"
                  value={changeData.lastName}
                  onChange={(e) => {
                    setChangeData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-3xl w-[200px] text-center">
              {changeData.firstName && changeData.lastName
                ? changeData?.firstName + " " + changeData?.lastName
                : data?.firstName + " " + data?.lastName}
            </h1>
          )}
          <PencilIcon
            className="absolute right-[-60px]"
            onClick={() => {
              if (editMode !== "Name") setEditMode("Name")
              else setEditMode("None")
            }}
          />
        </span>
      </div>
      <div className="flex flex-col  gap-8 items-center">
        <span className="flex w-[200px] items-center relative">
          {editMode === "Email" ? (
            <div className="flex w-full">
              <div>
                <Label className="text-[12px]" htmlFor="email">
                  Email
                </Label>
                <Input
                  placeholder="Email"
                  name="email"
                  value={changeData.email}
                  onChange={(e) => {
                    setChangeData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-xl  text-center">
              {changeData.email ? changeData.email : data?.email}
            </h1>
          )}
          <PencilIcon
            className="absolute right-[-60px]"
            onClick={() => {
              if (editMode !== "Email") setEditMode("Email")
              else setEditMode("None")
            }}
          />
        </span>
        <span className="flex w-[200px] items-center relative">
          {editMode === "Password" ? (
            <div className="flex w-full">
              <div>
                <Label className="text-[12px]" htmlFor="password">
                  New Password
                </Label>
                <Input
                  placeholder="New Password"
                  name="password"
                  value={changeData.password}
                  onChange={(e) => {
                    setChangeData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-xl  text-center">Change Password</h1>
          )}
          <PencilIcon
            className="absolute right-[-60px]"
            onClick={() => {
              if (editMode !== "Password") setEditMode("Password")
              else setEditMode("None")
            }}
          />
        </span>
        <span className="flex items-center relative">
          <Button
            onClick={handleLogout}
            variant={"outlineDestruct"}
            size={"lg"}
            className="text-lg p-8 text-center"
          >
            Log Out
          </Button>
        </span>
      </div>
    </div>
  )
}

export default ProfilePage
