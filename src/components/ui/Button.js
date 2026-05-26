import Link from 'next/link'

const variants = {
  primary: `
    bg-primary-600 text-white border border-primary-600
    hover:bg-primary-700 hover:border-primary-700
    active:bg-primary-800
    shadow-sm hover:shadow-md
  `,
  secondary: `
    bg-white text-primary-600 border border-primary-200
    hover:bg-primary-50 hover:border-primary-300
    active:bg-primary-100
    shadow-sm
  `,
  accent: `
    bg-accent-500 text-white border border-accent-500
    hover:bg-accent-600 hover:border-accent-600
    active:bg-accent-700
    shadow-sm hover:shadow-md
  `,
  ghost: `
    bg-transparent text-neutral-600 border border-transparent
    hover:bg-neutral-100 hover:text-neutral-900
    active:bg-neutral-200
  `,
  outline: `
    bg-transparent text-primary-600 border border-primary-600
    hover:bg-primary-50
    active:bg-primary-100
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) {
  const classes = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-150 cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
