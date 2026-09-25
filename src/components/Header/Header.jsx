import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconGithub, IconMenu } from '../icons.jsx'
import SearchBox from './SearchBox.jsx'
import './Header.css'

export default function Header() {
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
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
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
          </div>
        </nav>
      </div>
    </header>
  )
}
