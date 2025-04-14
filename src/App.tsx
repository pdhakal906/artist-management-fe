import { Route, Routes } from "react-router"
import RootLayout from "./components/RootLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardPage from "./pages/DashboardPage"
import PublicRoute from "./components/PublicRoute"
import useAuthStore from "./features/store"
import { useEffect } from "react"
import UnauthorizedPage from "./pages/UnauthorizedPage"


const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['super_admin', 'artist_manager', 'artist']} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>

    </>
  )
}

export default App
