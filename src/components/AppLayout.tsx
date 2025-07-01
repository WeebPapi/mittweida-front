import React from "react"

interface Props {
  children: React.ReactNode
}
const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center bg-bg">
      <div className="relative w-full min-w-mobile max-w-mobile overflow-y-auto bg-background shadow-lg">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
