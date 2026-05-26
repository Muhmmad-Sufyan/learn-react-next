import { notFound } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Badge from '@/components/ui/Badge'
import CodeBlock from '@/components/features/CodeBlock'
import MCQQuiz from '@/components/features/MCQQuiz'
import {
  getConceptBySlug,
  getAllSlugs,
  getCategoryColor,
  getDifficultyColor,
  allConcepts,
} from '@/lib/concepts'

// Pre-generate all concept pages at build time (SSG)
export async function generateStaticParams() {
  return getAllSlugs()
}

// Dynamic metadata per concept page
export async function generateMetadata({ params }) {
  const { slug } = await params
  const concept = getConceptBySlug(slug)
  if (!concept) return {}
  return {
    title: concept.title,
    description: concept.subtitle,
  }
}

export default async function ConceptPage({ params }) {
  const { slug } = await params
  const concept = getConceptBySlug(slug)

  if (!concept) notFound()

  // Find next concept for navigation
  const currentIdx = allConcepts.findIndex((c) => c.slug === slug)
  const nextConcept = allConcepts[currentIdx + 1] ?? null
  const prevConcept = allConcepts[currentIdx - 1] ?? null

  const categoryLabel =
    concept.category === 'javascript' ? 'JavaScript'
    : concept.category === 'react' ? 'React'
    : 'Next.js'

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Container size="sm" className="py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/concepts" className="hover:text-primary-600 transition-colors">Concepts</Link>
          <span>/</span>
          <Link
            href={`/concepts?cat=${concept.category}`}
            className="hover:text-primary-600 transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-neutral-600">{concept.title}</span>
        </nav>

        {/* Concept header */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={getCategoryColor(concept.category)}>{categoryLabel}</Badge>
            <Badge variant={getDifficultyColor(concept.difficulty)}>{concept.difficulty}</Badge>
            <span className="text-xs text-neutral-400 flex items-center gap-1 ml-1">
              ⏱ {concept.readTime} read
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl text-neutral-900 mb-3">
            {concept.title}
          </h1>
          <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
            {concept.subtitle}
          </p>

          {/* Key points */}
          <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
            <h3 className="text-sm font-bold text-primary-800 mb-3 uppercase tracking-wide">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {concept.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-primary-900">
                  <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
          <h2 className="font-heading font-bold text-2xl text-neutral-900 mb-4">Overview</h2>
          <p className="text-neutral-600 leading-relaxed text-base">{concept.intro}</p>
        </div>

        {/* Content sections */}
        {concept.sections.map((section, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6"
          >
            {/* Section number + title */}
            <div className="flex items-start gap-3 mb-4">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center font-heading">
                {i + 1}
              </span>
              <h2 className="font-heading font-bold text-2xl text-neutral-900">{section.title}</h2>
            </div>

            <p className="text-neutral-600 leading-relaxed mb-4">{section.content}</p>

            {section.code && <CodeBlock code={section.code} language="javascript" />}

            {section.note && (
              <div className="mt-4 bg-accent-50 border border-accent-200 rounded-xl p-4">
                <p className="text-sm text-accent-700 font-medium">{section.note}</p>
              </div>
            )}
          </div>
        ))}

        {/* MCQ Quiz */}
        {concept.mcq?.length > 0 && (
          <div className="mt-10 mb-6">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-3xl text-neutral-900 mb-2">
                Test Your Understanding
              </h2>
              <p className="text-neutral-500">
                {concept.mcq.length} questions — select an answer to see the explanation.
              </p>
            </div>

            {/*
              WHY MCQQuiz is a Client Component:
              - It uses useState (via useQuiz) to track selected answers, current question, score
              - It has click event handlers (onClick on answer buttons)
              - This page (ConceptPage) is a Server Component — it fetches the concept data
              - We pass `questions` as a prop to the Client Component
              - This is the correct Server → Client boundary pattern
            */}
            <MCQQuiz questions={concept.mcq} />
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          {prevConcept ? (
            <Link
              href={`/concepts/${prevConcept.slug}`}
              className="group bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all"
            >
              <span className="text-xs text-neutral-400 mb-1 block">← Previous</span>
              <span className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors text-sm">
                {prevConcept.title}
              </span>
            </Link>
          ) : <div />}

          {nextConcept ? (
            <Link
              href={`/concepts/${nextConcept.slug}`}
              className="group bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all text-right"
            >
              <span className="text-xs text-neutral-400 mb-1 block">Next →</span>
              <span className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors text-sm">
                {nextConcept.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </Container>
    </div>
  )
}
