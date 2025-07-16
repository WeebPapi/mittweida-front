import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, HashRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.tsx"
import ProtectedRoute from "./pages/layouts/ProtectedRoute.tsx"
import AuthPage from "./pages/AuthPage"
import AuthLayout from "./pages/layouts/AuthLayout.tsx"
import ActivityPage from "./pages/ActivityPage.tsx"
import GroupPage from "./pages/GroupPage.tsx"
import PhotoSelector from "./pages/PhotoUpload.tsx"
import CreateGroup from "./pages/CreateGroup.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"
import PollCreation from "./pages/PollCreation.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/auth/" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/group/create-poll" element={<PollCreation />} />
          <Route path="/upload-photo" element={<PhotoSelector />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
)
