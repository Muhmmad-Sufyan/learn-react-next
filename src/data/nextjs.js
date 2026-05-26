export const nextjsConcepts = [
  {
    slug: 'app-router',
    title: 'App Router & File Routing',
    subtitle: 'How Next.js turns your folder structure into a full routing system',
    category: 'nextjs',
    difficulty: 'beginner',
    readTime: '7 min',
    intro:
      'Next.js App Router (introduced in v13) uses your file system as the routing configuration. You don\'t write route definitions — you create folders and files, and Next.js automatically creates routes from them. Every `page.js` becomes a URL. Every `layout.js` wraps its children. Every `loading.js` shows a skeleton while data loads. This "convention over configuration" approach is one of the most productive ideas in modern web development.',
    keyPoints: [
      'A `page.js` file in a folder defines the route for that URL',
      'A `layout.js` wraps all pages in its directory and persists across navigation',
      'Dynamic routes use square brackets: `[slug]/page.js`',
      'Special files: loading.js, error.js, not-found.js handle each case automatically',
    ],
    sections: [
      {
        title: 'Folder = Route',
        content:
          'In the App Router, the folder structure inside `src/app/` directly maps to URL paths. A file at `src/app/about/page.js` is accessible at `/about`. A file at `src/app/blog/[slug]/page.js` matches `/blog/anything`. Next.js only creates a route if the folder contains a `page.js` — other files like `components.js` in the same folder are NOT exposed as routes.',
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
└── (marketing)/         →  Route Group — no URL segment
    └── home/
        └── page.js      →  /home  (not /marketing/home)`,
      },
      {
        title: 'layout.js — Persistent UI',
        content:
          'A `layout.js` file wraps all pages in its directory. Unlike regular pages, layouts are not unmounted when navigating between routes in the same directory — they persist. This is what makes the header and sidebar stay visible while only the main content changes. The root layout (`src/app/layout.js`) is required and wraps the entire app.',
        code: `// src/app/layout.js — root layout, wraps everything
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>   {/* page.js content goes here */}
        <Footer />
      </body>
    </html>
  )
}

// src/app/dashboard/layout.js — nested layout, only for /dashboard routes
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  )
}
// /dashboard/analytics uses: RootLayout > DashboardLayout > analytics page`,
      },
      {
        title: 'Dynamic Routes and Params',
        content:
          'Square brackets in folder names create dynamic segments. Inside the page component, the params are available as a prop. In Next.js 15, params is a Promise — you must await it.',
        code: `// src/app/concepts/[slug]/page.js
// Matches: /concepts/execution-context, /concepts/closures, etc.

// Generate static paths at build time (for SSG)
export async function generateStaticParams() {
  return [
    { slug: 'execution-context' },
    { slug: 'closures' },
  ]
}

// Page receives params as a prop
export default async function ConceptPage({ params }) {
  const { slug } = await params   // In Next.js 15, params is a Promise

  // Use slug to fetch the right data
  const concept = await getConceptBySlug(slug)

  if (!concept) notFound()   // renders not-found.js

  return <div>{concept.title}</div>
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
          'In the App Router, only specifically named files create routes or UI: `page.js` creates a route, `layout.js` creates a layout, `loading.js` creates a loading state, etc. A file named `utils.js` in a route folder is just a module — it does not create a URL. You can safely co-locate utilities, components, and helpers alongside your page files.',
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
          'This is the key difference: when you navigate from `/dashboard/analytics` to `/dashboard/settings`, the `DashboardLayout` is NOT re-rendered — it persists. Only the page content changes. This makes navigation fast and preserves layout state (like scroll position on a sidebar). `page.js` is fully unmounted and remounted on each navigation.',
      },
      {
        question: 'A file at `src/app/blog/[slug]/page.js` receives a `params` prop. What does `params` contain for the URL `/blog/hello-world`?',
        options: [
          '{ path: "blog/hello-world" }',
          '{ slug: "hello-world" }',
          '["blog", "hello-world"]',
          '{ id: "hello-world" }',
        ],
        correctIndex: 1,
        explanation:
          'The `params` object contains key-value pairs where the key is the name of the dynamic segment (the bracket name) and the value is the actual URL segment. Since the folder is `[slug]`, the key is `slug`. For `/blog/hello-world`, `params` is `{ slug: "hello-world" }`. The folder name is what determines the key.',
      },
    ],
  },

  {
    slug: 'server-client-components',
    title: 'Server vs Client Components',
    subtitle: 'The most important concept in Next.js App Router',
    category: 'nextjs',
    difficulty: 'intermediate',
    readTime: '10 min',
    intro:
      'This is the single most important concept in Next.js App Router — and the one that confuses developers the most. By default, every component in the App Router is a Server Component: it runs on the server, can access databases and secrets directly, and sends pure HTML to the browser (zero JavaScript). When you need interactivity, you add "use client" at the top, which makes it a Client Component that runs in the browser. Getting this boundary right is the difference between a fast, secure app and a slow one.',
    keyPoints: [
      'Server Components run on the server — never sent as JS to the browser',
      'Client Components run in the browser — they can use useState, useEffect, event handlers',
      'The "use client" directive marks a component and its entire import tree as client-side',
      'You can render Server Components inside Client Components using the children prop pattern',
    ],
    sections: [
      {
        title: 'Server Components: The Default',
        content:
          'Server Components are the default in the App Router. They run only on the server — they can directly query a database, read environment variables, access the file system, and use server-only secrets. They send pure HTML to the browser with zero JavaScript. This makes them extremely fast and secure.',
        code: `// src/app/users/page.js — This is a SERVER COMPONENT by default

// ✓ You can use async/await directly (no useEffect needed!)
export default async function UsersPage() {
  // ✓ Direct database access — secret never leaves the server
  const users = await db.query('SELECT * FROM users')

  // ✓ Access server-only env vars
  const apiKey = process.env.SECRET_API_KEY  // safe — never sent to browser

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

// ✗ These are NOT available in Server Components:
// useState, useEffect, useContext
// onClick, onChange (event handlers)
// window, document, localStorage`,
      },
      {
        title: 'Client Components: For Interactivity',
        content:
          'Add "use client" at the top of a file to make it a Client Component. It runs in the browser and can use hooks, event handlers, and browser APIs. Important: "use client" marks the boundary — the component itself and everything it imports (in that file tree) becomes client-side code.',
        code: `'use client'   // This directive marks the CLIENT BOUNDARY

import { useState } from 'react'

// ✓ Can use all React hooks
// ✓ Can use event handlers
// ✓ Can access browser APIs
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

// ✗ NOT available in Client Components:
// Direct database access
// Server-only secrets
// async component functions (without explicit Suspense)`,
      },
      {
        title: 'The Correct Architecture Pattern',
        content:
          'The golden rule: push "use client" as deep down the component tree as possible. Fetch data in Server Components, pass it down as props, and only make the interactive leaves Client Components. This maximizes server rendering and minimizes JavaScript sent to the browser.',
        code: `// ✓ CORRECT: Server Component fetches data, passes to Client for interaction
// src/app/concepts/page.js — Server Component
import FilterableConcepts from '@/components/FilterableConcepts'

export default async function ConceptsPage() {
  const concepts = await getConcepts()   // server-side data fetch

  return <FilterableConcepts concepts={concepts} />
  // Pass data as props to the Client Component
}

// src/components/FilterableConcepts.js — Client Component
'use client'
import { useState } from 'react'
import ConceptCard from './ConceptCard'  // This is also a Client Component now!

export default function FilterableConcepts({ concepts }) {
  const [filter, setFilter] = useState('all')
  const filtered = concepts.filter(c => filter === 'all' || c.category === filter)

  return (
    <div>
      <FilterBar active={filter} onChange={setFilter} />
      {filtered.map(c => <ConceptCard key={c.slug} concept={c} />)}
    </div>
  )
}`,
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
          'In the App Router, all components are Server Components by default. You opt into client-side rendering by adding `"use client"` at the top of the file. This is the opposite of the mental model from older React — instead of everything running in the browser, the default is the server.',
      },
      {
        question: 'Which of these can you do in a Server Component but NOT in a Client Component?',
        options: [
          'Use useState',
          'Add an onClick handler',
          'Directly query a database using async/await',
          'Use the children prop',
        ],
        correctIndex: 2,
        explanation:
          'Server Components can directly access databases, file systems, and server-only environment variables because they run exclusively on the server. Client Components cannot — they run in the browser where there is no database access. You should never put secret credentials in a Client Component, as they would be exposed in the browser.',
      },
      {
        question: 'What does the `"use client"` directive actually do?',
        options: [
          'It only affects the one file it is in',
          'It marks the file and all its imports as client-side — creating a "client boundary"',
          'It forces the component to render on both server and client',
          'It is just a comment — it has no effect',
        ],
        correctIndex: 1,
        explanation:
          '"use client" marks a boundary. The file it is in, and everything that file imports, becomes part of the client bundle. This is why you should push this boundary as deep as possible — a "use client" near the top of your tree sends too much JavaScript to the browser.',
      },
    ],
  },

  {
    slug: 'rendering-strategies',
    title: 'SSR, SSG, ISR & CSR',
    subtitle: 'Four ways to render a page — and when to use each',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '10 min',
    intro:
      'Next.js gives you four rendering strategies, and choosing the right one for each page is a core engineering skill. SSR generates HTML on every request. SSG generates HTML once at build time. ISR regenerates pages in the background after a time interval. CSR skips server HTML entirely and renders in the browser. These are not global settings — you choose per page, and even mix strategies within one page using Suspense boundaries.',
    keyPoints: [
      'SSG (Static Site Generation): HTML built at deploy time — fastest possible, great for content that rarely changes',
      'SSR (Server-Side Rendering): HTML built on every request — always fresh, but slower than static',
      'ISR (Incremental Static Regeneration): Static HTML that automatically regenerates in the background',
      'CSR (Client-Side Rendering): No server HTML, rendered entirely in the browser — slowest initial load',
    ],
    sections: [
      {
        title: 'SSG — Static Generation (The Fast Default)',
        content:
          'In Next.js App Router, Server Components that fetch data with `fetch()` are statically generated by default — the data is fetched at build time and the HTML is cached. This means the page is served instantly from a CDN, with no server computation on each request. Use this for content that does not change often: blog posts, documentation, marketing pages.',
        code: `// This page is STATICALLY GENERATED by default
// Next.js fetches this data ONCE at build time
export default async function BlogPost({ params }) {
  const { slug } = await params

  const post = await fetch(\`https://cms.example.com/posts/\${slug}\`)
    .then(r => r.json())
  // Next.js caches this fetch result — does not re-run on each request

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  )
}

// Tell Next.js which slugs to pre-build
export async function generateStaticParams() {
  const posts = await fetch('https://cms.example.com/posts').then(r => r.json())
  return posts.map(p => ({ slug: p.slug }))
}`,
      },
      {
        title: 'SSR — Server-Side Rendering (Per Request)',
        content:
          'SSR generates fresh HTML on every request. To opt into SSR, use `export const dynamic = "force-dynamic"` or use dynamic APIs like `headers()`, `cookies()`, or `searchParams`. Use SSR for pages that need user-specific data, real-time pricing, or session-based content.',
        code: `import { cookies } from 'next/headers'

// Using cookies() opts this page into SSR automatically
export default async function Dashboard() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')?.value

  const user = await fetchUserBySession(sessionId)

  // This HTML is generated fresh on EVERY request
  return (
    <div>
      <h1>Welcome back, {user.name}</h1>
      <p>Your balance: {user.balance}</p>
    </div>
  )
}

// Explicitly force dynamic rendering:
export const dynamic = 'force-dynamic'`,
      },
      {
        title: 'ISR — Incremental Static Regeneration',
        content:
          'ISR is a hybrid: pages are served as static HTML, but Next.js automatically regenerates them in the background after a `revalidate` period. The first request after the timeout gets the stale page (served instantly), while Next.js regenerates a fresh one behind the scenes. The next visitor gets the fresh version.',
        code: `// ISR: regenerate this page every 60 seconds
export const revalidate = 60

export default async function ProductPage({ params }) {
  const { id } = await params

  // This fetch result is cached for 60 seconds
  const product = await fetch(\`/api/products/\${id}\`).then(r => r.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: \${product.price}</p>   {/* Might be up to 60s stale */}
    </div>
  )
}

// On-demand revalidation (for when content changes in a CMS):
// import { revalidatePath } from 'next/cache'
// revalidatePath('/products/123')   // purge immediately`,
      },
    ],
    mcq: [
      {
        question: 'Which rendering strategy generates the HTML at BUILD TIME, not per request?',
        options: [
          'SSR (Server-Side Rendering)',
          'CSR (Client-Side Rendering)',
          'SSG (Static Site Generation)',
          'ISR (Incremental Static Regeneration)',
        ],
        correctIndex: 2,
        explanation:
          'SSG (Static Site Generation) generates HTML once when you run `next build`. The resulting HTML files are then served directly from a CDN with no server computation per request — making it the fastest option. ISR also produces static HTML, but regenerates it periodically after deployment.',
      },
      {
        question: 'You are building a product page that shows real-time stock levels that change every minute. Which strategy is best?',
        options: [
          'SSG — build it once and ship it',
          'ISR with revalidate: 60 — serve static HTML, regenerate every 60 seconds',
          'CSR — render everything in the browser with useEffect + fetch',
          'SSR — generate fresh HTML on every single request',
        ],
        correctIndex: 1,
        explanation:
          'ISR with a 60-second revalidation is ideal: most visitors see static HTML served instantly from cache (fast!), and the page is automatically refreshed in the background every minute. SSR would work but generates HTML on every request, which is slower and more expensive. CSR would have poor initial load performance and no SEO.',
      },
      {
        question: 'In Next.js App Router, what automatically triggers SSR (dynamic rendering) for a page?',
        options: [
          'Using useState in the page component',
          'Accessing dynamic APIs like cookies(), headers(), or searchParams',
          'Having more than 5 components in the page',
          'Using fetch() in the component',
        ],
        correctIndex: 1,
        explanation:
          'Using dynamic APIs like `cookies()`, `headers()`, or the `searchParams` prop opts a page into dynamic rendering because those values can only be known at request time. `fetch()` by itself does NOT make a page dynamic — it is statically fetched and cached at build time unless you configure otherwise.',
      },
    ],
  },

  {
    slug: 'hydration',
    title: 'Hydration',
    subtitle: 'How server-rendered HTML becomes an interactive React app',
    category: 'nextjs',
    difficulty: 'advanced',
    readTime: '8 min',
    intro:
      'When Next.js renders a page on the server, it sends HTML to the browser. The user sees content immediately — but it\'s static. Hydration is the process where React runs in the browser, attaches event listeners to the existing server-rendered HTML, and makes it interactive. Understanding hydration explains why you see hydration errors, why component output must match between server and client, and why "use client" boundaries matter for performance.',
    keyPoints: [
      'The server sends HTML (visible immediately), then React hydrates it in the browser',
      'Hydration errors occur when server and client render different output',
      'Client Components must produce identical output on first render as the server did',
      'Selective hydration lets React prioritize interactive sections over non-interactive ones',
    ],
    sections: [
      {
        title: 'The Three Phases of a Page Load',
        content:
          'Understanding hydration requires understanding the three phases of what happens when a user visits a Next.js page. Each phase has performance implications and explains why SSR + hydration gives better user experience than pure CSR.',
        code: `// Phase 1: Server renders HTML
// Server runs React and produces this HTML string:
// <html><body><h1>Hello Sufyan</h1><button>Click me</button></body></html>

// Phase 2: Browser receives HTML
// → User sees content IMMEDIATELY (First Contentful Paint ✓)
// → But the button does nothing yet — no JavaScript loaded yet

// Phase 3: React hydrates in the browser
// React downloads the JS bundle
// React "walks" the existing DOM
// React attaches event listeners to the button
// → NOW the button is interactive (Time to Interactive ✓)

// This is WHY SSR is better than CSR for user experience:
// CSR: blank page → JS downloads → React renders → interactive
// SSR: content shown → JS downloads → React hydrates → interactive
//      ↑ user sees something immediately`,
      },
      {
        title: 'Hydration Errors',
        content:
          'A hydration error occurs when React\'s server output and the first client render produce different HTML. React compares them — if they differ, it cannot safely hydrate and throws an error (in development) or silently patches the DOM (in production, potentially causing layout flashes). Common causes: using browser-only APIs during render, dates/random values, and browser extensions that modify the DOM.',
        code: `// ✗ CAUSES HYDRATION ERROR:
'use client'
export default function BadComponent() {
  // window is not available on the server — server renders nothing,
  // client renders the width. They don't match!
  return <p>Width: {window.innerWidth}</p>
}

// ✓ FIX: guard with mounted state
'use client'
import { useState, useEffect } from 'react'

export default function GoodComponent() {
  const [width, setWidth] = useState(null)  // null on both server and client

  useEffect(() => {
    // useEffect only runs on the client — sets width after hydration
    setWidth(window.innerWidth)
  }, [])

  // Renders null on server AND on first client render → no mismatch
  if (width === null) return null

  return <p>Width: {width}</p>
}`,
      },
    ],
    mcq: [
      {
        question: 'What is hydration in Next.js?',
        options: [
          'The process of fetching data on the client after page load',
          'Converting TypeScript to JavaScript during build',
          'React attaching event listeners to server-rendered HTML to make it interactive',
          'Optimizing images for the web',
        ],
        correctIndex: 2,
        explanation:
          'Hydration is the process where React runs in the browser and "activates" the static HTML that the server sent. React walks the existing DOM structure, attaches event listeners, and sets up state management — transforming the static HTML into a fully interactive React application.',
      },
      {
        question: 'What causes a hydration mismatch error?',
        options: [
          'Having too many components on a page',
          'The server and client rendering different HTML for the same component',
          'Using Server Components with Client Components on the same page',
          'Using async/await in a Server Component',
        ],
        correctIndex: 1,
        explanation:
          'A hydration error occurs when React\'s server output and the first client render produce different HTML. React cannot safely attach event listeners when the DOM structure doesn\'t match what it expects. This usually happens when you use browser-only APIs (`window`, `localStorage`) or dynamic values (random numbers, current date) during the initial render.',
      },
      {
        question: 'Why is SSR + hydration better for users than pure CSR (Client-Side Rendering)?',
        options: [
          'SSR + hydration uses less JavaScript',
          'With SSR, users see content immediately from the server HTML, rather than a blank page while JS loads',
          'SSR prevents all JavaScript errors',
          'CSR cannot be used with React',
        ],
        correctIndex: 1,
        explanation:
          'With CSR, the user sees a blank page until React downloads and runs — which can be 2-5 seconds on slow connections. With SSR, the server sends fully-rendered HTML immediately, so users see content as soon as the HTML arrives. React then hydrates in the background. This dramatically improves First Contentful Paint (FCP) and perceived performance.',
      },
    ],
  },
]
