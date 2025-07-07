import React, { useEffect } from "react"
import AppLayout from "../../components/AppLayout"
import { Outlet, useNavigate } from "react-router"
import { Providers } from "../../api/swr"
import { getCurrentUser } from "../../api/auth.actions"
import Navbar from "@/components/Navbar"

const ProtectedRoute: React.FC = () => {
  const { isLoading, error } = getCurrentUser()

  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      navigate("/auth")
    }
  }, [navigate, error])

  if (isLoading) return <p>Loading</p>
  if (error) return null
  return (
    <Providers>
      <AppLayout>
        <Navbar />
        <div className="p-app h-full">
          <Outlet />
        </div>
      </AppLayout>
    </Providers>
  )
}

export default ProtectedRoute
