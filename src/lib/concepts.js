import { javascriptConcepts } from '@/data/javascript'
import { reactConcepts } from '@/data/react'
import { nextjsConcepts } from '@/data/nextjs'

export const allConcepts = [...javascriptConcepts, ...reactConcepts, ...nextjsConcepts]

export const categories = {
  javascript: {
    label: 'JavaScript',
    description: 'Core language internals — the engine behind everything',
    icon: 'JS',
    color: 'javascript',
    count: javascriptConcepts.length,
  },
  react: {
    label: 'React',
    description: 'Component model, hooks, and the rendering lifecycle',
    icon: '⚛',
    color: 'react',
    count: reactConcepts.length,
  },
  nextjs: {
    label: 'Next.js',
    description: 'App Router, rendering strategies, and production architecture',
    icon: 'N',
    color: 'nextjs',
    count: nextjsConcepts.length,
  },
}

export function getConceptBySlug(slug) {
  return allConcepts.find((c) => c.slug === slug) ?? null
}

export function getConceptsByCategory(category) {
  if (!category || category === 'all') return allConcepts
  return allConcepts.filter((c) => c.category === category)
}

export function getAllSlugs() {
  return allConcepts.map((c) => ({ slug: c.slug }))
}

export const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }

export function getDifficultyColor(difficulty) {
  return { beginner: 'beginner', intermediate: 'intermediate', advanced: 'advanced' }[difficulty] ?? 'default'
}

export function getCategoryColor(category) {
  return { javascript: 'javascript', react: 'react', nextjs: 'nextjs' }[category] ?? 'default'
}
