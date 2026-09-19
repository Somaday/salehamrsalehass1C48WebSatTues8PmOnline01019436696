import './Pagination.css'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="تصفح الصفحات">
      <button
        className="pagination__nav"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="الصفحة السابقة"
      >
        ›
      </button>

      {pages.map((n) => (
        <button
          key={n}
          className={'pagination__num' + (n === page ? ' is-active' : '')}
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </button>
      ))}

      <button
        className="pagination__nav"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="الصفحة التالية"
      >
        ‹
      </button>
    </nav>
  )
}
