import React, { useEffect } from "react"
import AppLayout from "../../components/AppLayout"
import { Navigate, Outlet, useNavigate } from "react-router"
import useSWR from "swr"
import { fetcher } from "../../api/swr"

const ProtectedRoute: React.FC = () => {
  const url = "http://localhost:3000/api/users/profile"
  const { data, isLoading, error } = useSWR(url, fetcher, {
    // Add this configuration object
    shouldRetryOnError: false, // Don't retry on 401/403 etc.
    revalidateOnFocus: false, // Optional: Prevents re-fetching when window is focused
  })
  console.log("SWR State:", { isLoading, data, error })
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      console.log("Error detected, navigating...", error)
      navigate("/auth/sign-in")
    }
  }, [navigate, error])

  if (isLoading) return <p>Loading...</p>
  if (error) return null
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default ProtectedRoute
