import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { getCategoryColor, getDifficultyColor } from '@/lib/concepts'

export default function ConceptCard({ concept }) {
  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="group block bg-white rounded-2xl border border-neutral-200 p-6 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Category + difficulty */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={getCategoryColor(concept.category)}>
          {concept.category === 'javascript' ? 'JavaScript'
            : concept.category === 'react' ? 'React'
            : 'Next.js'}
        </Badge>
        <Badge variant={getDifficultyColor(concept.difficulty)}>
          {concept.difficulty}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary-700 transition-colors">
        {concept.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
        {concept.subtitle}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">{concept.readTime} read</span>
        <span className="text-xs text-neutral-400">{concept.mcq?.length ?? 0} quiz questions</span>
      </div>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Start learning <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  )
}
