import React from "react"

interface Props {
  text: string
}

const Separator: React.FC<Props> = ({ text }) => {
  return (
    <div className="w-full h-[12px] relative">
      <div className="bg-gray-600 w-full h-[1px]"></div>
      <p className="absolute left-1/2 bottom-[1px] bg-bg ">{text}</p>
    </div>
  )
}

export default Separator
