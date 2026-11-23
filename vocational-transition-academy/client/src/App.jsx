import { Routes, Route, Navigate } from 'react-router'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/home'
import InfoPage from './pages/InfoPage'
import LoginChooser from './pages/LoginChooser'
import LoginForm from './pages/LoginForm'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import useAuth from './hooks/useAuth'

const pages = ['programs', 'about', 'parents', 'employers', 'enquiry', 'contact', 'privacy', 'accessibility']

function DashboardRedirect() {
  const { user } = useAuth()
  return <Navigate to={`/dashboard/${user.role}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        {pages.map((p) => (
          <Route key={p} path={p} element={<InfoPage pageKey={p} />} />
        ))}
        <Route path="login" element={<LoginChooser />} />
        <Route path="login/:portal" element={<LoginForm />} />
        <Route path="signup/:portal" element={<Signup />} />
        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route index element={<DashboardRedirect />} />
          <Route path=":role" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<InfoPage pageKey="notFound" />} />
      </Route>
    </Routes>
  )
}