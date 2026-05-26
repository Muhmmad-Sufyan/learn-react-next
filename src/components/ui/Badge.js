const variants = {
  javascript: 'bg-accent-100 text-accent-700 border border-accent-200',
  react: 'bg-info-100 text-info-600 border border-blue-200',
  nextjs: 'bg-primary-100 text-primary-700 border border-primary-200',
  beginner: 'bg-success-100 text-success-600 border border-green-200',
  intermediate: 'bg-accent-100 text-accent-600 border border-accent-200',
  advanced: 'bg-error-100 text-error-600 border border-red-200',
  default: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5
        text-xs font-semibold rounded-full
        ${variants[variant] ?? variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
