import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../../lib/posts.js'
import { CATEGORIES, primaryCategory } from '../../lib/categories.js'
import { CategoryIcon } from '../../components/icons.jsx'
import './Home.css'

// 3열 격자 기준 3줄.
const POSTS_PER_PAGE = 9

export default function Home() {
  const [activeTag, setActiveTag] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
  // 글 개수와 상관없이 격자를 POSTS_PER_PAGE 칸으로 채워서 푸터 위치가 흔들리지 않게 한다.
  // 글이 없을 때는 빈 칸들로 높이를 유지한 채 안내 문구를 격자 한가운데에 띄운다.
  const placeholderCount = POSTS_PER_PAGE - paged.length

  function selectTag(tag) {
    setActiveTag(tag)
    setPage(1)
  }

  return (
    <div className="home">
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

      <ul className="post-grid">
        {paged.map((post) => {
          const category = primaryCategory(post.tags)
          return (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="post-card">
                <div className="post-card-thumb">
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt="" loading="lazy" />
                  ) : (
                    <CategoryIcon category={category} aria-hidden="true" />
                  )}
                </div>
                <div className="post-card-body">
                  <h2 className="post-card-title">{post.title}</h2>
                  <div className="post-card-meta">
                    {category && (
                      <>
                        <span>{category}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <time>{post.date}</time>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
        {filtered.length === 0 && (
          <li className="post-grid-empty">
            <p className="empty-state">아직 글이 없습니다.</p>
          </li>
        )}
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <li key={`placeholder-${i}`} className="post-card-placeholder" aria-hidden="true">
            <div className="post-card">
              <div className="post-card-thumb" />
              <div className="post-card-body" />
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
