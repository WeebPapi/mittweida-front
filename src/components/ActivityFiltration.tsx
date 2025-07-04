import React from "react"
import { Input } from "./ui/input"
import FilterCategory from "./FilterCategory"

const ActivityFiltration: React.FC = () => {
  const modifyUrl = (category: string) => {}
  const filterCategories = [
    { label: "🕺🏽 Nightlife", category: "Nightlife" },
    { label: "🥘 Food", category: "Food" },
    { label: "🏰 Culture", category: "Culture" },
    { label: "⚽ Sport", category: "Sport" },
  ]
  return (
    <div>
      <Input placeholder="Search" />
      <div className="overflow-x-scroll flex justify-between pt-4">
        {filterCategories.map((filter) => (
          <FilterCategory
            key={filter.category}
            label={filter.label}
            category={filter.category}
            onClick={modifyUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default ActivityFiltration
