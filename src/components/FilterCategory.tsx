import React from "react"
import { Badge } from "./ui/badge"

interface Props {
  label: string
  category: string
  onClick: (category: string) => void
}

const FilterCategory: React.FC<Props> = ({ label, onClick, category }) => {
  const colorMatcher = (category: string) => {
    switch (category) {
      case "Nightlife":
        return "blue-subtle"
      case "Sport":
        return "teal-subtle"
      case "Culture":
        return "red-subtle"
      case "Food":
        return "amber-subtle"
      default:
        return "gray"
    }
  }
  return (
    <div
      onClick={() => {
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
