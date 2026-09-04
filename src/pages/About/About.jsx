import './About.css'

export default function About() {
  return (
    <div>
      <h1 className="about-title">About</h1>
      <p className="about-text">
        모르는 것에 대한 개인 기록 공간입니다. 인프라 및 데이터베이스에 관한 주제 위주로
        정리합니다.
      </p>

      <h2 className="about-subtitle">경력</h2>
      <ul className="about-list">
        <li>참저축은행 디지털금융팀 (2026.09 ~)</li>
      </ul>
    </div>
  )
}
