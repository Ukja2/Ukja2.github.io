import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { CATEGORIES } from '../../lib/categories.js'
import './Write.css'

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function slugifyFilename(filename) {
  const dot = filename.lastIndexOf('.')
  const base = dot > 0 ? filename.slice(0, dot) : filename
  const ext = dot > 0 ? filename.slice(dot).toLowerCase() : ''
  return `${slugify(base) || 'image'}${ext}`
}

function extensionFromMime(mime) {
  const map = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
  }
  return map[mime] || ''
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Write() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(todayISO())
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [filename, setFilename] = useState('')
  const [formHeight, setFormHeight] = useState(null)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 861px)').matches,
  )
  const [images, setImages] = useState([])
  const formRef = useRef(null)
  const bodyRef = useRef(null)
  const imageUrlsRef = useRef([])

  useEffect(() => {
    const el = formRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setFormHeight(entries[0].contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ref = imageUrlsRef
    return () => {
      ref.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 861px)')
    const handleChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  function toggleTag(tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  function insertAtCursor(text) {
    const el = bodyRef.current
    if (!el) {
      setBody((prev) => prev + text)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    setBody((prev) => prev.slice(0, start) + text + prev.slice(end))
    requestAnimationFrame(() => {
      el.focus()
      el.selectionStart = el.selectionEnd = start + text.length
    })
  }

  function addImageFile(file) {
    let rawName = file.name || ''
    if (!/\.[a-z0-9]+$/i.test(rawName)) {
      rawName = `${rawName || 'image'}-${Date.now()}${extensionFromMime(file.type)}`
    }
    const base = slugifyFilename(rawName)

    let name = base
    let i = 2
    while (images.some((img) => img.name === name)) {
      const dot = base.lastIndexOf('.')
      name = dot > 0 ? `${base.slice(0, dot)}-${i}${base.slice(dot)}` : `${base}-${i}`
      i++
    }

    const url = URL.createObjectURL(file)
    imageUrlsRef.current.push(url)
    setImages((prev) => [...prev, { name, url }])
    insertAtCursor(`![${rawName}](/assets/${name})\n`)
  }

  function handleBodyPaste(e) {
    const items = e.clipboardData?.items
    if (!items) return
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          e.preventDefault()
          addImageFile(file)
        }
        break
      }
    }
  }

  function buildMarkdown() {
    return `---
title: ${title}
date: ${date}
tags: [${tags.join(', ')}]
description: ${description}
---

${body}
`
  }

  function handleDownload() {
    const content = buildMarkdown()
    const name = `${filename || slugify(title) || 'untitled'}.md`
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h1 className="write-title">글쓰기</h1>
      <p className="write-hint">
        여기서 작성한 내용을 <code>.md</code> 파일로 다운로드해서, 나중에{' '}
        <code>src/posts/</code>에 붙여넣고 커밋하면 됩니다.
      </p>

      <div className="write-layout">
        <div className="write-form" ref={formRef}>
          <div className="write-field">
            <label htmlFor="write-title-input">제목</label>
            <input
              id="write-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목"
            />
          </div>

          <div className="write-field">
            <label htmlFor="write-date-input">날짜</label>
            <input
              id="write-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="write-field">
            <label>태그</label>
            <div className="write-tags">
              {CATEGORIES.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`write-tag-pill ${tags.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="write-field">
            <label htmlFor="write-description-input">설명</label>
            <input
              id="write-description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="목록에 보여줄 한 줄 설명"
            />
          </div>

          <div className="write-field">
            <label htmlFor="write-body-input">본문 (마크다운)</label>
            <textarea
              id="write-body-input"
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onPaste={handleBodyPaste}
              rows={16}
              placeholder="여기에 마크다운으로 작성하세요. 이미지는 복사해서 바로 붙여넣기(Ctrl+V)할 수 있어요."
            />
          </div>

          <div className="write-field">
            <label htmlFor="write-filename-input">파일명 (비우면 제목에서 자동 생성)</label>
            <input
              id="write-filename-input"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder={slugify(title) || 'my-post'}
            />
          </div>

          <button type="button" className="write-download-button" onClick={handleDownload}>
            .md 파일로 다운로드
          </button>
        </div>

        <div className="write-preview-col">
          <div
            className="write-preview-panel"
            style={isDesktop && formHeight ? { height: formHeight } : undefined}
          >
            <p className="write-preview-label">미리보기</p>
            <div className="write-preview-card">
              <h1 className="write-preview-title">{title || '제목 없음'}</h1>
              <div className="write-preview-meta">
                <time>{date}</time>
                {tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    img: ({ src, alt }) => {
                      const match = images.find((img) => src === `/assets/${img.name}`)
                      return <img src={match ? match.url : src} alt={alt} />
                    },
                  }}
                >
                  {body || '_본문을 입력하면 여기에 미리보기가 표시됩니다._'}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
