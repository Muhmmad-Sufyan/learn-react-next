export default function Card({ children, className = '', hover = false, padding = 'md' }) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  }

  return (
    <div
      className={`
        bg-white rounded-2xl border border-neutral-200
        shadow-sm
        ${hover ? 'hover:shadow-md hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200' : ''}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
