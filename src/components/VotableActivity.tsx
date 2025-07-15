import React from "react"
import { Badge } from "./ui/badge"

interface Props {
  imgUrl: string
  vidUrl?: string
  name: string
  address: string
  category: string
  id: string
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

const VotableActivity: React.FC<Props> = ({
  imgUrl,
  vidUrl,
  name,
  category,
  id,
  selected,
  setSelected,
}) => {
  const handleSelection = () => {
    if (selected !== id) setSelected(id)
    else setSelected("")
  }
  return (
    <div className="flex flex-col relative rounded-2xl shadow-md h-[200px] w-[325px] cursor-pointer hover:scale-[1.03] transition-all bg-white">
      <div className="flex-1/2 flex flex-col justify-between">
        <div className="p-2 flex items-center justify-between">
          <h1 className=" text-md">{name}</h1>
          <div className="flex flex-col gap-4 items-center">
            <div
              onClick={handleSelection}
              style={{
                backgroundColor: selected === id ? "blue" : "#99a1af",
              }}
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

export default VotableActivity
