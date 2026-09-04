import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { posts } from '../../lib/posts.js'

const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const trimmed = query.trim().toLowerCase()
  const results = trimmed
    ? posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(trimmed) ||
            post.description.toLowerCase().includes(trimmed),
        )
        .slice(0, 6)
    : []

  function handleSelect(slug) {
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
    navigate(`/posts/${slug}`)
  }

  return (
    <div className="search-box">
      <FiSearch className="search-icon" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        className="search-input"
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results.length > 0) handleSelect(results[0].slug)
          if (e.key === 'Escape') inputRef.current?.blur()
        }}
      />
      {!query && <kbd className="search-kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>}

      {open && trimmed && (
        <ul className="search-dropdown">
          {results.length > 0 ? (
            results.map((post) => (
              <li key={post.slug}>
                <button
                  type="button"
                  className="search-result"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(post.slug)}
                >
                  <span className="search-result-title">{post.title}</span>
                  {post.description && (
                    <span className="search-result-desc">{post.description}</span>
                  )}
                </button>
              </li>
            ))
          ) : (
            <li className="search-empty">검색 결과가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  )
}
