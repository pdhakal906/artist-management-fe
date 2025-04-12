import { Route, Routes } from "react-router"
import RootLayout from "./components/RootLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProtectedRoute from "./components/ProtectedRoute"
import SuperAdminPage from "./pages/SuperAdminPage"
import PublicRoute from "./components/PublicRoute"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
            <Route path="/admin" element={<SuperAdminPage />} />
          </Route>
        </Route>
      </Routes>

    </>
  )
}

export default App
