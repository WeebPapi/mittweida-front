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
  address: string
  category: string
  id: string
  selectedActivities: string[]
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}

const SelectableActivityCard: React.FC<Props> = ({
  imgUrl,
  vidUrl,
  name,
  openHours,
  address,
  category,
  id,
  selectedActivities,
  setSelectedActivities,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [selected, setSelected] = useState(false)

  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  const handleSelection = () => {
    if (selected && selectedActivities.includes(id)) {
      setSelected(false)
      setSelectedActivities((prev) => prev.filter((act) => act !== id))
    } else if (
      !selected &&
      selectedActivities.length < 3 &&
      !selectedActivities.includes(id)
    ) {
      setSelected(true)
      setSelectedActivities((prev) => [...prev, id])
    }
  }

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
  //   if (!isOpen) return null
  return (
    <div className="flex flex-col relative rounded-2xl shadow-md h-[250px] w-[325px] cursor-pointer hover:scale-[1.03] transition-all bg-white">
      <div className="flex-1/2 flex flex-col justify-between">
        <div className="p-2 flex items-center justify-between">
          <h1 className=" text-md">{name}</h1>
          <div className="flex flex-col gap-4 items-center">
            <Badge size="md" variant={isOpen ? "green-subtle" : "red-subtle"}>
              {isOpen ? "Open Now" : "Closed Now"}
            </Badge>
            <div
              onClick={handleSelection}
              style={{ backgroundColor: selected ? "blue" : "#99a1af" }}
              className="rounded-full w-[30px] h-[30px] transition-all duration-100"
            ></div>
          </div>
        </div>

        <div className="flex px-2 py-4">
          <Badge variant="trial" size="sm">
            #{category}
          </Badge>
        </div>
      </div>
      <div className="flex-1/2 h-1/2 rounded-2xl">
        {vidUrl ? (
          <video src={vidUrl} autoPlay />
        ) : (
          <img
            width={396}
            src={imgUrl}
            alt={`image of ${name}`}
            className="object-cover w-full h-full rounded-b-2xl"
          />
        )}
      </div>
    </div>
  )
}

export default SelectableActivityCard
