import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../../lib/posts.js'
import { CATEGORIES, primaryCategory } from '../../lib/categories.js'
import { CategoryIcon } from '../../components/icons.jsx'
import './Home.css'

const POSTS_PER_PAGE = 11

export default function Home() {
  const [activeTag, setActiveTag] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
  // 글 개수와 상관없이 목록 높이를 POSTS_PER_PAGE 줄로 고정해서 푸터 위치가 흔들리지 않게 한다.
  // 글이 없을 때는 안내 문구가 한 줄을 차지한다.
  const placeholderCount = POSTS_PER_PAGE - Math.max(paged.length, 1)

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
            <CategoryIcon category={tag} className="category-icon" aria-hidden="true" />
            {tag}
          </button>
        ))}
      </div>

      <ul className="post-list">
        {paged.map((post) => {
          const category = primaryCategory(post.tags)
          return (
            <li key={post.slug} className="post-list-item">
              <Link to={`/posts/${post.slug}`}>
                <div className="post-list-header">
                  {category && (
                    <span className="category-icon" title={category} role="img" aria-label={category}>
                      <CategoryIcon category={category} aria-hidden="true" />
                    </span>
                  )}
                  <h2 className="post-list-title">{post.title}</h2>
                  <time className="post-list-date">{post.date}</time>
                </div>
              </Link>
            </li>
          )
        })}
        {filtered.length === 0 && (
          <li className="post-list-item post-list-empty">
            <div className="post-list-header">
              <p className="empty-state">아직 글이 없습니다.</p>
            </div>
          </li>
        )}
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <li key={`placeholder-${i}`} className="post-list-item post-list-placeholder" aria-hidden="true">
            <div>
              <div className="post-list-header">
                <h2 className="post-list-title">placeholder</h2>
                <time className="post-list-date">0000-00-00</time>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지가 하나뿐이어도 자리는 차지하게 두고 숨겨서 푸터 위치를 고정한다. */}
      <div
        className={`pagination ${totalPages > 1 ? '' : 'pagination-hidden'}`}
        aria-hidden={totalPages > 1 ? undefined : true}
      >
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
    </div>
  )
}
