import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../../lib/posts.js'
import { CATEGORIES } from '../../lib/categories.js'
import './Home.css'

const POSTS_PER_PAGE = 6

export default function Home() {
  const [activeTag, setActiveTag] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
  const placeholderCount = totalPages > 1 ? POSTS_PER_PAGE - paged.length : 0

  function selectTag(tag) {
    setActiveTag(tag)
    setPage(1)
  }

  return (
    <div>
      <div className="tag-filter">
        <button
          type="button"
          onClick={() => selectTag(null)}
          className={`tag-pill ${!activeTag ? 'active' : ''}`}
        >
          전체
        </button>
        {CATEGORIES.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => selectTag(tag)}
            className={`tag-pill ${activeTag === tag ? 'active' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="post-list">
        {paged.map((post) => (
          <li key={post.slug} className="post-list-item">
            <Link to={`/posts/${post.slug}`}>
              <div className="post-list-header">
                <h2 className="post-list-title">{post.title}</h2>
                <time className="post-list-date">{post.date}</time>
              </div>
              {post.description && <p className="post-list-description">{post.description}</p>}
              {post.tags.length > 0 && (
                <div className="post-list-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <p className="empty-state">아직 글이 없습니다.</p>}
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <li key={`placeholder-${i}`} className="post-list-item post-list-placeholder" aria-hidden="true">
            <div>
              <div className="post-list-header">
                <h2 className="post-list-title">placeholder</h2>
                <time className="post-list-date">0000-00-00</time>
              </div>
              <p className="post-list-description">placeholder</p>
              <div className="post-list-tags">
                <span>#placeholder</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-button"
            onClick={() => setPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span className="pagination-status">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="pagination-button"
            onClick={() => setPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}
