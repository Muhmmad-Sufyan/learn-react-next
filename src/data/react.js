export const reactConcepts = [
  {
    slug: 'components-jsx',
    title: 'Components & JSX',
    subtitle: 'The building blocks of every React application',
    category: 'react',
    difficulty: 'beginner',
    readTime: '6 min',
    intro:
      'React is built on one idea: your UI is a function of your data. A component is a JavaScript function that takes some input (props) and returns JSX — a description of what should appear on screen. JSX looks like HTML but it is not — it compiles to regular JavaScript function calls. Understanding this distinction is the first step to thinking in React.',
    keyPoints: [
      'A component is a function that returns JSX (a description of UI, not actual DOM)',
      'JSX compiles to React.createElement() calls under the hood',
      'Props are the inputs to a component — they flow from parent to child',
      'Components must return a single root element (or a Fragment)',
    ],
    sections: [
      {
        title: 'JSX Is Not HTML — It Compiles to JavaScript',
        content:
          'JSX is a syntax extension that lets you write HTML-like code in JavaScript. But when your code is compiled (by Babel or the Next.js compiler), every JSX element becomes a `React.createElement()` call. This means JSX has JavaScript rules, not HTML rules: class becomes className, for becomes htmlFor, and all tags must be closed.',
        code: `// What you write (JSX):
function Greeting({ name }) {
  return <h1 className="title">Hello, {name}!</h1>
}

// What the compiler produces:
function Greeting({ name }) {
  return React.createElement('h1', { className: 'title' }, 'Hello, ', name, '!')
}

// JSX rules:
// ✓ className, not class
// ✓ htmlFor, not for
// ✓ All tags self-close: <img />, <br />, <input />
// ✓ camelCase events: onClick, onChange, onSubmit
// ✗ <div><p>One</p><p>Two</p></div>  — single root
// ✓ <><p>One</p><p>Two</p></>       — Fragment wraps multiple`,
      },
      {
        title: 'Props: Inputs to Components',
        content:
          'Props (short for properties) are how you pass data from a parent component to a child. They are read-only inside the child — a component must never modify its own props. This one-way data flow is intentional: it makes your application predictable.',
        code: `// Parent passes data down via props
function App() {
  return (
    <div>
      <UserCard name="Sufyan" age={18} isActive={true} />
      <UserCard name="Ahmed" age={22} isActive={false} />
    </div>
  )
}

// Child receives props as an object
function UserCard({ name, age, isActive }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isActive && <span className="badge">Active</span>}
    </div>
  )
}

// ✗ Never do this — props are READ-ONLY
function BadChild({ name }) {
  name = 'Changed'  // This breaks the one-way data flow principle
  return <p>{name}</p>
}`,
      },
      {
        title: 'The Component Tree',
        content:
          'React applications are a tree of components. Each component renders other components. At the top is your root component (in Next.js, your layout or page). Data flows down via props; events bubble up via callback props. This unidirectional flow is what makes React apps easy to reason about.',
        code: `// A simple component tree
function Page() {
  return (
    <Layout>
      <Header title="Dashboard" />
      <main>
        <StatsBar />
        <ConceptList concepts={data} />
      </main>
    </Layout>
  )
}

// 'children' is a special prop — it's whatever you put between tags
function Layout({ children }) {
  return (
    <div className="layout">
      {children}
    </div>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'What does JSX compile to?',
        options: [
          'Pure HTML string templates',
          'React.createElement() function calls',
          'Virtual DOM nodes directly',
          'Browser DOM API calls',
        ],
        correctIndex: 1,
        explanation:
          'JSX is transpiled by a compiler (Babel, SWC) into `React.createElement()` calls. For example, `<h1>Hi</h1>` becomes `React.createElement("h1", null, "Hi")`. This is why React used to need `import React from "react"` at the top of every file — though React 17+ transforms no longer require it.',
      },
      {
        question: 'Why must you use `className` instead of `class` in JSX?',
        options: [
          'React has its own CSS system that requires className',
          'Because JSX is JavaScript, and `class` is a reserved keyword in JS',
          'For performance reasons',
          'It only applies to functional components',
        ],
        correctIndex: 1,
        explanation:
          '`class` is a reserved JavaScript keyword (used for ES6 classes like `class MyComponent {}`). Since JSX compiles to JavaScript, using `class` as an attribute would cause a syntax conflict. React uses `className` which maps to the HTML `class` attribute in the browser.',
      },
      {
        question: 'Can a child component modify the props it receives?',
        options: [
          'Yes, freely',
          'Yes, but only primitive values',
          'No — props are read-only. Components must not modify their own props',
          'Yes, using the setState method',
        ],
        correctIndex: 2,
        explanation:
          'Props are read-only by design. This enforces React\'s one-way data flow. If a child needs to communicate back to the parent, the parent should pass a callback function as a prop, and the child calls that function. The parent then updates its own state, causing a re-render with new props.',
      },
    ],
  },

  {
    slug: 'use-state',
    title: 'useState Hook',
    subtitle: 'How React tracks data that changes over time',
    category: 'react',
    difficulty: 'beginner',
    readTime: '7 min',
    intro:
      'State is data that changes over time and causes the UI to update. In React, `useState` is the primary hook for adding state to a functional component. When you call `setState`, React does not just change a variable — it schedules a re-render of the component with the new value. Understanding what triggers a re-render and when state updates are applied is essential for building predictable UI.',
    keyPoints: [
      'useState returns the current state value and a setter function',
      'Calling the setter triggers a re-render of the component',
      'State updates are asynchronous — the new value is not available on the next line',
      'Never mutate state directly — always use the setter function',
    ],
    sections: [
      {
        title: 'Basic useState Usage',
        content:
          'useState takes the initial value and returns an array of two items: the current state and a function to update it. Destructuring gives them names. When you call the setter, React queues a re-render — the component function runs again, and this time useState returns the new value.',
        code: `import { useState } from 'react'

function Counter() {
  // Destructure: [currentValue, setterFunction]
  const [count, setCount] = useState(0)   // 0 is the initial value

  function increment() {
    setCount(count + 1)   // triggers a re-render
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// React calls Counter() again after setCount.
// This time useState(0) returns the NEW count value, not 0.`,
      },
      {
        title: 'State Updates Are Asynchronous',
        content:
          'This is one of the most common sources of bugs. When you call setState, the state does not change immediately. React batches updates and re-renders at the end of the event handler. If you need to update state based on the previous value, use the functional form of the setter — it guarantees you get the latest value.',
        code: `function Counter() {
  const [count, setCount] = useState(0)

  function buggyIncrement() {
    setCount(count + 1)   // count is still 0 here
    setCount(count + 1)   // count is STILL 0 — result: 1, not 2!
    console.log(count)    // 0 — state has not updated yet
  }

  function correctIncrement() {
    // Functional update: React passes the LATEST state as 'prev'
    setCount(prev => prev + 1)   // prev = 0, result = 1
    setCount(prev => prev + 1)   // prev = 1, result = 2 ✓
  }

  return <button onClick={correctIncrement}>{count}</button>
}`,
      },
      {
        title: 'State for Objects and Arrays',
        content:
          'State can hold any JavaScript value, including objects and arrays. The key rule: never mutate state directly. Always create a new value. React uses reference equality to detect changes — if you mutate the existing object, React sees the same reference and does not re-render.',
        code: `function Form() {
  const [user, setUser] = useState({ name: '', email: '' })
  const [tags, setTags] = useState(['react'])

  // ✓ Correct: spread creates a new object
  function handleNameChange(e) {
    setUser({ ...user, name: e.target.value })
  }

  // ✗ Wrong: mutating directly — React won't re-render
  function badUpdate() {
    user.name = 'New Name'   // same reference, React ignores it
    setUser(user)
  }

  // ✓ Correct: create new array
  function addTag(tag) {
    setTags([...tags, tag])         // new array with added item
  }

  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index))  // new array without item
  }
}`,
      },
    ],
    mcq: [
      {
        question: 'What does calling `setState` (the setter from useState) do immediately?',
        options: [
          'Updates the state variable and re-renders synchronously',
          'Updates the state variable immediately but delays the re-render',
          'Schedules a re-render — the state value in the current render stays the same',
          'Throws an error if called multiple times',
        ],
        correctIndex: 2,
        explanation:
          'Calling the setter schedules a re-render. The state value does NOT change in the current render execution. This is why reading `count` immediately after `setCount(count + 1)` still gives you the old value. The new value is only available in the next render.',
      },
      {
        question: 'You call setCount(count + 1) three times in a row. How many times does the count increase?',
        options: [
          '3 times',
          '2 times',
          '1 time — React batches them using the same stale `count`',
          '0 times — you cannot call setState multiple times',
        ],
        correctIndex: 2,
        explanation:
          'Because `count` is a snapshot of the current render, all three calls to `setCount(count + 1)` use the same `count` value. React batches them and the last one wins, effectively incrementing by 1. To increment by 3, use the functional form: `setCount(prev => prev + 1)` three times.',
      },
      {
        question: 'Why should you never directly mutate state objects (e.g., `state.name = "new"`) ?',
        options: [
          'It causes a runtime error',
          'React uses reference equality — mutating the same object gives React the same reference, so it skips the re-render',
          'Direct mutation is slower than using the setter',
          'It only works in class components',
        ],
        correctIndex: 1,
        explanation:
          'React compares the old and new state using `Object.is()` (reference equality for objects). If you mutate the existing object in place, the reference is the same — React thinks nothing changed and does not re-render. Always create a new object/array with `{ ...old, key: value }` or `[...old, newItem]`.',
      },
    ],
  },

  {
    slug: 'use-effect',
    title: 'useEffect Hook',
    subtitle: 'Running side effects in sync with the component lifecycle',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'useEffect is how React components synchronize with things outside of React: APIs, browser APIs, timers, subscriptions, and DOM manipulation. The name "effect" refers to a "side effect" — anything that reaches outside the pure function of rendering. Understanding the dependency array and the cleanup function is what separates developers who understand React from those who just use it.',
    keyPoints: [
      'useEffect runs after the render is committed to the DOM',
      'The dependency array controls when the effect re-runs',
      'An empty dependency array [] means "run once after mount"',
      'The cleanup function runs before the next effect and on unmount',
    ],
    sections: [
      {
        title: 'The Dependency Array',
        content:
          'useEffect takes two arguments: the effect function, and a dependency array. The array tells React when to re-run the effect. No array = runs after every render. Empty array = runs once after mount. Array with values = runs whenever those values change.',
        code: `import { useState, useEffect } from 'react'

function Examples() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // Runs after EVERY render (dangerous — usually not what you want)
  useEffect(() => {
    console.log('Every render')
  })

  // Runs ONCE after mount (like componentDidMount)
  useEffect(() => {
    console.log('Mounted — fetch initial data here')
  }, [])

  // Runs after mount AND whenever 'count' changes
  useEffect(() => {
    document.title = \`Count is \${count}\`
  }, [count])

  // Runs whenever 'name' OR 'count' changes
  useEffect(() => {
    console.log(name, count)
  }, [name, count])
}`,
      },
      {
        title: 'The Cleanup Function',
        content:
          'If your effect creates a subscription, timer, or event listener, you must clean it up. The cleanup function runs before the next effect execution and when the component unmounts. Forgetting cleanup causes memory leaks and bugs — effects piling up from previous renders.',
        code: `function Timer({ isRunning }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    // Create the interval
    const id = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

    // CLEANUP: runs when isRunning changes or component unmounts
    return () => {
      clearInterval(id)    // prevents memory leak
    }
  }, [isRunning])  // re-runs when isRunning changes

  return <p>Time: {time}s</p>
}

// Without cleanup, every time isRunning changes,
// a new interval is created but the old one keeps running.
// After 5 toggles, you'd have 5 intervals running simultaneously.`,
      },
      {
        title: 'Fetching Data with useEffect',
        content:
          'The most common useEffect use case is fetching data. There are important patterns to follow: handle loading state, handle errors, and handle race conditions (stale data from a previous request arriving after a newer one).',
        code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false   // flag to prevent stale updates

    async function fetchUser() {
      try {
        setLoading(true)
        const res = await fetch(\`/api/users/\${userId}\`)
        const data = await res.json()

        if (!cancelled) {    // only update if this request is still relevant
          setUser(data)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUser()

    return () => { cancelled = true }   // cleanup: cancel on userId change
  }, [userId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return <p>{user?.name}</p>
}`,
      },
    ],
    mcq: [
      {
        question: 'What does `useEffect(() => { ... }, [])` do?',
        options: [
          'Runs after every render',
          'Never runs',
          'Runs once after the component first mounts',
          'Runs before every render',
        ],
        correctIndex: 2,
        explanation:
          'An empty dependency array `[]` means the effect has no dependencies — it never needs to re-run because nothing it depends on can change. React runs it once after the initial render (mount) and never again until the component unmounts. This is equivalent to `componentDidMount` in class components.',
      },
      {
        question: 'What is the purpose of the cleanup function returned from useEffect?',
        options: [
          'To cancel the current render',
          'To clear the dependency array',
          'To undo the effect before the next effect runs or when the component unmounts',
          'To reset state to its initial value',
        ],
        correctIndex: 2,
        explanation:
          'The cleanup function runs in two situations: (1) before the effect re-runs due to a dependency change, and (2) when the component unmounts. It exists to undo any side effects: clear timers, cancel subscriptions, abort fetch requests. Without cleanup, effects accumulate and cause memory leaks.',
      },
      {
        question: 'You have `useEffect(() => { fetchUser(userId) }, [userId])`. When does this effect run?',
        options: [
          'Only once, when the component mounts',
          'After every render',
          'After mount and whenever `userId` changes',
          'Only when `userId` changes, not on mount',
        ],
        correctIndex: 2,
        explanation:
          'Effects with a non-empty dependency array run after the initial render (mount) AND whenever any value in the dependency array changes. This is the correct pattern for fetching data based on a prop — fetch when mounted, and re-fetch if the prop changes.',
      },
    ],
  },

  {
    slug: 'custom-hooks',
    title: 'Custom Hooks',
    subtitle: 'Extracting and reusing stateful logic across components',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '7 min',
    intro:
      'Custom hooks are the most powerful abstraction pattern in React. They let you extract stateful logic — state, effects, refs, context — out of a component and into a reusable function. The rule: if a function uses other hooks, prefix it with `use` and it becomes a custom hook. This is how you eliminate duplicated logic across components without creating wrapper components or using class mixins.',
    keyPoints: [
      'A custom hook is any function that calls other hooks and starts with "use"',
      'Custom hooks share logic, not state — each call creates independent state',
      'They are the recommended alternative to Higher-Order Components and Render Props',
      'Hooks rules apply: only call hooks at the top level, only in React functions',
    ],
    sections: [
      {
        title: 'Extracting Logic into a Custom Hook',
        content:
          'When you find yourself writing the same useState/useEffect pattern in multiple components, it\'s time for a custom hook. Move the logic into a function that starts with `use`, call hooks inside it, and return what the components need.',
        code: `// BEFORE: duplicated logic in every component that needs this
function ComponentA() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  // ...use windowWidth
}

// AFTER: extract into a custom hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return width
}

// Now any component can use it in one line:
function ComponentA() {
  const width = useWindowWidth()
  return <p>Width: {width}</p>
}`,
      },
      {
        title: 'Custom Hook for Data Fetching',
        content:
          'A useFetch hook is a classic example. It encapsulates the loading/error/data pattern so every component that fetches data doesn\'t need to repeat the same 15 lines.',
        code: `import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url)
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [url])  // re-fetch when URL changes

  return { data, loading, error }
}

// Usage is clean:
function UserList() {
  const { data, loading, error } = useFetch('/api/users')
  if (loading) return <Spinner />
  if (error) return <ErrorMessage text={error} />
  return data.map(u => <UserCard key={u.id} user={u} />)
}`,
      },
    ],
    mcq: [
      {
        question: 'If two components both call `useWindowWidth()`, do they share the same state?',
        options: [
          'Yes — custom hooks share state between all callers',
          'No — each call to a custom hook creates completely independent state',
          'Yes, but only if both components are in the same tree',
          'It depends on whether you use Context inside the hook',
        ],
        correctIndex: 1,
        explanation:
          'Custom hooks share logic, not state. Each component that calls `useWindowWidth()` gets its own independent `width` state and its own `useEffect`. This is why custom hooks are preferred over class mixins — there is no accidental shared state.',
      },
      {
        question: 'What is the rule for naming custom hooks?',
        options: [
          'They must start with "hook"',
          'They must start with "use" — this allows React to enforce hooks rules',
          'Any name is fine as long as they call other hooks',
          'They must end with "Hook"',
        ],
        correctIndex: 1,
        explanation:
          'The `use` prefix is not just a convention — React\'s linter (eslint-plugin-react-hooks) uses it to identify functions that should follow hooks rules (only called at top level, only in React functions). A function named `useFetch` is treated as a hook. A function named `fetch` is not, even if it calls hooks inside.',
      },
    ],
  },
]
