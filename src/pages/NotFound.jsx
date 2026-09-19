import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <svg className="not-found__aperture" width="120" height="120" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="31" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d="M32 4 L48 30 L32 30 Z"
              fill="var(--amber)"
              style={{ transform: `rotate(${i * 72}deg)`, transformOrigin: '32px 32px' }}
            />
          ))}
        </svg>

        <span className="eyebrow">404</span>
        <h1>لا يوجد ضوء هنا</h1>
        <p>العدسة لم تلتقط شيئاً في هذا المكان — الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>

        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">العودة للرئيسية</Link>
          <Link to="/blog" className="btn">تصفح المدونة</Link>
        </div>
      </div>
    </section>
  )
}
