import { ChevronLeft, CircleUserRound, UsersRound } from "lucide-react"
import React from "react"
import { useLocation, useNavigate } from "react-router"

const Navbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      style={{
        justifyContent: !(location.pathname === "/") ? "space-between" : "end",
      }}
      className="relative top-0 left-0 flex  min-w-mobile max-w-mobile items-center bg-primary-indigo w-full p-app"
    >
      {!(location.pathname === "/") && (
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(-1)
          }}
        >
          <ChevronLeft color="white" size={28} />
        </div>
      )}
      <div className="w-[80px] flex justify-between ">
        <span
          onClick={() => {
            navigate("/group")
          }}
          className="cursor-pointer"
        >
          <UsersRound color="white" size={28} />
        </span>
        <span className="cursor-pointer">
          <CircleUserRound color="white" size={28} />
        </span>
      </div>
    </nav>
  )
}

export default Navbar
