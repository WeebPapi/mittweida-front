import React, { useEffect, useState } from "react"
import FilterCategory from "./FilterCategory"
import InputWithIcon from "./ui/inputWithIcon"
import { SearchIcon } from "lucide-react"

interface Props {
  setToggleFilters: React.Dispatch<React.SetStateAction<boolean>>
  setNewUrl: React.Dispatch<React.SetStateAction<string>>
}

const ActivityFiltration: React.FC<Props> = ({
  setToggleFilters,
  setNewUrl,
}) => {
  const [searchValue, setSearchValue] = useState("")
  const [chosenFilter, setChosenFilter] = useState("")
  const modifyUrl = () => {
    let newUrl = ""
    if (!(searchValue === "") && chosenFilter === "")
      newUrl += `/activities?searchQuery=${searchValue}`
    else if (!(chosenFilter === "") && searchValue === "")
      newUrl += `/activities?categories=${[chosenFilter]}`
    else if (!(chosenFilter === "") && !(searchValue === ""))
      newUrl += `/activities?searchQuery=${searchValue}&categories=${[
        chosenFilter,
      ]}`
    return newUrl
  }

  const filterCategories = [
    { label: "🕺🏽 Nightlife", category: "Nightlife" },
    { label: "🥘 Food", category: "Food" },
    { label: "🏰 Culture", category: "Culture" },
    { label: "⚽ Sports", category: "Sports" },
  ]
  useEffect(() => {
    if (chosenFilter === "" && searchValue === "") setToggleFilters(false)
    else {
      setToggleFilters(true)

      setNewUrl(modifyUrl())
    }
  }, [searchValue, chosenFilter])
  return (
    <div>
      <InputWithIcon
        placeholder="Search Activities"
        value={searchValue}
        onChange={(e) => {
          if (e.target.value.trim() === "") setToggleFilters(false)
          else {
            setToggleFilters(true)
          }
          setSearchValue(e.target.value)
        }}
        icon={
          <SearchIcon
            size={18}
            color={"#c9c9c9"}
            className="absolute top-1/4 left-[4px]"
          />
        }
      />
      <div className="overflow-x-scroll flex justify-between pt-4">
        {filterCategories.map((filter) => (
          <FilterCategory
            key={filter.category}
            label={filter.label}
            category={filter.category}
            onClick={modifyUrl}
            chosenFilter={chosenFilter}
            setChosenFilter={setChosenFilter}
          />
        ))}
      </div>
    </div>
  )
}

export default ActivityFiltration
