import { Suspense } from 'react'
import Container from '@/components/layout/Container'
import ConceptsClient from '@/components/features/ConceptsClient'
import { allConcepts } from '@/lib/concepts'

export const metadata = {
  title: 'All Concepts',
  description: 'Browse all JavaScript, React, and Next.js concepts with quizzes.',
}

// Loading skeleton shown while the client component hydrates
function ConceptsSkeleton() {
  return (
    <section className="py-12 bg-neutral-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 h-48 animate-pulse">
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-20 bg-neutral-100 rounded-full" />
                <div className="h-5 w-16 bg-neutral-100 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-neutral-100 rounded mb-2" />
              <div className="h-4 w-full bg-neutral-50 rounded mb-1" />
              <div className="h-4 w-2/3 bg-neutral-50 rounded" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function ConceptsPage() {
  return (
    <>
      {/* Page header — Server Component, no interactivity needed */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <Container>
          <h1 className="font-heading font-bold text-5xl text-neutral-900 mb-3">
            All Concepts
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl">
            {allConcepts.length} concepts across JavaScript, React, and Next.js — each with full
            explanations, code examples, and a quiz to test real understanding.
          </p>
        </Container>
      </section>

      {/*
        Suspense is required here because ConceptsClient uses useSearchParams().
        Next.js needs Suspense to handle the async nature of reading search params
        during static generation. The skeleton shows while it loads.
      */}
      <Suspense fallback={<ConceptsSkeleton />}>
        <ConceptsClient />
      </Suspense>
    </>
  )
}
