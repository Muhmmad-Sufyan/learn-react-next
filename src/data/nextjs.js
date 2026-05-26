export const nextjsConcepts = [
  {
    slug: 'app-router',
    title: 'App Router & File Routing',
    subtitle: 'How Next.js turns your folder structure into a full routing system',
    category: 'nextjs',
    difficulty: 'beginner',
    readTime: '8 min',
    intro:
      'Next.js App Router (introduced in v13) uses your file system as the routing configuration. You don\'t write route definitions — you create folders and files, and Next.js automatically creates routes from them. Every `page.js` becomes a URL. Every `layout.js` wraps its children and persists across navigation. Every `loading.js` shows a skeleton while data loads. This "convention over configuration" approach is one of the most productive ideas in modern web development.',
    keyPoints: [
      'A `page.js` file in a folder defines the route for that URL path',
      'A `layout.js` wraps all pages in its directory and persists across navigation',
      'Dynamic routes use square brackets: `[slug]/page.js`',
      'Special files: loading.js, error.js, not-found.js handle each case automatically',
    ],
    sections: [
      {
        title: 'Folder = Route Segment',
        content:
          'In the App Router, the folder structure inside `src/app/` directly maps to URL paths. A file at `src/app/about/page.js` is accessible at `/about`. A file at `src/app/blog/[slug]/page.js` matches `/blog/anything`. Next.js only creates a public route if the folder contains a `page.js` — other files like `components.js` in the same folder are NOT exposed as routes. Route Groups using `(parentheses)` let you organize folders without affecting the URL.',
        code: `// Folder structure → URL mapping
src/app/
├── page.js              →  /
├── about/
│   └── page.js          →  /about
├── blog/
│   ├── page.js          →  /blog
│   └── [slug]/
│       └── page.js      →  /blog/[any-slug]
├── shop/
│   └── [category]/
│       └── [id]/
│           └── page.js  →  /shop/[category]/[id]
└── (marketing)/         →  Route Group — no URL segment added
    └── home/
        └── page.js      →  /home  (not /marketing/home)

// Special files in any route folder:
// page.js        — the route itself
// layout.js      — persistent wrapper
// loading.js     — Suspense skeleton
// error.js       — error boundary UI
// not-found.js   — 404 UI`,
      },
      {
        title: 'layout.js — Persistent UI',
        content:
          'A `layout.js` file wraps all pages in its directory and persists across navigation between sibling routes — the layout is NOT unmounted and remounted when navigating. This makes the header and sidebar stay visible while only the main content changes, preserving their state and avoiding layout flicker. The root layout (`src/app/layout.js`) is required and must include `<html>` and `<body>` tags.',
        code: `// src/app/layout.js — root layout, required, wraps everything
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>   {/* page.js content renders here */}
        <Footer />
      </body>
    </html>
  )
}

// src/app/dashboard/layout.js — nested layout, only for /dashboard/* routes
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  )
}
// /dashboard/analytics renders: RootLayout > DashboardLayout > analytics page
// Navigating to /dashboard/settings: DashboardLayout persists, only page changes`,
      },
      {
        title: 'Dynamic Routes and Params',
        content:
          'Square brackets in folder names create dynamic route segments that match any value. Multiple dynamic segments can be nested. Catch-all routes use `[...slug]`. In Next.js 15, `params` and `searchParams` are Promises — you must await them. Use `generateStaticParams` to pre-build dynamic routes at build time for better performance.',
        code: `// src/app/concepts/[slug]/page.js
// Matches: /concepts/execution-context, /concepts/closures

// Pre-build these paths at build time (Static Generation)
export async function generateStaticParams() {
  return [
    { slug: 'execution-context' },
    { slug: 'closures' },
    { slug: 'event-loop' },
  ]
}

// In Next.js 15, params is a Promise — must be awaited
export default async function ConceptPage({ params, searchParams }) {
  const { slug } = await params
  const { tab } = await searchParams  // e.g. /concepts/closures?tab=mcq

  const concept = getConcept(slug)
  if (!concept) notFound()  // renders not-found.js

  return (
    <article>
      <h1>{concept.title}</h1>
      {tab === 'mcq' ? <QuizSection mcq={concept.mcq} /> : <Content concept={concept} />}
    </article>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'You create a file at `src/app/products/utils.js`. What URL does this create?',
        options: [
          '/products/utils',
          '/utils',
          'No URL — only files named page.js create routes',
          '/products (utils.js is ignored)',
        ],
        correctIndex: 2,
        explanation:
          'In the App Router, only specifically named files create routes or UI: `page.js`, `layout.js`, `loading.js`, `error.js`, etc. A file named `utils.js` is just a module — it does not create a URL. You can safely co-locate utilities, components, and helpers alongside your page files.',
      },
      {
        question: 'What is special about `layout.js` compared to `page.js`?',
        options: [
          'Layouts are rendered server-side, pages are client-side',
          'Layouts persist and are not unmounted during navigation between sibling routes',
          'Layouts cannot have children',
          'Layouts only wrap the immediate page, not nested routes',
        ],
        correctIndex: 1,
        explanation:
          'When you navigate from `/dashboard/analytics` to `/dashboard/settings`, the `DashboardLayout` is NOT re-rendered — it persists. Only the page content changes. This makes navigation fast and preserves layout state. `page.js` content is replaced on each navigation.',
      },
      {
        question: 'A file at `src/app/blog/[slug]/page.js` — what does `params` contain for the URL `/blog/hello-world`?',
        options: [
          '{ path: "blog/hello-world" }',
          '{ slug: "hello-world" }',
          '["blog", "hello-world"]',
          '{ id: "hello-world" }',
        ],
        correctIndex: 1,
        explanation:
          'The `params` object contains key-value pairs where the key is the dynamic segment name (the bracket name) and the value is the actual URL segment. Since the folder is `[slug]`, the key is `slug`. For `/blog/hello-world`, `params` is `{ slug: "hello-world" }`.',
      },
      {
        question: 'What does a Route Group `(marketing)` in the folder name do?',
        options: [
          'Creates a URL segment called "marketing"',
          'Organizes routes into a group without adding a URL segment — /marketing is not in the URL',
          'Restricts the routes to authenticated users only',
          'Creates a shared layout for all routes in the group',
        ],
        correctIndex: 1,
        explanation:
          'Route Groups (parentheses in folder name) let you organize your file structure into logical groups without affecting the URL. `(marketing)/home/page.js` maps to `/home`, not `/marketing/home`. They are useful for having different layouts for different sections of your app while keeping URLs clean.',
      },
      {
        question: 'What is the purpose of `generateStaticParams` in a dynamic route?',
        options: [
          'It generates random params for testing',
          'It tells Next.js which dynamic route values to pre-render at build time as static HTML',
          'It validates incoming params before the page renders',
          'It sets default values for params when they are undefined',
        ],
        correctIndex: 1,
        explanation:
          '`generateStaticParams` returns an array of param objects that Next.js should pre-render as static HTML at build time. For a `[slug]` route, it returns `[{ slug: "post-1" }, { slug: "post-2" }]`. Without it, dynamic routes are rendered on-demand (SSR). With it, they are pre-built at deploy time for maximum performance.',
      },
    ],
  },

  {
    slug: 'server-client-components',
    title: 'Server vs Client Components',
    subtitle: 'The most important architectural concept in Next.js App Router',
    category: 'nextjs',
    difficulty: 'intermediate',
    readTime: '11 min',
    intro:
      'This is the single most important concept in Next.js App Router — and the one that confuses developers the most. By default, every component in the App Router is a Server Component: it runs on the server, can access databases and secrets directly, and sends pure HTML to the browser (zero JavaScript). When you need interactivity, you add `"use client"` at the top, which makes it a Client Component that runs in the browser. Getting this boundary right is the difference between a fast, secure app and a slow one.',
    keyPoints: [
      'Server Components run only on the server — zero JavaScript sent to browser for them',
      'Client Components run in the browser — they support useState, useEffect, and event handlers',
      '"use client" marks a component and its entire import tree as client-side',
      'Push "use client" as deep as possible — maximize server rendering',
    ],
    sections: [
      {
        title: 'Server Components: The Default',
        content:
          'Server Components are the default in App Router. They run only on the server — they can directly query a database, read environment variables, access the file system, and use server-only secrets. They send pure HTML to the browser with zero JavaScript overhead. They can be `async` functions, which means you can `await` data fetches directly in the component body without useEffect.',
        code: `// src/app/users/page.js — Server Component by default (no "use client")

export default async function UsersPage() {
  // ✓ Direct database access — this code never runs in the browser
  const users = await db.query('SELECT * FROM users LIMIT 20')

  // ✓ Server-only env vars — secret never exposed to client
  const apiKey = process.env.SECRET_API_KEY

  // ✓ await data directly — no useEffect, no loading state needed
  const analytics = await fetch('https://internal-api/stats', {
    headers: { Authorization: \`Bearer \${apiKey}\` }
  }).then(r => r.json())

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} — {analytics.viewsByUser[u.id]} views</li>
      ))}
    </ul>
  )
}

// ✗ NOT available in Server Components:
// useState, useEffect, useContext (any hook)
// onClick, onChange (event handlers)
// window, document, localStorage, navigator`,
      },
      {
        title: 'Client Components: For Interactivity',
        content:
          'Add `"use client"` at the very top of a file to make it a Client Component. It runs in the browser and can use all React hooks, event handlers, and browser APIs. Important: "use client" creates a boundary — the component and everything it imports becomes part of the client JavaScript bundle. The directive only needs to be in the file that first requires client-side features, not in every component file.',
        code: `'use client'   // this must be the FIRST line (before imports)

import { useState, useEffect } from 'react'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) return
    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`)
      .then(r => r.json())
      .then(setResults)
  }, [query])

  return (
    <form>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search concepts..."
      />
      <ul>
        {results.map(r => <li key={r.slug}>{r.title}</li>)}
      </ul>
    </form>
  )
}

// ✗ NOT available in Client Components:
// Direct DB access or file system operations
// Server-only env vars (process.env.SECRET_*)
// async component functions at the top level`,
      },
      {
        title: 'The Golden Rule: Push Client Boundary Deep',
        content:
          'The best architecture: fetch all data in Server Components, pass it as props to a small number of Client Components that handle interactivity. A common mistake is making an entire page a Client Component just because one small button needs state. Instead, extract just the interactive part. You can also pass Server Components as `children` to Client Components — the Server Component renders on the server and its HTML is passed through.',
        code: `// ✓ CORRECT: Server Component fetches, Client Component handles interaction
// src/app/concepts/page.js — Server Component
import FilterableConcepts from '@/components/FilterableConcepts'
import { getAllConcepts } from '@/lib/concepts'

export default async function ConceptsPage() {
  const concepts = await getAllConcepts()   // server-side DB fetch
  return <FilterableConcepts concepts={concepts} />
}

// src/components/FilterableConcepts.js — Client Component (only what needs state)
'use client'
import { useState } from 'react'

export default function FilterableConcepts({ concepts }) {
  const [filter, setFilter] = useState('all')
  const filtered = concepts.filter(c => filter === 'all' || c.category === filter)

  return (
    <div>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
      </select>
      {filtered.map(c => <ConceptCard key={c.slug} concept={c} />)}
    </div>
  )
}
// Benefit: concepts data is fetched on server (fast), only filter UI is client JS`,
      },
    ],
    mcq: [
      {
        question: 'By default, a component in Next.js App Router is a:',
        options: [
          'Client Component — it runs in the browser',
          'Server Component — it runs on the server',
          'Both — it runs in both environments',
          'Neither — you must explicitly declare the type',
        ],
        correctIndex: 1,
        explanation:
          'In the App Router, all components are Server Components by default. You opt into client-side rendering by adding `"use client"` at the top of the file. This is the opposite of the old Pages Router where everything defaulted to client-side.',
      },
      {
        question: 'Which of these can you do in a Server Component but NOT in a Client Component?',
        options: [
          'Use useState',
          'Add an onClick handler',
          'Directly query a database using async/await at the top level',
          'Use the children prop',
        ],
        correctIndex: 2,
        explanation:
          'Server Components can directly access databases, file systems, and server-only environment variables because they run exclusively on the server. Client Components cannot — they run in the browser where there is no database access. Never put secret credentials in a Client Component.',
      },
      {
        question: 'What does the `"use client"` directive affect?',
        options: [
          'Only the one file it is in',
          'The file it is in and all components imported by that file — creating a "client boundary"',
          'It forces the component to render on both server and client (double render)',
          'It is just a comment hint for developers — no runtime effect',
        ],
        correctIndex: 1,
        explanation:
          '"use client" marks a boundary. The file it is in, and everything that file imports, becomes part of the client JavaScript bundle. This is why you should push this boundary as deep as possible — a "use client" near the top of your tree sends too much JavaScript to the browser unnecessarily.',
      },
      {
        question: 'Can a Server Component be an `async` function?',
        options: [
          'No — only Client Components can be async',
          'Yes — Server Components can be async and directly await data fetches',
          'Only if they use a special "async server" directive',
          'Only in Next.js 14 and above',
        ],
        correctIndex: 1,
        explanation:
          'Server Components can be `async` functions — this is one of their biggest advantages. You can `await` database calls, fetch requests, or file reads directly in the component body without `useEffect`. The component suspends until the data is ready, and Next.js renders the HTML server-side. Client Components cannot be async in the same way.',
      },
      {
        question: 'What is the "children pattern" for using Server Components inside Client Components?',
        options: [
          'You cannot use Server Components inside Client Components',
          'Import the Server Component directly into the Client Component',
          'Pass the Server Component as a `children` prop to the Client Component from a Server Component parent',
          'Use React.lazy() to load the Server Component',
        ],
        correctIndex: 2,
        explanation:
          'You cannot import a Server Component directly inside a Client Component file (the import would pull it into the client bundle). But you CAN receive a Server Component as `children` from a Server Component parent. The Server Component renders on the server and its HTML output is passed through the Client Component. Example: `<ClientWrapper>{/* Server Component JSX */}</ClientWrapper>` in a Server Component.',
      },
    ],
  },

  {
    slug: 'rendering-strategies',
    title: 'SSR, SSG, ISR & CSR',
    subtitle: 'Four ways to render a page — choosing the right one matters',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '11 min',
    intro:
      'Next.js gives you four rendering strategies, and choosing the right one for each page is a core engineering skill. SSR generates HTML on every request. SSG generates HTML once at build time. ISR regenerates pages in the background after a time interval. CSR skips server HTML entirely and renders in the browser. These are not global settings — you choose per page, and even mix strategies within one page using Suspense boundaries.',
    keyPoints: [
      'SSG: HTML at build time — fastest delivery, great for infrequently changing content',
      'SSR: HTML per request — always fresh, slower than static, needed for user-specific content',
      'ISR: Static HTML that regenerates in the background after a time interval',
      'CSR: No server HTML, renders in the browser — used for highly interactive dashboards',
    ],
    sections: [
      {
        title: 'SSG — Static Generation (The Fast Default)',
        content:
          'In Next.js App Router, Server Components that fetch data with `fetch()` are statically generated by default — the data is fetched at build time and the HTML is cached. This means the page is served instantly from a CDN, with no server computation on each request. Use this for content that does not change often: blog posts, documentation, marketing pages, and course content like this site.',
        code: `// This page is STATICALLY GENERATED by default
// Next.js fetches this data ONCE at build time and caches the HTML
export default async function BlogPost({ params }) {
  const { slug } = await params

  const post = await fetch(\`https://cms.example.com/posts/\${slug}\`)
    .then(r => r.json())
  // This fetch is cached at build time — no re-fetch on each request

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

// Tell Next.js which slugs to pre-build
export async function generateStaticParams() {
  const posts = await fetch('https://cms.example.com/posts').then(r => r.json())
  return posts.map(p => ({ slug: p.slug }))
}

// Result: zero server compute per request. Served from CDN edge.`,
      },
      {
        title: 'SSR and ISR',
        content:
          'SSR generates fresh HTML on every request — use it for user-specific data, real-time prices, or content that must never be stale. To opt into SSR, use dynamic APIs like `cookies()`, `headers()`, or `searchParams`, or export `dynamic = "force-dynamic"`. ISR is the middle ground: serve static HTML instantly but regenerate it in the background every N seconds. Use `export const revalidate = N` for time-based ISR, or `revalidatePath()` for on-demand ISR (triggered by a CMS webhook).',
        code: `// SSR — dynamic page (re-renders on every request)
import { cookies } from 'next/headers'

export default async function Dashboard() {
  const cookieStore = await cookies()  // using cookies() opts into SSR automatically
  const sessionId = cookieStore.get('session')?.value

  const user = await getUserFromSession(sessionId)

  return <h1>Welcome back, {user.name}</h1>  // fresh on every request
}

// ISR — static HTML, regenerated every 60 seconds in the background
export const revalidate = 60

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await fetch(\`/api/products/\${id}\`).then(r => r.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: \${product.price}</p>
      {/* Might be up to 60 seconds stale — fine for most products */}
    </div>
  )
}

// On-demand revalidation (e.g., triggered by CMS webhook):
// import { revalidatePath } from 'next/cache'
// revalidatePath('/products/[id]')   // purge a dynamic path
// revalidatePath('/blog', 'page')    // purge all blog pages`,
      },
      {
        title: 'Mixing Strategies with Suspense',
        content:
          'You can mix strategies within one page using React Suspense. The static shell (layout, navigation) is served immediately from the CDN. Dynamic, user-specific sections stream in from the server as they resolve. This is called "Partial Prerendering" (PPR) in Next.js 15 — the ultimate hybrid where a single page is partially static and partially dynamic.',
        code: `import { Suspense } from 'react'

// The static parts render immediately from CDN
export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await getProduct(id)  // cached — static

  return (
    <div>
      <h1>{product.name}</h1>       {/* static — served immediately */}
      <p>{product.description}</p>  {/* static — served immediately */}

      {/* Dynamic parts stream in as they resolve */}
      <Suspense fallback={<p>Loading price...</p>}>
        <LivePrice productId={id} />   {/* always fresh — SSR stream */}
      </Suspense>

      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewSection productId={id} />  {/* ISR — revalidate: 300 */}
      </Suspense>
    </div>
  )
}

// async Server Component — streams in after resolution
async function LivePrice({ productId }) {
  // force-dynamic because prices change constantly
  const price = await fetch(\`/api/prices/\${productId}\`, { cache: 'no-store' })
    .then(r => r.json())
  return <p className="price">\${price.current}</p>
}`,
      },
    ],
    mcq: [
      {
        question: 'Which rendering strategy generates HTML at BUILD TIME, not per request?',
        options: [
          'SSR (Server-Side Rendering)',
          'CSR (Client-Side Rendering)',
          'SSG (Static Site Generation)',
          'ISR (Incremental Static Regeneration)',
        ],
        correctIndex: 2,
        explanation:
          'SSG (Static Site Generation) generates HTML once when you run `next build`. The resulting HTML files are served directly from a CDN with no server computation per request — making it the fastest option. ISR also produces static HTML, but regenerates it periodically after deployment.',
      },
      {
        question: 'A product page shows real-time stock levels that change every minute. Best strategy?',
        options: [
          'SSG — build it once and never re-render',
          'ISR with revalidate: 60 — serve static HTML, regenerate every 60 seconds',
          'CSR — render everything in the browser with useEffect + fetch',
          'SSR — generate fresh HTML on every single request',
        ],
        correctIndex: 1,
        explanation:
          'ISR with 60-second revalidation is ideal: most visitors see static HTML from cache (fast!), and the page automatically refreshes in the background every minute. SSR generates HTML on every request (slower and more expensive). CSR has poor initial load performance and no SEO.',
      },
      {
        question: 'What automatically triggers dynamic rendering (SSR) for a Next.js page?',
        options: [
          'Using useState in the page component',
          'Accessing dynamic APIs like cookies(), headers(), or searchParams',
          'Having more than 5 components on the page',
          'Using fetch() in the component',
        ],
        correctIndex: 1,
        explanation:
          'Using dynamic APIs like `cookies()`, `headers()`, or the `searchParams` prop opts a page into dynamic rendering because those values can only be known at request time. `fetch()` by itself does NOT make a page dynamic — it is statically fetched and cached at build time unless you configure otherwise with `cache: "no-store"` or `dynamic = "force-dynamic"`.',
      },
      {
        question: 'What does `export const revalidate = 60` do?',
        options: [
          'Runs the page component every 60 seconds',
          'Sends a cache-control header of 60 seconds to the browser',
          'Configures ISR — Next.js regenerates the static page in the background after 60 seconds',
          'Retries failed data fetches every 60 seconds',
        ],
        correctIndex: 2,
        explanation:
          '`export const revalidate = 60` enables Incremental Static Regeneration. The page is served as static HTML. After 60 seconds, the next visitor gets the stale cached version while Next.js regenerates the page in the background. The visitor after that gets the fresh version. This is the "stale-while-revalidate" pattern.',
      },
      {
        question: 'What is the difference between `cache: "no-store"` and `revalidate: 0` in fetch()?',
        options: [
          'They are identical — both opt out of caching',
          '`no-store` skips the cache entirely on every request; `revalidate: 0` marks data as stale immediately but can still use a stale-while-revalidate pattern',
          '`no-store` is for API routes; `revalidate: 0` is for pages',
          '`revalidate: 0` deletes the cache; `no-store` does not delete it',
        ],
        correctIndex: 1,
        explanation:
          'Both opt out of caching but with slightly different semantics. `{ cache: "no-store" }` tells Next.js to never store the response in any cache. `{ next: { revalidate: 0 } }` marks the response as always stale, still eligible for caching infrastructure but treated as if it expires immediately. In practice, `no-store` is the clearest way to force SSR behavior on a specific fetch call.',
      },
    ],
  },

  {
    slug: 'hydration',
    title: 'Hydration',
    subtitle: 'How server-rendered HTML becomes an interactive React app',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '9 min',
    intro:
      'When Next.js renders a page on the server, it sends HTML to the browser. The user sees content immediately — but it\'s static. Hydration is the process where React runs in the browser, attaches event listeners to the existing server-rendered HTML, and makes it interactive. Understanding hydration explains why you see hydration errors, why component output must match between server and client, and why "use client" boundaries matter for performance.',
    keyPoints: [
      'The server sends HTML (visible immediately), then React hydrates it in the browser',
      'Hydration errors occur when server and client render different HTML output',
      'Client Components must produce identical output on first browser render as the server did',
      'Selective hydration lets React prioritize interactive sections over non-interactive ones',
    ],
    sections: [
      {
        title: 'The Three Phases of a Page Load',
        content:
          'Understanding hydration requires understanding three phases. Phase 1: Server renders HTML. Phase 2: Browser receives and displays the HTML immediately (First Contentful Paint). Phase 3: React downloads, runs, "walks" the DOM, and attaches event listeners (Time to Interactive). The gap between Phase 2 and Phase 3 is when content is visible but not interactive — minimize it by reducing client JavaScript.',
        code: `// Phase 1: Server renders HTML (fast — no client JS needed)
// Server produces this HTML string:
// <html><body><h1>Hello Sufyan</h1><button>Click me (0)</button></body></html>

// Phase 2: Browser receives HTML
// → User SEES content immediately ✓ (First Contentful Paint)
// → Button is visible but does nothing — no JavaScript yet

// Phase 3: React hydrates
// → Client downloads the React bundle (~40-200KB)
// → React.createRoot().hydrate() "walks" the existing DOM
// → React matches DOM elements to its virtual DOM tree
// → Event listeners attached: button.addEventListener('click', handleClick)
// → App is now fully interactive ✓ (Time to Interactive)

// Why SSR + hydration > pure CSR:
// CSR: blank white screen → JS loads → React renders → interactive
// SSR: content shown IMMEDIATELY → JS loads → hydration → interactive
//                ↑ this is why SSR wins on perceived performance`,
      },
      {
        title: 'Hydration Errors',
        content:
          'A hydration error occurs when React\'s server output and the first client render produce different HTML. React compares them node by node — if they differ, it cannot safely hydrate and throws an error in development, or silently replaces the HTML in production (causing a flash). The most common causes: using `window`, `document`, or `navigator` (unavailable on server), dynamic values like `new Date()`, random numbers, or browser extensions modifying the DOM.',
        code: `// ✗ CAUSES HYDRATION ERROR:
'use client'
export default function BadComponent() {
  // window.innerWidth is not available on the server
  // Server renders nothing/undefined; client renders the number → MISMATCH
  return <p>Width: {window.innerWidth}px</p>
}

// ✓ FIX 1: useState + useEffect (mount guard pattern)
'use client'
import { useState, useEffect } from 'react'

export default function GoodComponent() {
  const [width, setWidth] = useState(null)  // null on both server AND first client render ✓

  useEffect(() => {
    setWidth(window.innerWidth)  // runs only in browser, after hydration
  }, [])

  if (width === null) return null  // same output as server

  return <p>Width: {width}px</p>  // renders after hydration
}

// ✓ FIX 2: suppressHydrationWarning for intentionally dynamic values
export default function Timestamp() {
  return <time suppressHydrationWarning>{new Date().toLocaleString()}</time>
}`,
      },
      {
        title: 'Selective Hydration and Streaming',
        content:
          'React 18 + Next.js App Router introduced selective hydration with Suspense. Parts of the page wrapped in `<Suspense>` hydrate independently and in priority order. If a user clicks a component that hasn\'t hydrated yet, React prioritizes hydrating it first. This means users can interact with the most important parts of the page earlier, even if the full page hasn\'t loaded.',
        code: `import { Suspense } from 'react'

// The static, non-interactive content renders and hydrates immediately
// The heavy interactive sections hydrate independently
export default function ProductPage({ params }) {
  return (
    <div>
      <ProductInfo />      {/* lightweight — hydrates first */}

      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewSection />  {/* heavy — hydrates independently, lower priority */}
      </Suspense>

      <Suspense fallback={<p>Loading recommendations...</p>}>
        <Recommendations />  {/* heavy — hydrates independently */}
      </Suspense>
    </div>
  )
}

// Hydration priority: if user clicks on ReviewSection before it hydrates,
// React immediately prioritizes hydrating ReviewSection over Recommendations.
// This is "selective hydration" — user interaction drives hydration order.

// To completely skip hydration for a component (pure static HTML):
// import dynamic from 'next/dynamic'
// const StaticComponent = dynamic(() => import('./Component'), { ssr: true, hydrate: false })`,
      },
    ],
    mcq: [
      {
        question: 'What is hydration in Next.js?',
        options: [
          'Fetching data on the client after page load',
          'Converting TypeScript to JavaScript during build',
          'React attaching event listeners to server-rendered HTML to make it interactive',
          'Optimizing images for different screen sizes',
        ],
        correctIndex: 2,
        explanation:
          'Hydration is where React runs in the browser and "activates" the static HTML the server sent. React walks the existing DOM, matches elements to its component tree, and attaches event listeners and state — transforming static HTML into a fully interactive React application.',
      },
      {
        question: 'What causes a hydration mismatch error?',
        options: [
          'Having too many components on a page',
          'The server and client rendering different HTML for the same component',
          'Using Server Components alongside Client Components',
          'Using async/await in a Server Component',
        ],
        correctIndex: 1,
        explanation:
          'A hydration mismatch occurs when React\'s server output and the first client render produce different HTML. This usually happens when using browser-only APIs (`window`, `localStorage`) or dynamic values (random numbers, current date) during the initial render that produce different values on server vs. client.',
      },
      {
        question: 'Why is SSR + hydration better for users than pure CSR (Client-Side Rendering)?',
        options: [
          'SSR + hydration uses less total JavaScript',
          'With SSR, users see content from the server HTML immediately, rather than a blank page while JS loads',
          'SSR prevents all JavaScript errors',
          'CSR cannot be used with React',
        ],
        correctIndex: 1,
        explanation:
          'With CSR, the user sees a blank page until React downloads and renders — which can be 2-5 seconds on slow connections. With SSR, the server sends fully-rendered HTML immediately, so users see content as soon as the HTML arrives. React hydrates in the background. This dramatically improves First Contentful Paint (FCP) and perceived performance.',
      },
      {
        question: 'The "mount guard" pattern (`const [mounted, setMounted] = useState(false)`) solves which problem?',
        options: [
          'Preventing components from re-rendering too many times',
          'Preventing hydration mismatches for client-only values by rendering null until after hydration',
          'Ensuring effects run before the first render',
          'Making Server Components aware of client-side state',
        ],
        correctIndex: 1,
        explanation:
          'The mount guard pattern renders `null` (or a placeholder) on the first render — matching what the server rendered (since the server also sees null-initial state). After `useEffect` fires (which only runs in the browser, post-hydration), `mounted` is set to `true` and the client-specific content renders. This eliminates the server/client HTML mismatch.',
      },
      {
        question: 'What does `suppressHydrationWarning` do?',
        options: [
          'Disables hydration entirely for the element',
          'Silences React\'s warning for intentionally different server/client content on that specific element',
          'Speeds up hydration by skipping validation',
          'Marks the element as server-only',
        ],
        correctIndex: 1,
        explanation:
          '`suppressHydrationWarning={true}` tells React to expect and silently accept a hydration mismatch for that specific element. Use it sparingly for elements with content that is intentionally dynamic between server and client, like timestamps formatted with the user\'s local timezone. It does not skip hydration — it just suppresses the warning.',
      },
    ],
  },

  {
    slug: 'server-actions',
    title: 'Server Actions',
    subtitle: 'Running server-side code from form submissions and event handlers',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '10 min',
    intro:
      'Server Actions are async functions that run on the server but can be called from Client Components. They are the modern way to handle form submissions, data mutations, and server-side operations without writing API routes. You mark a function with `"use server"` and Next.js handles the network boundary automatically — when called from the client, it sends a POST request to the server, runs the function, and returns the result. This dramatically simplifies the data mutation story in Next.js.',
    keyPoints: [
      'Server Actions run on the server but can be invoked from Client Components and form actions',
      '"use server" marks an async function or an entire module as a Server Action',
      'After a mutation, call revalidatePath() or revalidateTag() to update cached data',
      'useFormState and useFormStatus provide form state management for Server Action forms',
    ],
    sections: [
      {
        title: 'Creating Server Actions',
        content:
          'A Server Action is an async function with `"use server"` at the top. You can define them inline in Server Components or in separate action files (best practice). When called, Next.js automatically creates a secure server endpoint — you never expose the function signature or implementation to the client. Server Actions can read form data, access the database, set cookies, and redirect.',
        code: `// actions/user.js — a file of server actions
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export async function createUser(formData) {
  // formData is a FormData object when called from a form action
  const name = formData.get('name')
  const email = formData.get('email')

  // Validate
  if (!name || !email) {
    return { error: 'Name and email are required' }
  }

  // Database operation — runs on server, no API route needed
  const user = await db.users.create({ data: { name, email } })

  // Invalidate cached data so the user list re-fetches
  revalidatePath('/users')

  // Redirect to the new user's profile
  redirect(\`/users/\${user.id}\`)
}

export async function deleteUser(userId) {
  await db.users.delete({ where: { id: userId } })
  revalidatePath('/users')
}`,
      },
      {
        title: 'Using Server Actions in Forms',
        content:
          'The simplest use of Server Actions is the `action` prop on a `<form>` element. When the form is submitted, the browser calls the Server Action with the FormData. This works even without JavaScript enabled! For programmatic calls (button clicks, not form submits), import the action and call it directly. For error handling and pending states, use `useFormState` and `useFormStatus` (React 19: `useActionState`).',
        code: `// Server Component — form with Server Action (works without JS!)
import { createUser } from '@/actions/user'

export default function CreateUserPage() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>
  )
}

// Client Component — programmatic call with feedback
'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createUser } from '@/actions/user'

function SubmitButton() {
  const { pending } = useFormStatus()  // true while action is running
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </button>
  )
}

export default function CreateUserForm() {
  const [state, formAction] = useFormState(createUser, null)
  return (
    <form action={formAction}>
      {state?.error && <p className="error">{state.error}</p>}
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <SubmitButton />
    </form>
  )
}`,
      },
      {
        title: 'Revalidation After Mutations',
        content:
          'After a Server Action mutates data (create, update, delete), you need to tell Next.js to refresh the cached data so the UI reflects the changes. `revalidatePath(path)` invalidates the full-route cache for a specific URL path. `revalidateTag(tag)` is more granular — you tag fetch calls and invalidate by tag. This is the data mutation loop in Next.js: mutate → revalidate → re-render.',
        code: `'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { db } from '@/lib/db'

// Tag-based revalidation (more granular)
export async function updateProduct(id, data) {
  await db.products.update({ where: { id }, data })

  // Invalidate all fetches tagged with 'products'
  revalidateTag('products')
  // Invalidate the specific product page
  revalidatePath(\`/products/\${id}\`)
}

// In the fetch that retrieves products:
// fetch('/api/products', { next: { tags: ['products'] } })
// ↑ This fetch is now linked to the 'products' tag

// Example mutation flow:
// 1. User clicks "Delete Product" button
// 2. deleteProduct(id) Server Action runs on server
// 3. DB record is deleted
// 4. revalidatePath('/products') invalidates cached product list HTML
// 5. Next request to /products triggers fresh data fetch
// 6. Updated product list is rendered and served`,
      },
    ],
    mcq: [
      {
        question: 'What does `"use server"` do when placed at the top of a function?',
        options: [
          'Marks the function as a Server Component',
          'Marks the async function as a Server Action — it runs on the server but can be called from client code',
          'Prevents the function from being bundled with client JavaScript',
          'Makes the function run during build time only',
        ],
        correctIndex: 1,
        explanation:
          '`"use server"` marks an async function as a Server Action. When called from client code, Next.js automatically creates a secure POST endpoint on the server. The function runs server-side with full access to databases and secrets. It can be defined inline in Server Components or in dedicated action files.',
      },
      {
        question: 'What is the main benefit of Server Actions over traditional API Routes for mutations?',
        options: [
          'Server Actions are faster because they skip the HTTP layer entirely',
          'Server Actions eliminate the need to write separate API route files for common mutations — the server function is defined alongside the component that uses it',
          'Server Actions automatically validate input data',
          'Server Actions can run without a server (edge-compatible)',
        ],
        correctIndex: 1,
        explanation:
          'With API Routes, you write a route handler (`/api/create-user`), then a client fetch to that route, then handle the response. With Server Actions, you write one async function, import it, and call it directly — Next.js handles the server/client boundary automatically. This is dramatically less boilerplate for common CRUD operations.',
      },
      {
        question: 'After a Server Action mutates data, what must you do to update the cached UI?',
        options: [
          'Nothing — React automatically re-renders when mutations happen',
          'Call revalidatePath() or revalidateTag() to invalidate the cached HTML/data',
          'Reload the page programmatically with window.location.reload()',
          'Set a state variable in the client to trigger a refetch',
        ],
        correctIndex: 1,
        explanation:
          'Next.js aggressively caches data. After a mutation, the cached pages still show old data until you invalidate them. `revalidatePath(path)` marks a specific route\'s cache as stale, triggering a re-fetch on the next request. `revalidateTag(tag)` invalidates all fetch calls with a specific tag. Without revalidation, users would see stale data.',
      },
      {
        question: 'When a `<form>` has an `action={serverAction}`, what does the Server Action receive as its argument?',
        options: [
          'A plain JavaScript object of field names and values',
          'A FormData object containing all the form\'s field values',
          'A JSON string of the form data',
          'An event object like onClick handlers receive',
        ],
        correctIndex: 1,
        explanation:
          'When invoked via a form\'s `action` prop, the Server Action receives a `FormData` object. You access values with `formData.get("fieldName")`. This matches the native Web Platform FormData API. For programmatic calls (not form submits), you can pass any arguments directly.',
      },
      {
        question: 'What does `useFormStatus()` return and how is it used?',
        options: [
          'It returns the form\'s current field values',
          'It returns { pending: boolean } — true while the Server Action is in flight, used to show loading states',
          'It returns the Server Action\'s return value',
          'It returns validation errors from the Server Action',
        ],
        correctIndex: 1,
        explanation:
          '`useFormStatus()` is a React hook that reads the status of the parent form\'s Server Action submission. It returns `{ pending: boolean }` — `pending` is `true` while the action is running. Use it inside the form to disable the submit button or show a spinner. It must be called inside a component that is a child of the `<form>` element.',
      },
    ],
  },

  {
    slug: 'data-fetching-caching',
    title: 'Data Fetching & Caching',
    subtitle: 'How Next.js caches, deduplicates, and revalidates fetched data',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '10 min',
    intro:
      'Next.js has a sophisticated multi-layer caching system built on top of the native `fetch()` API. Understanding it is essential for performance — by default, fetches are cached aggressively. Knowing when and how to opt out prevents stale data bugs. The caching layers are: request memoization (deduplication within one request), the Data Cache (persistent across requests), and the Full Route Cache (cached HTML). Each layer has different lifetimes and invalidation mechanisms.',
    keyPoints: [
      'fetch() in Next.js extends the native fetch with caching configuration options',
      'By default, fetch results are cached permanently (force-cache) and shared across requests',
      'Use { cache: "no-store" } or { next: { revalidate: N } } to control caching',
      'Request memoization deduplicates identical fetch calls within a single server render',
    ],
    sections: [
      {
        title: 'The fetch() Cache in Next.js',
        content:
          'Next.js extends the native `fetch()` with additional caching options via the `next` object. The default behavior (`force-cache`) stores the response in the Data Cache and reuses it across all requests until explicitly revalidated. Use `cache: "no-store"` to always fetch fresh data (SSR behavior). Use `next: { revalidate: N }` for time-based ISR — the data is cached for N seconds.',
        code: `// DEFAULT: cached indefinitely (static data at build time)
const data = await fetch('/api/concepts')  // cache: "force-cache" implicit

// NO CACHE: fresh on every request (SSR)
const freshData = await fetch('/api/realtime', {
  cache: 'no-store'
})

// REVALIDATE: cached for N seconds (ISR)
const product = await fetch(\`/api/products/\${id}\`, {
  next: { revalidate: 60 }  // refresh every 60 seconds
})

// TAG: cache with a tag for on-demand revalidation
const users = await fetch('/api/users', {
  next: { tags: ['users'] }  // can be invalidated with revalidateTag('users')
})

// Equivalent route-level config (applies to ALL fetches in the page):
export const revalidate = 60     // all fetches revalidate every 60s
export const dynamic = 'force-dynamic'  // all fetches use no-store`,
      },
      {
        title: 'Request Memoization',
        content:
          'Within a single server render, Next.js automatically deduplicates identical `fetch()` calls. If two Server Components both call `fetch("/api/user/1")` with the same options, the second call returns the cached result from the first — only one network request is made. This lets you fetch data directly where you need it without worrying about prop drilling or redundant requests.',
        code: `// Both components fetch the same user — only ONE network request is made
// Next.js deduplicates within the same server render

// src/app/layout.js (Server Component)
async function RootLayout({ children }) {
  const user = await getUser()  // fetch('/api/me') — request 1
  return (
    <html>
      <body>
        <Header user={user} />
        {children}
      </body>
    </html>
  )
}

// src/app/dashboard/page.js (Server Component, same render)
async function DashboardPage() {
  const user = await getUser()  // fetch('/api/me') — DEDUPLICATED, no extra request!
  return <h1>Welcome, {user.name}</h1>
}

// This is why you should fetch data where you use it in Server Components:
// No performance cost from "double fetching" — memoization handles it automatically.

async function getUser() {
  return fetch('/api/me').then(r => r.json())
  // The URL + options are the cache key. Same URL = same cached response.
}`,
      },
      {
        title: 'Parallel and Sequential Data Fetching',
        content:
          'Server Components can fetch data in parallel with `Promise.all()` for maximum performance. Sequential fetching is sometimes unavoidable (when one fetch depends on the result of another). Avoid waterfalls — fetches that chain unnecessarily. Use React Suspense boundaries to stream independent sections rather than waiting for all data before rendering.',
        code: `// PARALLEL: all three fetches start simultaneously
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    fetch('/api/me').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/analytics').then(r => r.json()),
  ])
  // Total time = max(user, posts, analytics), not sum of all three
  return <DashboardView user={user} posts={posts} analytics={analytics} />
}

// SEQUENTIAL: only when second depends on first
async function UserPosts() {
  const user = await getUser()              // must happen first
  const posts = await getUserPosts(user.id) // needs user.id
  return posts.map(p => <PostCard key={p.id} post={p} />)
}

// WATERFALL PREVENTION: fetch data independently with Suspense
async function Page() {
  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserInfo />     {/* fetches user independently */}
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <PostList />     {/* fetches posts independently — no waiting for user */}
      </Suspense>
    </div>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'In Next.js, what is the default caching behavior of fetch()?',
        options: [
          'No caching — always fetches fresh data',
          'Cached for 1 hour',
          'Cached indefinitely (force-cache) — the response is stored and reused',
          'Cached only for the duration of the request',
        ],
        correctIndex: 2,
        explanation:
          'By default, Next.js fetch() uses `force-cache` — the response is stored in the Data Cache and reused across all subsequent requests, potentially forever, until explicitly revalidated. This is intentional for SSG: fetch once at build time, serve cached HTML to all users. You must explicitly opt out with `cache: "no-store"` or `revalidate: N`.',
      },
      {
        question: 'What is "request memoization" in Next.js?',
        options: [
          'Storing fetch results in Redis',
          'Deduplicating identical fetch() calls within a single server render — multiple components fetching the same URL make only one network request',
          'Caching fetch results across deployments',
          'Preventing refetching when the user navigates back',
        ],
        correctIndex: 1,
        explanation:
          'Request memoization is automatic per-render deduplication. If components A and B both call `fetch("/api/user")` during the same server render, Next.js makes only one actual network request and returns the same cached result to both. This lets you fetch data directly where you need it without creating centralized data-fetching logic.',
      },
      {
        question: 'You call `revalidateTag("products")`. What happens?',
        options: [
          'All cached pages are cleared',
          'All fetch() calls that were tagged with `{ next: { tags: ["products"] } }` have their cached responses invalidated',
          'The products database table is refreshed',
          'Product pages are rebuilt immediately in the background',
        ],
        correctIndex: 1,
        explanation:
          '`revalidateTag()` invalidates the Data Cache entries for all fetch calls that used that tag. The next request to a page that calls one of those tagged fetches will get fresh data from the origin. The rebuild happens on-demand, not immediately — the old cached response is discarded and a new one is fetched on the next request.',
      },
      {
        question: 'What is a "fetch waterfall" and why should you avoid it?',
        options: [
          'Multiple fetches running in parallel — they compete for bandwidth',
          'Fetches that run sequentially when they could run in parallel, causing unnecessary wait time',
          'A fetch that retries on failure',
          'A fetch inside a loop that runs more times than necessary',
        ],
        correctIndex: 1,
        explanation:
          'A waterfall occurs when fetches run one after another even though they are independent. Total load time becomes the SUM of all fetch times instead of the MAX. Fix: use `Promise.all()` for independent fetches. Sequential fetching (waterfalls) is only acceptable when one fetch genuinely depends on the result of another.',
      },
      {
        question: 'How do you make a single fetch() call opt into SSR (always fresh) while the rest of the page is static?',
        options: [
          'Add `export const dynamic = "force-dynamic"` to the page',
          'Pass `{ cache: "no-store" }` to that specific fetch call and wrap the component in Suspense',
          'Move the fetch to a Client Component useEffect',
          'Add "use server" to the component that calls fetch',
        ],
        correctIndex: 1,
        explanation:
          '`{ cache: "no-store" }` opts one specific fetch out of the Data Cache. Wrapping the component that uses this fetch in `<Suspense>` isolates it from the static shell — the rest of the page can still be statically cached. This is the "partial prerendering" pattern: static shell + dynamic islands.',
      },
    ],
  },

  {
    slug: 'route-handlers',
    title: 'API Route Handlers',
    subtitle: 'Building server-side API endpoints in the App Router',
    category: 'nextjs',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'Route Handlers are the App Router equivalent of Pages Router API Routes. They let you create HTTP endpoints (`GET`, `POST`, `PUT`, `DELETE`, etc.) that run on the server. A `route.js` file inside `src/app/` creates an API endpoint at that path. Route Handlers are useful for webhooks, OAuth callbacks, custom API responses, and situations where a Server Action isn\'t appropriate (like a third-party service that needs to call your server).',
    keyPoints: [
      'A `route.js` file creates an API endpoint — export async functions named GET, POST, etc.',
      'Route Handlers receive a NextRequest and return a NextResponse',
      'GET Route Handlers are cached by default — use cache: "no-store" for dynamic responses',
      'Dynamic routes work the same as page routes: `[id]/route.js` matches `/api/users/123`',
    ],
    sections: [
      {
        title: 'Creating Route Handlers',
        content:
          'Create a `route.js` (or `route.ts`) file in your `src/app/` directory. Export named async functions corresponding to HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. Next.js automatically routes requests to the right function. Return a `Response` or use `NextResponse` for convenience methods like `NextResponse.json()`.',
        code: `// src/app/api/users/route.js

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Handles GET /api/users
export async function GET(request) {
  try {
    const users = await db.users.findMany()
    return NextResponse.json(users)  // Content-Type: application/json automatically
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// Handles POST /api/users
export async function POST(request) {
  try {
    const body = await request.json()  // parse JSON body
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const user = await db.users.create({ data: { name, email } })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}`,
      },
      {
        title: 'Dynamic Routes and Request Handling',
        content:
          'Dynamic route handlers follow the same `[param]` convention as pages. The second argument to the handler function is a context object with `params`. You can also read query string parameters, headers, and cookies from the `NextRequest` object. Set custom response headers and status codes in `NextResponse`.',
        code: `// src/app/api/users/[id]/route.js

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/users/123
export async function GET(request, { params }) {
  const { id } = await params  // Next.js 15: params is a Promise

  // Access query params: /api/users/123?include=posts
  const { searchParams } = new URL(request.url)
  const include = searchParams.get('include')

  const user = await db.users.findUnique({
    where: { id: Number(id) },
    include: include === 'posts' ? { posts: true } : undefined
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

// DELETE /api/users/123
export async function DELETE(request, { params }) {
  const { id } = await params

  // Check authorization header
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await db.users.delete({ where: { id: Number(id) } })
  return new Response(null, { status: 204 })  // 204 No Content
}`,
      },
      {
        title: 'Webhooks, CORS, and Edge Cases',
        content:
          'Common Route Handler patterns: verifying webhook signatures (Stripe, GitHub), setting CORS headers for cross-origin requests, reading raw request bodies, and handling file uploads with FormData. For performance, Route Handlers can be deployed to the Edge Runtime with `export const runtime = "edge"` — they run on Cloudflare Workers/Vercel Edge with global low latency.',
        code: `// Webhook handler (Stripe example)
export async function POST(request) {
  const rawBody = await request.text()  // raw string for signature verification
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    await fulfillOrder(event.data.object)
  }

  return NextResponse.json({ received: true })
}

// CORS headers for a public API
export async function GET(request) {
  const data = await getPublicData()

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=60',
    }
  })
}

// OPTIONS handler required for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}`,
      },
    ],
    mcq: [
      {
        question: 'What file creates an API Route Handler at `/api/products` in the App Router?',
        options: [
          'src/app/api/products/page.js',
          'src/app/api/products/handler.js',
          'src/app/api/products/route.js',
          'src/pages/api/products.js',
        ],
        correctIndex: 2,
        explanation:
          'A `route.js` file (not `page.js`) creates an API endpoint in the App Router. The file path maps to the URL: `src/app/api/products/route.js` → `/api/products`. `page.js` creates a user-facing page route, not an API endpoint. The old Pages Router used `src/pages/api/` — that is the previous pattern.',
      },
      {
        question: 'How do you handle a GET and a POST request to the same URL in a Route Handler?',
        options: [
          'Create two separate route.js files in different folders',
          'Export named async functions `GET` and `POST` from the same route.js file',
          'Use an if statement inside a single default export function',
          'Add a query parameter to distinguish GET from POST',
        ],
        correctIndex: 1,
        explanation:
          'Export separate named async functions for each HTTP method from the same `route.js` file. `export async function GET(req) {}` handles GET requests. `export async function POST(req) {}` handles POST. Next.js automatically routes each HTTP method to the corresponding function.',
      },
      {
        question: 'What does `NextResponse.json(data, { status: 201 })` do?',
        options: [
          'Renders a React component with the data',
          'Returns an HTTP response with `data` serialized as JSON, Content-Type: application/json, and status code 201',
          'Stores the data in a Next.js cache with a 201-second TTL',
          'Sends a WebSocket message',
        ],
        correctIndex: 1,
        explanation:
          '`NextResponse.json()` is a convenience method that creates an HTTP Response with the data serialized to JSON, sets the `Content-Type: application/json` header automatically, and accepts an options object for the status code and additional headers. It is equivalent to `new Response(JSON.stringify(data), { status: 201, headers: { "Content-Type": "application/json" } })`.',
      },
      {
        question: 'When should you use a Route Handler vs a Server Action?',
        options: [
          'Use Route Handlers for everything — Server Actions are deprecated',
          'Use Route Handlers when you need a real HTTP endpoint (webhooks, third-party callbacks, public API). Use Server Actions for form submissions and mutations from your own UI',
          'Use Server Actions for GET requests, Route Handlers for POST requests',
          'They are identical — use either based on personal preference',
        ],
        correctIndex: 1,
        explanation:
          'Server Actions are ideal for mutations triggered by your own UI — they are simpler, type-safe, and integrate with React\'s form system. Route Handlers are appropriate when you need a real HTTP URL that external services can call (Stripe webhooks, OAuth callbacks, mobile apps hitting your API). If only your own Next.js frontend calls it, prefer a Server Action.',
      },
      {
        question: 'Why might a GET Route Handler return stale data after you update the database?',
        options: [
          'Route Handlers do not have access to the database',
          'GET Route Handlers are cached by Next.js by default — add `export const dynamic = "force-dynamic"` or `cache: "no-store"` to opt out',
          'The browser caches GET requests for 24 hours',
          'Database queries are async and take time to reflect',
        ],
        correctIndex: 1,
        explanation:
          'GET Route Handlers are cached by default in Next.js (treated like Server Component data fetches). If your endpoint returns dynamic data that changes, add `export const dynamic = "force-dynamic"` to the route file, or use `{ cache: "no-store" }` in any fetch calls inside the handler. Without this, the response might be served from cache even after the data changes.',
      },
    ],
  },

  {
    slug: 'middleware',
    title: 'Middleware & Edge Runtime',
    subtitle: 'Intercepting requests before they reach pages, API routes, or cached content',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '9 min',
    intro:
      'Middleware runs before a request is processed — before it reaches your page, layout, API route, or cached content. It runs on the Edge Runtime (globally distributed, low latency), which means it executes close to the user. Middleware is used for authentication guards, redirects, A/B testing, internationalization, and modifying request/response headers. Understanding when and how to use it can significantly simplify your app\'s request handling logic.',
    keyPoints: [
      'Middleware runs before every request matching the configured path pattern',
      'It runs on the Edge Runtime — no Node.js APIs, but fast global execution',
      'Return NextResponse.redirect() to redirect, NextResponse.next() to continue',
      'Use the matcher config to limit which routes middleware applies to',
    ],
    sections: [
      {
        title: 'Creating Middleware',
        content:
          'Create a `middleware.js` (or `middleware.ts`) file at the root of your project (same level as `src/`). Export a `middleware` function and optionally a `config` object with a `matcher` to specify which paths the middleware runs on. The function receives a `NextRequest` and must return a `NextResponse` — either redirect, rewrite, modify headers, or continue normally.',
        code: `// middleware.js (at project root, alongside src/)

import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Example: maintenance mode redirect
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  // Example: add custom headers to all responses
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  return response
}

// Config: which paths the middleware runs on
export const config = {
  matcher: [
    // Run on all paths except static files, _next, and favicon
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}`,
      },
      {
        title: 'Authentication with Middleware',
        content:
          'Authentication is the most common use case for middleware. Check for a session token (cookie or header) before allowing access to protected routes. If not authenticated, redirect to the login page. This is much more efficient than checking auth in every protected page component — the middleware runs before the page loads, so unauthenticated users never see protected content or waste server resources rendering it.',
        code: `import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const isProtected = pathname.startsWith('/dashboard') ||
                      pathname.startsWith('/admin') ||
                      pathname.startsWith('/api/protected')

  if (!isProtected) {
    return NextResponse.next()  // not a protected route — allow through
  }

  // Check for session token in cookie
  const token = request.cookies.get('session')?.value

  if (!token) {
    // Not logged in — redirect to login with return URL
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Optionally verify the token (fast verification only — no DB in middleware)
  try {
    const payload = await verifyToken(token)
    // Pass user info to pages via headers
    const response = NextResponse.next()
    response.headers.set('X-User-Id', payload.userId)
    return response
  } catch {
    // Invalid token — redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*']
}`,
      },
      {
        title: 'Edge Runtime Constraints',
        content:
          'Middleware runs on the Edge Runtime — a lightweight JavaScript environment based on the Web Platform APIs (not Node.js). This means: no `fs` (file system), no `crypto` (Node.js built-in), no heavy npm packages. But it runs globally in Cloudflare/Vercel Edge locations close to users, making it extremely fast (sub-millisecond cold starts). Keep middleware light: token verification yes, database queries no.',
        code: `// ✓ Edge-compatible: Web Crypto API
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const token = request.cookies.get('session')?.value

  if (token) {
    // ✓ Web Crypto API works in Edge Runtime
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(process.env.JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    // verify token...
  }

  return NextResponse.next()
}

// ✗ These do NOT work in Edge Runtime:
// import fs from 'fs'                    // Node.js built-in
// import { createHash } from 'crypto'    // Node.js built-in (use Web Crypto instead)
// import heavyLibrary from 'some-lib'    // may use Node.js APIs

// If you need Node.js APIs, use a Route Handler instead of middleware.
// Route Handlers run in Node.js by default.
// export const runtime = 'nodejs'  // opt a Route Handler into Node.js runtime`,
      },
    ],
    mcq: [
      {
        question: 'Where should the middleware.js file be placed in a Next.js project?',
        options: [
          'Inside src/app/',
          'Inside src/middleware/',
          'At the project root, alongside the src/ folder or app/ folder',
          'Inside src/app/api/',
        ],
        correctIndex: 2,
        explanation:
          '`middleware.js` must be at the root of the project — at the same level as `src/` (or `app/` if not using src/). It is NOT inside `src/app/`. This placement is intentional — middleware intercepts requests before they enter the Next.js routing system, so it must sit outside the app directory.',
      },
      {
        question: 'What does `return NextResponse.next()` do in middleware?',
        options: [
          'Redirects to the next page in the routing hierarchy',
          'Passes the request through to the next middleware or the destination page/route handler',
          'Skips the current middleware and runs the next middleware.js file',
          'Terminates the request with a 200 OK response',
        ],
        correctIndex: 1,
        explanation:
          '`NextResponse.next()` is the "continue" signal — it means "I\'ve done what I need to do, now proceed normally to the page/route handler/cache." You can optionally modify headers on the response before returning it. If you don\'t return from middleware, the request continues by default.',
      },
      {
        question: 'Why is middleware ideal for authentication checks instead of checking auth in every page component?',
        options: [
          'Middleware has faster database access than page components',
          'Middleware runs before the page renders, so unauthenticated users are redirected before wasting server resources on rendering',
          'Page components cannot access cookies',
          'Middleware is the only place where you can read HTTP headers',
        ],
        correctIndex: 1,
        explanation:
          'Middleware intercepts requests before any page or Server Component renders. For authentication, this means: (1) unauthenticated users are redirected immediately without triggering database queries or rendering work in the protected page, (2) you write the auth check once in middleware instead of duplicating it in every protected page, and (3) the redirect happens at the edge (close to the user), minimizing latency.',
      },
      {
        question: 'What is the `matcher` config in middleware used for?',
        options: [
          'Matching regular expression patterns for URL rewriting',
          'Defining which URL paths the middleware should run on, to avoid running on every request',
          'Matching cookie values to specific users',
          'Matching HTTP methods to specific handlers',
        ],
        correctIndex: 1,
        explanation:
          '`matcher` limits which routes trigger your middleware. Without it, middleware runs on EVERY request including static assets (`_next/static`, images, favicon) — unnecessary overhead. The matcher uses path pattern syntax. Configure it to only run on routes that actually need the middleware logic.',
      },
      {
        question: 'What is the key limitation of the Edge Runtime that affects what you can do in middleware?',
        options: [
          'It cannot read cookies or headers',
          'It cannot redirect users',
          'It does not support Node.js built-in modules (fs, path, crypto) — only Web Platform APIs',
          'It runs after the page renders, not before',
        ],
        correctIndex: 2,
        explanation:
          'The Edge Runtime does not include Node.js built-ins or APIs that depend on them. You cannot use `fs`, Node.js `crypto`, or many npm packages that depend on Node internals. Use Web Platform equivalents: `Web Crypto API` instead of Node.js `crypto`, `fetch()` instead of `http`, etc. For functionality requiring Node.js, use Route Handlers (which default to the Node.js runtime) instead.',
      },
    ],
  },
]
