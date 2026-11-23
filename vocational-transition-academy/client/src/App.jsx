import { Routes, Route } from 'react-router'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/home'
import InfoPage from './pages/infoPage'

const pages = ['programs', 'about', 'parents', 'employers', 'enquiry', 'contact', 'login', 'privacy', 'accessibility']

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        {pages.map((p) => (
          <Route key={p} path={p} element={<InfoPage pageKey={p} />} />
        ))}
        <Route path="*" element={<InfoPage pageKey="notFound" />} />
      </Route>
    </Routes>
  )
}