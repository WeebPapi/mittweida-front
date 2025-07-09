import React from "react"
import { Badge } from "./ui/badge"

interface Props {
  label: string
  category: string
  onClick: (category: string) => void
  chosenFilter: string
  setChosenFilter: React.Dispatch<React.SetStateAction<string>>
}

const FilterCategory: React.FC<Props> = ({
  label,
  onClick,
  category,
  chosenFilter,
  setChosenFilter,
}) => {
  const colorMatcher = (category: string) => {
    switch (category) {
      case "Nightlife":
        return chosenFilter === category ? "blue" : "blue-subtle"
      case "Sports":
        return chosenFilter === category ? "teal" : "teal-subtle"
      case "Culture":
        return chosenFilter === category ? "red" : "red-subtle"
      case "Food":
        return chosenFilter === category ? "amber" : "amber-subtle"
      default:
        return "gray"
    }
  }
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        if (chosenFilter === category) setChosenFilter("")
        else {
          setChosenFilter(category)
        }
        onClick(category)
      }}
    >
      <Badge size="lg" variant={colorMatcher(category)}>
        {label}
      </Badge>
    </div>
  )
}

export default FilterCategory
