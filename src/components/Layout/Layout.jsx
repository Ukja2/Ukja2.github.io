import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import './Layout.css'

export default function Layout() {
  const { pathname } = useLocation()
  const isWide = pathname === '/write'

  return (
    <div className="layout">
      <Header />
      <main className={`layout-main ${isWide ? 'wide' : ''}`}>
        <Outlet />
      </main>
      <footer className={`layout-footer ${isWide ? 'wide' : ''}`}>
        © {new Date().getFullYear()} Ukja2
      </footer>
    </div>
  )
}
