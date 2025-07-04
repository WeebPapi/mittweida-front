import { useState } from "react"

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>(
    JSON.parse(localStorage.getItem("coordinates")!) || {
      latitude: 0,
      longitude: 0,
    }
  )

  if (!coordinates.latitude && !coordinates.longitude) {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordinates(() => {
        localStorage.setItem("coordinates", JSON.stringify(pos.coords))
        return {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
      })
    })
  }

  return coordinates
}
