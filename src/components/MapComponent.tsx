import type { LocationInfo } from "@/api/getDistance"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet"

interface Props {
  userLocation: LocationInfo
  destination: LocationInfo
  destinationAddress: { name: string; address: string }
}

const MapComponent: React.FC<Props> = ({
  userLocation,
  destination,
  destinationAddress,
}) => {
  const startCoords = [userLocation.longitude, userLocation.latitude]
  const endCoords = [destination.longitude, destination.latitude]
  const countRef = useRef(0)

  const [route, setRoute] = useState([])

  const getWalkingRoute = async (start: number[], end: number[]) => {
    try {
      const { data } = await axios.get(
        `https://graphhopper.com/api/1/route?point=${start[1]},${
          start[0]
        }&point=${end[1]},${end[0]}&profile=foot&key=${
          import.meta.env.VITE_GRAPHHOPPER_KEY
        }&points_encoded=false`
      )
      setRoute(
        data.paths[0].points.coordinates.map((coords: number[]) =>
          coords.reverse()
        )
      )
    } catch {
      throw new Error("No route found")
    }
  }

  useEffect(() => {
    if (countRef.current < 1) {
      getWalkingRoute(startCoords, endCoords)
      countRef.current++
    }
  }, [route])

  return (
    <MapContainer
      className="h-[280px]"
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        className="h-[280px]"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userLocation.latitude, userLocation.longitude]}>
        <Popup>Your Location</Popup>
      </Marker>
      <Marker position={[destination.latitude, destination.longitude]}>
        <Popup>
          {destinationAddress.name + ", "}
          {destinationAddress.address}
        </Popup>
      </Marker>
      <Polyline
        positions={[
          [userLocation.latitude, userLocation.longitude],
          ...route,
          [destination.latitude, destination.longitude],
        ]}
      />
    </MapContainer>
  )
}

export default MapComponent
