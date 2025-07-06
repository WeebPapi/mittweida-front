import React from "react"
import Navbar from "./Navbar"

interface Props {
  children: React.ReactNode
}
const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-700">
      <div className="relative w-full min-w-mobile max-w-mobile overflow-y-auto bg-bg shadow-lg ">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
