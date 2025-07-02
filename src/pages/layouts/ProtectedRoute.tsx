import React, { useEffect } from "react"
import AppLayout from "../../components/AppLayout"
import { Outlet, useNavigate } from "react-router"
import { Providers } from "../../api/swr"
import { getCurrentUser } from "../../api/auth.actions"

const ProtectedRoute: React.FC = () => {
  const { isLoading, error } = getCurrentUser()

  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      navigate("/auth/sign-in")
    }
  }, [navigate, error])

  if (isLoading) return <p>Loading</p>
  if (error) return null
  return (
    <Providers>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Providers>
  )
}

export default ProtectedRoute
