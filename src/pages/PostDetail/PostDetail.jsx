import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getPostBySlug } from '../../lib/posts.js'
import './PostDetail.css'

export default function PostDetail() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div>
        <p className="not-found">글을 찾을 수 없습니다.</p>
        <Link to="/" className="post-back-link">
          홈으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <article>
      <Link to="/" className="post-back-link">
        ← 목록으로
      </Link>
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <time>{post.date}</time>
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
