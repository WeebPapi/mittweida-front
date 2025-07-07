import React from "react"

const NoPhotos = () => {
  return (
    <div className="w-[340px] h-[600px] flex justify-center items-center">
      <div className="flex flex-col gap-1">
        <img src="https://icons.veryicon.com/png/128/miscellaneous/iview30-ios-style/ios-camera-6.png" />
        <h2 className="text-xl">No photos yet, get posting!</h2>
      </div>
    </div>
  )
}

export default NoPhotos
