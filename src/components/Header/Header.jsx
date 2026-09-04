import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconGithub, IconMenu, IconMoon, IconPencil, IconSun } from '../icons.jsx'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

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
        <nav className="header-nav" ref={navRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            className="menu-toggle"
          >
            <IconMenu />
          </button>
          <div className={`header-nav-items ${menuOpen ? 'open' : ''}`}>
            <Link
              to="/write"
              className="icon-link"
              aria-label="글쓰기"
              onClick={() => setMenuOpen(false)}
            >
              <IconPencil className="nav-icon" />
              <span className="nav-label">글쓰기</span>
            </Link>
            <a
              href="https://github.com/Ukja2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 프로필"
              className="icon-link"
              onClick={() => setMenuOpen(false)}
            >
              <IconGithub className="nav-icon" />
              <span className="nav-label">GitHub</span>
            </a>
            <button
              type="button"
              onClick={() => setDark((prev) => !prev)}
              aria-label="다크 모드 전환"
              className="theme-toggle"
            >
              {dark ? <IconSun className="nav-icon" /> : <IconMoon className="nav-icon" />}
              <span className="nav-label">{dark ? 'LightMode' : 'DarkMode'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
