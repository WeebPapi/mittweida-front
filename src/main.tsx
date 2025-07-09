import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.tsx"
import ProtectedRoute from "./pages/layouts/ProtectedRoute.tsx"
import AuthPage from "./pages/AuthPage"
import AuthLayout from "./pages/layouts/AuthLayout.tsx"
import ActivityPage from "./pages/ActivityPage.tsx"
import GroupPage from "./pages/GroupPage.tsx"
import PhotoSelector from "./pages/PhotoUpload.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/upload-photo" element={<PhotoSelector />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
