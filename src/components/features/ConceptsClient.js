'use client'

// WHY "use client":
// This component uses useSearchParams() and useState — both require the browser.
// The parent page.js is a Server Component that wraps this in Suspense,
// which is required by Next.js whenever useSearchParams() is used.

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ConceptCard from '@/components/features/ConceptCard'
import { allConcepts, categories } from '@/lib/concepts'

const DIFFICULTY_ORDER = { beginner: 0, intermediate: 1, advanced: 2 }

const tabs = [
  { key: 'all', label: 'All Concepts', count: allConcepts.length },
  ...Object.entries(categories).map(([key, cat]) => ({
    key,
    label: cat.label,
    count: cat.count,
  })),
]

export default function ConceptsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') ?? 'all')

  const filtered = useMemo(() => {
    const base =
      activeCategory === 'all'
        ? allConcepts
        : allConcepts.filter((c) => c.category === activeCategory)
    return [...base].sort(
      (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]
    )
  }, [activeCategory])

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    const params = new URLSearchParams()
    if (cat !== 'all') params.set('cat', cat)
    router.replace(
      `/concepts${params.toString() ? '?' + params.toString() : ''}`,
      { scroll: false }
    )
  }

  return (
    <>
      {/* Category tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleCategoryChange(tab.key)}
                className={`
                  shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
                  ${activeCategory === tab.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100'
                  }
                `}
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === tab.key
                    ? 'bg-primary-200 text-primary-800'
                    : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Concept grid */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-neutral-400 text-center py-20">No concepts found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((concept) => (
                <ConceptCard key={concept.slug} concept={concept} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
