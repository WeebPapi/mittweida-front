import type { User } from "@/api/db.types"
import React from "react"
import useSWR from "swr"

interface Props {
  imgUrl: string
  userId: string
  caption?: string
  location?: string
}

const PhotoComponent: React.FC<Props> = ({
  imgUrl,
  userId,
  caption,
  location,
}) => {
  const { data, isLoading } = useSWR<User>(`/users/${userId}`)
  if (isLoading) return <p>Loading...</p>
  return (
    <article className="py-app px-[10px] w-[310px]">
      <div className="flex gap-2 items-center py-2 border-b-1 border-b-black">
        <img
          className="rounded-full w-[40px] h-[40px] object-cover"
          src={
            data?.profilePicture
              ? data.profilePicture
              : "https://placehold.co/40"
          }
          alt={`${data?.firstName || "User"}'s profile picture`}
        />
        <p className="text-[12px]">{data?.firstName}</p>
        {location ? (
          <p className=" flex-1 text-end text-gray-700 text-[13px]">
            📍{location}
          </p>
        ) : null}
      </div>
      <img
        src={imgUrl}
        className="object-cover w-full h-full pt-2"
        alt={caption || "User uploaded photo"}
      />
      <div className="flex justify-between items-center w-full flex-wrap mt-1 border-b-1 border-b-black pb-2">
        {caption ? <p className="flex-1 text-[14px]">{caption}</p> : null}
      </div>
    </article>
  )
}

export default PhotoComponent
