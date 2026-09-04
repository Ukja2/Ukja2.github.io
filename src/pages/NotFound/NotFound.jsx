import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">페이지를 찾을 수 없습니다</h1>
      <p className="not-found-text">주소가 잘못됐거나 삭제된 페이지예요.</p>
      <Link to="/" className="not-found-link">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
