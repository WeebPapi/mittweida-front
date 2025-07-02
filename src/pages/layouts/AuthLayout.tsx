import { Providers } from "../../api/swr"
import AppLayout from "../../components/AppLayout"
import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <Providers>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Providers>
  )
}

export default AuthLayout
