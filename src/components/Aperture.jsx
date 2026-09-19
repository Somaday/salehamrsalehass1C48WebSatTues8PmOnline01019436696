export default function Aperture({ size = 40, animate = true }) {
  return (
    <svg
      className="aperture"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="31" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          className={animate ? 'blade' : ''}
          d="M32 10 L44 30 L32 30 Z"
          fill="var(--blade, var(--amber))"
          style={!animate ? { opacity: 1, transform: `rotate(${i * 72}deg)`, transformOrigin: '32px 32px' } : undefined}
        />
      ))}
      <circle cx="32" cy="32" r="10" fill="var(--bg)" />
    </svg>
  )
}
