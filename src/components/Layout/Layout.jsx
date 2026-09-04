import { Outlet } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">© {new Date().getFullYear()} Ukja2</footer>
    </div>
  )
}
