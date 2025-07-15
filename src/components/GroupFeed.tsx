import type { Group, Photo } from "@/api/db.types"
import React, { useState } from "react"
import NoPhotos from "./NoPhotos"
import PhotoComponent from "./PhotoComponent"
import { CameraIcon } from "lucide-react"
import { useNavigate } from "react-router"
import MiniNavbar from "./MiniNavbar"
import MembersList from "./MembersList"

interface Props {
  group: Group
  photos?: Photo[]
}

const GroupFeed: React.FC<Props> = ({ group, photos }) => {
  const navigate = useNavigate()
  const [displayMembers, setDisplayMembers] = useState(false)
  return (
    <div className="relative h-full ">
      {/*TODO: Finish this part, not complete yet */}
      {displayMembers && (
        <MembersList
          members={group.members!}
          setDisplayMembers={setDisplayMembers}
        />
      )}
      <div
        onClick={() => {
          navigate("/upload-photo")
        }}
        className="fixed bg-primary-indigo w-[50px] h-[50px] rounded-full flex justify-center items-center bottom-[10px]"
      >
        <CameraIcon color="white" size={28} />
      </div>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl mb-4">{group.name}</h1>
        <div className="p-3 bg-white shadow">
          <p className="text-[11px]">Join Code:</p>
          <h1 className="text-xl ">{group.code}</h1>
        </div>
      </div>
      <MiniNavbar groupId={group.id} setDisplayMembers={setDisplayMembers} />
      <div className="flex flex-col justify-between items-center">
        {photos && photos?.length > 0 ? (
          photos
            .reverse()
            .map((photo) => (
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
