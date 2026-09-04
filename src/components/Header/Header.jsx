import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoon, FiSun } from 'react-icons/fi'
import SearchBox from './SearchBox.jsx'
import './Header.css'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

export default function Header() {
  const [dark, setDark] = useDarkMode()

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src="/assets/Profile.jpg" alt="" className="header-avatar" />
          Ukja2
        </Link>
        <div className="header-search">
          <SearchBox />
        </div>
        <nav className="header-nav">
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <button
            type="button"
            onClick={() => setDark((prev) => !prev)}
            aria-label="다크 모드 전환"
            className="theme-toggle"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>
    </header>
  )
}
