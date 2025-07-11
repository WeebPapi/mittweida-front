import type { Activity } from "@/api/db.types"
import { calculateDistance } from "@/api/getDistance"
import { fetcher } from "@/api/swr"
// import { useGeolocation } from "@/hooks/useGeolocation"
import { useLocation, useParams } from "react-router"
import useSWR from "swr"
import MapComponent from "@/components/MapComponent"
import { useEffect, useState } from "react"

const ActivityPage: React.FC = () => {
  const { id } = useParams()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem("isOpen") || "false")
  )
  const userLocation = { latitude: 50.9864103, longitude: 12.973655 } //useGeolocation()

  const { data, isLoading, error } = useSWR<Activity>(
    `/activities/${id}`,
    fetcher
  )

  useEffect(() => {
    if (
      !(location.state.isOpen === null) ||
      !(location.state.isOpen === undefined)
    ) {
      localStorage.setItem("isOpen", location.state.isOpen)

      setIsOpen(location.state.isOpen)
    }
  }, [location])

  if (error) return null
  else if (isLoading) return <p>Loading...</p>
  else if (data)
    return (
      <main className="mt-12">
        <div>
          <h1 className="text-2xl font-semibold py-4">{data.name}</h1>
          {data.videoUrl ? (
            <video
              autoPlay
              controls
              className="w-full object-cover"
              src={data.videoUrl}
            />
          ) : (
            <img
              className="w-full object-cover"
              src={
                data.imageUrl ? data.imageUrl : "https://placehold.co/300x200"
              }
            />
          )}
        </div>
        <div className="flex flex-col pt-6">
          <div className="pb-3 border-b-gray-200 border-b-2 flex justify-between mb-4">
            <p className="font-medium">Category:</p>
            <p>{data.category}</p>
          </div>
          <div className="pb-3 border-b-gray-200 border-b-2 flex justify-between mb-4">
            <p className="font-medium">Distance:</p>
            <p>
              {calculateDistance(userLocation, {
                latitude: data.latitude,
                longitude: data.longitude,
              })}
              km
            </p>
          </div>
          <div className="pb-3 border-b-gray-200 border-b-2 flex justify-between mb-4">
            <p className="font-medium">Status:</p>
            <p
              className="px-2 py-1 rounded-4xl"
              style={{
                color: isOpen ? "green" : "red",
                backgroundColor: isOpen ? "lightgreen" : "lightpink",
              }}
            >
              {isOpen ? "Open" : "Closed"}
            </p>
          </div>
          <MapComponent
            userLocation={userLocation}
            destination={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            destinationAddress={{ name: data.name, address: data.address }}
          />
        </div>
      </main>
    )
}

export default ActivityPage
