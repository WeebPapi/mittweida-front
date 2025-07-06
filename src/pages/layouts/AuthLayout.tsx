import { Providers } from "../../api/swr"
import AppLayout from "../../components/AppLayout"
import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <Providers>
      <AppLayout>
        <div className="p-app h-full">
          <Outlet />
        </div>
      </AppLayout>
    </Providers>
  )
}

export default AuthLayout
