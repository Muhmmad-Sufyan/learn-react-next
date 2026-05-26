import Container from '@/components/layout/Container'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'How to use this learning platform and what to expect.',
}

const path = [
  {
    phase: '01',
    title: 'JavaScript Internals',
    items: ['Execution Context', 'Closures', 'The Event Loop', 'Prototypes', 'Async/Await'],
    note: 'Start here. Everything else depends on this.',
    color: 'bg-accent-100 border-accent-200 text-accent-700',
  },
  {
    phase: '02',
    title: 'React Core',
    items: ['Components & JSX', 'useState', 'useEffect', 'Custom Hooks'],
    note: 'Once you understand JS deeply, React is intuitive.',
    color: 'bg-info-100 border-blue-200 text-info-600',
  },
  {
    phase: '03',
    title: 'Next.js Architecture',
    items: [
      'App Router & File Routing',
      'Server vs Client Components',
      'SSR, SSG, ISR, CSR',
      'Hydration',
    ],
    note: 'The hardest concepts — but now you have the foundation.',
    color: 'bg-primary-100 border-primary-200 text-primary-700',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Container size="sm" className="py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading font-bold text-5xl text-neutral-900 mb-4">
            How to use this
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed">
            This is not a tutorial site. It is a deep-learning platform built on one principle:
            you do not understand something until you can explain it without looking it up.
          </p>
        </div>

        {/* What makes this different */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
          <h2 className="font-heading font-bold text-2xl text-neutral-900 mb-6">
            What makes this different
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: '📖',
                title: 'Concept first',
                desc: 'Every topic starts with WHY it exists and what problem it solves — not just how to use it.',
              },
              {
                icon: '💻',
                title: 'Annotated code',
                desc: 'Every code example has comments that explain what the code does AND why it does it that way.',
              },
              {
                icon: '🧠',
                title: 'Quizzes that test understanding',
                desc: 'The MCQ questions are not about syntax — they ask what happens when, why does this work, what is wrong here.',
              },
              {
                icon: '🔗',
                title: 'Concepts build on each other',
                desc: 'JavaScript first, then React, then Next.js. Each layer assumes the previous one is solid.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The learning path */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8">
          <h2 className="font-heading font-bold text-2xl text-neutral-900 mb-2">
            The recommended path
          </h2>
          <p className="text-neutral-500 text-sm mb-8">Follow this order. Do not skip ahead.</p>

          <div className="space-y-6">
            {path.map((phase, i) => (
              <div key={phase.phase} className="relative">
                {/* Connector line */}
                {i < path.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-8 bg-neutral-200" />
                )}

                <div className={`rounded-2xl border p-6 ${phase.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-heading font-bold text-2xl">{phase.phase}</span>
                    <h3 className="font-heading font-bold text-lg">{phase.title}</h3>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {phase.items.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2 opacity-80">
                        <span>→</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold opacity-70 italic">{phase.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The rule */}
        <div className="bg-primary-900 rounded-2xl p-8 mb-8 text-center">
          <p className="text-primary-300 text-sm font-semibold uppercase tracking-wider mb-3">
            The one rule
          </p>
          <blockquote className="font-heading font-bold text-2xl text-white leading-snug">
            &ldquo;You do not understand something until you can explain it
            without looking it up.&rdquo;
          </blockquote>
          <p className="text-primary-400 text-sm mt-4">
            After each concept, close the tab and try to explain it out loud.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/concepts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors text-base"
          >
            Browse all concepts →
          </Link>
        </div>
      </Container>
    </div>
  )
}
