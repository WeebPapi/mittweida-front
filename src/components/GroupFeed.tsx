import type { Group } from "@/api/db.types"
import React from "react"
import NoPhotos from "./NoPhotos"
import PhotoComponent from "./PhotoComponent"
import { CameraIcon } from "lucide-react"

interface Props {
  group: Group
}

const GroupFeed: React.FC<Props> = ({ group }) => {
  return (
    <div className="relative h-full">
      <div className="fixed bg-primary-indigo w-[50px] h-[50px] rounded-full flex justify-center items-center bottom-[10px]">
        <CameraIcon color="white" size={28} />
      </div>
      <h1 className="text-4xl mb-4">{group.name}</h1>
      <div className="flex flex-col justify-between items-center">
        {group.photos && group.photos?.length > 0 ? (
          group.photos.map((photo) => (
            <PhotoComponent
              key={photo.id}
              imgUrl={photo.url}
              userId={photo.userId}
              caption={photo.caption || ""}
              location={photo.location || ""}
            />
          ))
        ) : (
          <NoPhotos />
        )}
      </div>
    </div>
  )
}

export default GroupFeed
