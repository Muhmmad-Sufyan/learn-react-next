import Link from 'next/link'
import Container from '@/components/layout/Container'
import ConceptCard from '@/components/features/ConceptCard'
import { allConcepts, categories } from '@/lib/concepts'

export const metadata = {
  title: 'React & Next.js Masterclass — Learn by Doing',
}

const stats = [
  { value: '15', label: 'Concepts' },
  { value: '3', label: 'Categories' },
  { value: '45+', label: 'Quiz Questions' },
  { value: '100%', label: 'Free' },
]

const featuredSlugs = ['execution-context', 'server-client-components', 'use-effect']
const featuredConcepts = featuredSlugs
  .map((slug) => allConcepts.find((c) => c.slug === slug))
  .filter(Boolean)

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-200">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent-100 blur-3xl opacity-50" />
        </div>

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
              Built for deep learners
            </div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-neutral-900 leading-none mb-6">
              Master{' '}
              <span className="text-primary-600">React</span>{' '}
              &{' '}
              <span className="text-accent-500">Next.js</span>
              <br />
              from the inside out
            </h1>

            {/* Subheading */}
            <p className="text-xl text-neutral-500 leading-relaxed mb-10 max-w-2xl">
              Not just how to use them — but how they actually work. Execution contexts, reconciliation,
              hydration, the event loop. Concepts with real code examples and quizzes that test
              real understanding.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/concepts"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md text-base"
              >
                Start Learning →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:border-primary-200 hover:text-primary-700 transition-colors text-base"
              >
                How it works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Stats bar ===== */}
      <section className="bg-primary-600 border-b border-primary-700">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 py-6 divide-x divide-primary-500">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <div className="font-heading font-bold text-3xl text-white">{s.value}</div>
                <div className="text-sm text-primary-200 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Categories ===== */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl text-neutral-900 mb-3">
              Three learning tracks
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              Each track builds on the previous. JavaScript first — everything else depends on it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(categories).map(([key, cat], i) => (
              <Link
                key={key}
                href={`/concepts?cat=${key}`}
                className="group bg-white rounded-2xl border border-neutral-200 p-8 hover:border-primary-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-neutral-400">0{i + 1}</span>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-lg ${
                    key === 'javascript' ? 'bg-accent-100 text-accent-700'
                    : key === 'react' ? 'bg-info-100 text-info-600'
                    : 'bg-primary-100 text-primary-700'
                  }`}>
                    {cat.icon}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {cat.description}
                </p>
                <span className="text-sm font-semibold text-primary-600">
                  {cat.count} concepts →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Featured concepts ===== */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading font-bold text-4xl text-neutral-900 mb-2">
                Start here
              </h2>
              <p className="text-neutral-500">
                Three concepts every serious developer must understand deeply
              </p>
            </div>
            <Link
              href="/concepts"
              className="hidden sm:inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all 15 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredConcepts.map((concept) => (
              <ConceptCard key={concept.slug} concept={concept} />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA banner ===== */}
      <section className="py-20 bg-primary-900">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">
              Ready to go deep?
            </h2>
            <p className="text-primary-300 text-lg mb-8 leading-relaxed">
              Each concept has a full explanation, annotated code examples, and a quiz that
              tests whether you really understood it — not just read it.
            </p>
            <Link
              href="/concepts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors text-base shadow-lg"
            >
              Browse all concepts →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
