import Link from 'next/link'
import Container from './Container'

const categories = [
  { label: 'JavaScript', href: '/concepts?cat=javascript' },
  { label: 'React', href: '/concepts?cat=react' },
  { label: 'Next.js', href: '/concepts?cat=nextjs' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold font-mono">JS</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">Masterclass</span>
            </div>
            <p className="text-sm leading-relaxed">
              Learn React & Next.js deeply — not just how to use them, but how they work internally.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Built for */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Built for</h3>
            <p className="text-sm leading-relaxed">
              Developers who want to go beyond tutorials and understand the real engineering behind modern web apps.
            </p>
            <p className="text-xs mt-4 text-neutral-600">
              Concepts · Quizzes · Code Examples
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-600">
          <span>React & Next.js Masterclass — built to teach deeply</span>
          <span>
            <Link href="/concepts" className="hover:text-neutral-400 transition-colors">
              Start Learning →
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  )
}
