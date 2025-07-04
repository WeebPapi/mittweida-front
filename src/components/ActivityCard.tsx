import React, { useEffect, useState } from "react"
import type { OpenHours } from "@/api/db.types"
import { MapPin } from "lucide-react"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router"

interface Props {
  imgUrl: string
  vidUrl?: string
  name: string
  openHours: OpenHours
  description: string
  address: string
  category: string
  id: string
}

const ActivityCard: React.FC<Props> = ({
  imgUrl,
  vidUrl,
  name,
  openHours,
  description,
  address,
  category,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const truncateDesc = (desc: string) => {
    if (desc.length >= 109) return desc.slice(0, 100) + "..."
    return desc
  }
  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  useEffect(() => {
    const date = new Date()
    const dayToday = weekDays[date.getDay()]
    const timeNow = parseInt(
      date.getHours().toString() +
        (date.getMinutes().toString().length === 1
          ? `0${date.getMinutes()}`
          : date.getMinutes().toString())
    )
    for (let day in openHours) {
      if (day === dayToday) {
        const openTime = parseInt(openHours[day].open.replace(":", ""))
        const closeTime = parseInt(openHours[day].close.replace(":", ""))
        if (timeNow >= openTime && timeNow <= closeTime) setIsOpen(true)
        else setIsOpen(false)
      }
    }
  }, [name, imgUrl, address, openHours])

  return (
    <div
      className="flex flex-col relative rounded-2xl shadow-md min-h-[250px] w-[325px] cursor-pointer hover:scale-[1.03] transition-all bg-white"
      onClick={() => {
        navigate(`/activity/${id}`)
      }}
    >
      <div className="flex-1/2 h-1/2 rounded-2xl">
        {vidUrl ? (
          <video src={vidUrl} autoPlay />
        ) : (
          <img
            width={396}
            src={imgUrl}
            alt={`image of ${name}`}
            className="object-cover w-full h-full rounded-t-2xl"
          />
        )}
      </div>
      <div className="flex-1/2 flex flex-col justify-between">
        <div className="p-2 flex items-center justify-between">
          <h1 className=" text-md">{name}</h1>
          <Badge size="md" variant={isOpen ? "green-subtle" : "red-subtle"}>
            {isOpen ? "Open Now" : "Closed Now"}
          </Badge>
        </div>
        <span className="flex items-center px-1 gap-1">
          <MapPin size={18} />
          <p className="text-[13px] text-gray-600]">{address}</p>
        </span>
        <p className="px-2 text-xs text-gray-500">
          {truncateDesc(description)}
        </p>
        <div className="flex px-2 py-4">
          <Badge variant="trial" size="sm">
            #{category}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
