export default function CodeBlock({ code, language = 'javascript' }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-neutral-800">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-neutral-500 font-mono">{language}</span>
      </div>

      {/* Code area */}
      <pre className="overflow-x-auto bg-neutral-900 p-5 text-sm leading-relaxed">
        <code className="font-mono text-neutral-100 whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
