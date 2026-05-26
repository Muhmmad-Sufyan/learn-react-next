export const reactConcepts = [
  {
    slug: 'components-jsx',
    title: 'Components & JSX',
    subtitle: 'The building blocks of every React application',
    category: 'react',
    difficulty: 'beginner',
    readTime: '7 min',
    intro:
      'React is built on one idea: your UI is a function of your data. A component is a JavaScript function that takes some input (props) and returns JSX — a description of what should appear on screen. JSX looks like HTML but it is not — it compiles to regular JavaScript function calls. Understanding this distinction is the first step to thinking in React and writing components that are predictable, composable, and easy to debug.',
    keyPoints: [
      'A component is a function that returns JSX (a description of UI, not actual DOM)',
      'JSX compiles to React.createElement() calls under the hood',
      'Props are the inputs to a component — they flow from parent to child and are read-only',
      'Components must return a single root element (or a Fragment)',
    ],
    sections: [
      {
        title: 'JSX Is Not HTML — It Compiles to JavaScript',
        content:
          'JSX is a syntax extension that lets you write HTML-like code in JavaScript. But when your code is compiled (by Babel or the Next.js compiler), every JSX element becomes a `React.createElement()` call. This means JSX has JavaScript rules, not HTML rules: class becomes className, for becomes htmlFor, all tags must be closed, and you can embed any JavaScript expression inside `{}`. JSX is not a template language — it is JavaScript with special syntax.',
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
// ✓ Expressions in {}: {name}, {2 + 2}, {condition ? 'a' : 'b'}
// ✗ Statements in {}: {if (x) { ... }} — use ternary instead
// ✓ <><p>One</p><p>Two</p></>  — Fragment wraps multiple elements`,
      },
      {
        title: 'Props: Inputs to Components',
        content:
          'Props (short for properties) are how you pass data from a parent component to a child. They are read-only inside the child — a component must never modify its own props. This one-way data flow (parent → child) is intentional: it makes your application predictable because data flows in only one direction. If a child needs to communicate back, the parent passes a callback function as a prop.',
        code: `// Parent passes data down via props
function App() {
  return (
    <div>
      <UserCard name="Sufyan" age={18} isActive={true} />
      <UserCard name="Ahmed" age={22} isActive={false} />
    </div>
  )
}

// Child receives props as an object (destructured here for clarity)
function UserCard({ name, age, isActive }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isActive && <span className="badge">Active</span>}
    </div>
  )
}

// Default props with destructuring
function Button({ label, variant = 'primary', onClick }) {
  return (
    <button className={\`btn-\${variant}\`} onClick={onClick}>
      {label}
    </button>
  )
}`,
      },
      {
        title: 'The Component Tree & Composition',
        content:
          'React applications are a tree of components. Each component renders other components. At the top is your root component. Data flows down via props; events bubble up via callback props. The `children` prop is special — it receives whatever is placed between the component\'s opening and closing tags. This enables powerful composition patterns: wrapping, layout components, and renderProps.',
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
      <nav>Navigation</nav>
      <div className="content">{children}</div>
      <footer>Footer</footer>
    </div>
  )
}

// Conditional rendering patterns
function Status({ isLoggedIn }) {
  // Ternary for either/or
  return isLoggedIn ? <Dashboard /> : <LoginPage />
}

function Notification({ message }) {
  // Short-circuit for optional rendering
  return (
    <div>
      {message && <p className="notification">{message}</p>}
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
      {
        question: 'What is the `children` prop in React?',
        options: [
          'A special prop for setting nested component state',
          'Whatever JSX content is placed between a component\'s opening and closing tags',
          'A list of all child components in the app',
          'A prop only available on HTML elements',
        ],
        correctIndex: 1,
        explanation:
          '`children` is a special built-in prop that contains whatever is placed between `<Component>` and `</Component>`. It enables composition — you can create wrapper/layout components that render any content passed to them. For example, `<Card><p>Content</p></Card>` — inside Card, `props.children` is `<p>Content</p>`.',
      },
      {
        question: 'What does `{condition && <Component />}` do in JSX?',
        options: [
          'Always renders the component',
          'Throws an error if condition is false',
          'Renders the component only when condition is truthy; renders nothing when falsy',
          'Renders the component and wraps it in a conditional wrapper element',
        ],
        correctIndex: 2,
        explanation:
          'The `&&` short-circuit operator in JSX renders the component only when the left side is truthy. If condition is `false`, `null`, or `undefined`, nothing is rendered. Note: if condition is `0`, JSX will render the number `0` (a gotcha!). Use explicit booleans: `{count > 0 && <List />}` instead of `{count && <List />}`.',
      },
    ],
  },

  {
    slug: 'use-state',
    title: 'useState Hook',
    subtitle: 'How React tracks data that changes over time',
    category: 'react',
    difficulty: 'beginner',
    readTime: '8 min',
    intro:
      'State is data that changes over time and causes the UI to update. In React, `useState` is the primary hook for adding state to a functional component. When you call `setState`, React does not just change a variable — it schedules a re-render of the component with the new value. Understanding what triggers a re-render, when state updates are applied, and how to update complex state correctly is essential for building predictable UI.',
    keyPoints: [
      'useState returns the current state value and a setter function',
      'Calling the setter triggers a re-render of the component',
      'State updates are asynchronous — the new value is not available on the next line',
      'Never mutate state directly — always use the setter with a new value',
    ],
    sections: [
      {
        title: 'Basic useState Usage',
        content:
          'useState takes the initial value and returns an array of two items: the current state and a function to update it. Destructuring gives them names. The initial value is only used on the first render — on subsequent renders, useState returns the current state regardless of what you pass. When you call the setter, React schedules a re-render — the component function runs again, and this time useState returns the new value.',
        code: `import { useState } from 'react'

function Counter() {
  // Destructure: [currentValue, setterFunction]
  const [count, setCount] = useState(0)   // 0 is the initial value

  function increment() {
    setCount(count + 1)   // schedules a re-render
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Lazy initialization: pass a function to useState for expensive initial state
// The function runs only once on mount, not on every render
const [data, setData] = useState(() => parseJSON(localStorage.getItem('data')))`,
      },
      {
        title: 'State Updates Are Asynchronous',
        content:
          'This is one of the most common sources of bugs. When you call setState, the state does not change immediately. React batches updates and re-renders at the end of the event handler. If you read state immediately after calling the setter, you see the old value. If you need to update state based on the previous value, use the functional form of the setter — it receives the latest state as an argument, not the stale closure value.',
        code: `function Counter() {
  const [count, setCount] = useState(0)

  function buggyIncrement() {
    setCount(count + 1)   // count is still 0 here
    setCount(count + 1)   // count is STILL 0 — result: 1, not 2!
    console.log(count)    // 0 — state has not updated yet
  }

  function correctIncrement() {
    // Functional update: React passes the LATEST state as 'prev'
    setCount(prev => prev + 1)   // prev = 0, schedules count = 1
    setCount(prev => prev + 1)   // prev = 1, schedules count = 2 ✓
  }

  // Functional form is also needed inside useEffect and callbacks
  // where 'count' would be a stale closure value
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1)  // always correct — no stale closure
    }, 1000)
    return () => clearInterval(id)
  }, [])  // empty deps — safe because we use functional update

  return <button onClick={correctIncrement}>{count}</button>
}`,
      },
      {
        title: 'State for Objects and Arrays',
        content:
          'State can hold any JavaScript value, including objects and arrays. The cardinal rule: never mutate state directly. Always create a new value. React uses reference equality (`Object.is`) to detect changes — if you mutate the existing object, React sees the same reference and does not re-render. Use spread for objects and array methods that return new arrays (filter, map, concat) for arrays.',
        code: `function Form() {
  const [user, setUser] = useState({ name: '', email: '' })
  const [tags, setTags] = useState(['react'])

  // ✓ Correct: spread creates a new object reference
  function handleNameChange(e) {
    setUser(prev => ({ ...prev, name: e.target.value }))
  }

  // ✗ Wrong: mutating directly — React won't re-render
  function badUpdate() {
    user.name = 'New Name'   // same reference!
    setUser(user)            // React sees same object — no re-render
  }

  // ✓ Add item to array
  function addTag(tag) {
    setTags(prev => [...prev, tag])
  }

  // ✓ Remove item from array
  function removeTag(index) {
    setTags(prev => prev.filter((_, i) => i !== index))
  }

  // ✓ Update item in array
  function updateTag(index, newTag) {
    setTags(prev => prev.map((tag, i) => i === index ? newTag : tag))
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
      {
        question: 'What is the "lazy initialization" pattern with useState?',
        options: [
          'Calling useState with no argument so the initial value is undefined',
          'Passing a function to useState: `useState(() => computeInitial())` — the function runs only once on mount',
          'Calling useState inside a loop to delay initialization',
          'Using useEffect to set the initial state after the first render',
        ],
        correctIndex: 1,
        explanation:
          'If the initial state requires expensive computation (like reading from localStorage or parsing a large dataset), pass a function to useState: `useState(() => expensiveComputation())`. React calls this function once to get the initial value and ignores it on re-renders. Without lazy init, the computation would run on every render (even though the result is only used the first time).',
      },
      {
        question: 'When does the initial value argument to useState actually get used?',
        options: [
          'On every render',
          'Only on the first render (mount) — ignored on subsequent re-renders',
          'Whenever the state is reset to null',
          'Every time the parent component re-renders',
        ],
        correctIndex: 1,
        explanation:
          'The initial value is only used once — when the component first mounts. On every subsequent re-render, `useState` returns the current state, completely ignoring the initial value argument. This is why changing a prop passed as the initial value does not update the state — you need useEffect to sync prop changes to state.',
      },
    ],
  },

  {
    slug: 'use-effect',
    title: 'useEffect Hook',
    subtitle: 'Running side effects in sync with the component lifecycle',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'useEffect is how React components synchronize with things outside of React: APIs, browser APIs, timers, subscriptions, and DOM manipulation. The name "effect" refers to a "side effect" — anything that reaches outside the pure function of rendering. Understanding the dependency array and the cleanup function is what separates developers who understand React from those who just use it. Getting useEffect wrong is the source of infinite loops, memory leaks, and stale data bugs.',
    keyPoints: [
      'useEffect runs after the render is committed to the DOM',
      'The dependency array controls when the effect re-runs — missing deps cause stale bugs',
      'An empty dependency array [] means "run once after mount"',
      'The cleanup function runs before the next effect and on unmount',
    ],
    sections: [
      {
        title: 'The Dependency Array',
        content:
          'useEffect takes two arguments: the effect function, and a dependency array. The array tells React when to re-run the effect. No array = runs after every render (dangerous). Empty array `[]` = runs once after mount. Array with values = runs whenever those values change. The rule: include every reactive value (state, props, context) that the effect reads. Missing a dependency causes the effect to use stale values from an earlier render.',
        code: `import { useState, useEffect } from 'react'

function Examples() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // Runs after EVERY render — usually an accident/infinite loop risk
  useEffect(() => {
    console.log('Every render')
  })

  // Runs ONCE after mount (like componentDidMount)
  useEffect(() => {
    console.log('Mounted — fetch initial data here')
    document.title = 'App Loaded'
  }, [])

  // Runs after mount AND whenever 'count' changes
  useEffect(() => {
    document.title = \`Count is \${count}\`
  }, [count])  // 'count' is a dependency

  // Runs whenever 'name' OR 'count' changes
  useEffect(() => {
    console.log(\`name: \${name}, count: \${count}\`)
  }, [name, count])
}`,
      },
      {
        title: 'The Cleanup Function',
        content:
          'If your effect creates a subscription, timer, or event listener, you must clean it up by returning a cleanup function. React calls the cleanup before the next effect execution and when the component unmounts. Forgetting cleanup causes memory leaks (timers running after the component is gone), stale updates (setting state on an unmounted component), and multiplied subscriptions (accumulating from each render).',
        code: `function Timer({ isRunning }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)

    // CLEANUP: runs when isRunning changes or component unmounts
    return () => {
      clearInterval(id)
    }
  }, [isRunning])

  return <p>Time: {time}s</p>
}

// Event listener cleanup
function WindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)  // cleanup ✓
  }, [])

  return <p>{size.w} x {size.h}</p>
}`,
      },
      {
        title: 'Fetching Data with useEffect',
        content:
          'The most common useEffect use case is fetching data. Key patterns: always handle loading and error states, handle the race condition (a fast new request arriving after a slow old one by using a cancellation flag), and clean up on unmount. Note: in Next.js App Router and React 19, you should prefer fetching in Server Components or using `use()` over useEffect for data fetching.',
        code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false   // race condition guard

    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(\`/api/users/\${userId}\`)
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const data = await res.json()
        if (!cancelled) setUser(data)  // only update if still relevant
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUser()

    return () => { cancelled = true }  // cleanup: marks old requests as stale
  }, [userId])  // re-fetch whenever userId changes

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
      {
        question: 'What happens if you omit a dependency from the dependency array?',
        options: [
          'React will automatically add it',
          'A linting error occurs and the app crashes',
          'The effect runs with a stale version of that value from an earlier render',
          'The effect does not run at all',
        ],
        correctIndex: 2,
        explanation:
          'Omitting a dependency creates a "stale closure." The effect closes over the value from the render in which it was created — if that value later changes but the effect does not re-run (because it is not in deps), the effect reads the outdated value. This is a silent bug. The eslint-plugin-react-hooks linter rule `exhaustive-deps` catches missing dependencies.',
      },
      {
        question: 'What is a "race condition" in data fetching with useEffect and how do you prevent it?',
        options: [
          'Two effects running simultaneously — prevent with useCallback',
          'An older slow request resolving after a newer fast request, overwriting fresh data — prevent with a cancellation flag',
          'An effect running before the component is mounted — prevent with empty dependency array',
          'State updates inside effects conflicting — prevent with useReducer',
        ],
        correctIndex: 1,
        explanation:
          'If `userId` changes rapidly (e.g., user clicks through a list), multiple fetches start. If the first fetch is slow and resolves after the second (faster) fetch, it overwrites the correct data. Fix: set a `cancelled` flag in a closure and check it before calling `setState`. The cleanup function sets `cancelled = true` when `userId` changes, so old requests know to ignore their results.',
      },
    ],
  },

  {
    slug: 'custom-hooks',
    title: 'Custom Hooks',
    subtitle: 'Extracting and reusing stateful logic across components',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'Custom hooks are the most powerful abstraction pattern in React. They let you extract stateful logic — state, effects, refs, context — out of a component and into a reusable function. The rule: if a function uses other hooks, prefix it with `use` and it becomes a custom hook. This is how you eliminate duplicated logic across components without creating wrapper components or mixing concerns. Every major React library (React Query, Zustand, React Hook Form) exposes its functionality as custom hooks.',
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
          'When you find yourself writing the same useState/useEffect pattern in multiple components, it\'s time for a custom hook. Move the logic into a function that starts with `use`, call hooks inside it, and return what the components need. Custom hooks can return anything: a value, a tuple of [value, setter], an object of multiple values, or functions.',
        code: `// BEFORE: duplicated logic in every component that needs window width
function ComponentA() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return <p>Width in A: {width}</p>
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

// Now any component uses it in one line — no duplication:
function ComponentA() {
  const width = useWindowWidth()
  return <p>Width: {width}</p>
}

function ComponentB() {
  const width = useWindowWidth()
  return <div style={{ display: width > 768 ? 'flex' : 'block' }}>...</div>
}`,
      },
      {
        title: 'Custom Hook for Data Fetching',
        content:
          'A `useFetch` hook is the classic example — it encapsulates the loading/error/data pattern so every component that fetches data doesn\'t need to repeat the same boilerplate. The hook takes a URL and returns `{ data, loading, error }`. It automatically re-fetches when the URL changes, handles cleanup, and can be extended with caching and abort controllers.',
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
  }, [url])

  return { data, loading, error }
}

// Usage is clean — all the complexity is hidden in the hook:
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users')
  if (loading) return <Spinner />
  if (error) return <ErrorMessage text={error} />
  return users.map(u => <UserCard key={u.id} user={u} />)
}`,
      },
      {
        title: 'More Custom Hook Patterns',
        content:
          'Custom hooks can manage any kind of stateful logic. `useLocalStorage` syncs state with localStorage. `useDebounce` delays a value update. `useToggle` wraps a boolean with a flip function. Each hook becomes a named, testable unit of behavior that can be shared across your entire app and even across projects as an npm package.',
        code: `// useLocalStorage — persists state across page refreshes
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch { return initialValue }
  })

  function setStoredValue(newValue) {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}

// useDebounce — delays a value (great for search inputs)
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)  // cancel on every keystroke
  }, [value, delay])

  return debounced
}

// useToggle — simple but useful
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue(v => !v)
  return [value, toggle]
}

// Usage:
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const { data } = useFetch(\`/api/search?q=\${debouncedQuery}\`)
  // Only fetches 400ms after the user stops typing
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
      {
        question: 'Can you call a custom hook conditionally (inside an if statement)?',
        options: [
          'Yes — custom hooks have no restrictions',
          'No — all hooks (including custom) must be called at the top level, unconditionally',
          'Yes, but only custom hooks (not built-in hooks)',
          'Only if the condition is based on a prop',
        ],
        correctIndex: 1,
        explanation:
          'The Rules of Hooks apply to custom hooks just as they apply to built-in hooks. You cannot call hooks inside conditions, loops, or nested functions. React relies on the order of hook calls to correctly associate state across renders. Breaking this order causes React to mix up which state belongs to which hook.',
      },
      {
        question: 'What should a custom hook return?',
        options: [
          'Always an array of exactly [value, setter]',
          'Always a single value',
          'Whatever the hook\'s callers need — a value, tuple, object, or functions',
          'A JSX element',
        ],
        correctIndex: 2,
        explanation:
          'Custom hooks can return anything: a single value (`useWindowWidth` returns a number), a tuple like `[value, toggle]` (`useToggle`), an object like `{ data, loading, error }` (`useFetch`), or functions. The convention is to return an array (tuple) when the caller will likely destructure into custom names, and an object when there are many values.',
      },
    ],
  },

  {
    slug: 'use-context',
    title: 'useContext & Context API',
    subtitle: 'Sharing state across the component tree without prop drilling',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'Props work great for passing data one or two levels down. But when many components at different nesting levels need the same data — a logged-in user, a theme, a language preference — passing props through every intermediate component becomes tedious and fragile. This is "prop drilling." React\'s Context API solves it: you create a context, provide it at a high level in the tree, and any descendant can consume it directly with `useContext` — no intermediate components required.',
    keyPoints: [
      'Context provides a way to pass data through the component tree without prop drilling',
      'createContext() creates a context object with a default value',
      'The Provider wraps the tree and supplies a value to all consumers',
      'useContext(MyContext) subscribes a component to the context — it re-renders when the value changes',
    ],
    sections: [
      {
        title: 'The Problem: Prop Drilling',
        content:
          'Prop drilling is when you pass a prop through multiple intermediate components just to get it to a deeply nested component that actually needs it. The intermediate components do not use the prop — they just pass it along. This creates tight coupling (every intermediate component must know about the prop), makes refactoring hard, and clutters component signatures with unrelated props.',
        code: `// PROBLEM: prop drilling — user must pass through every level
function App() {
  const [user, setUser] = useState({ name: 'Sufyan', role: 'admin' })
  return <Page user={user} setUser={setUser} />
}

function Page({ user, setUser }) {
  // Page doesn't use user — just passes it down
  return <Sidebar user={user} setUser={setUser} />
}

function Sidebar({ user, setUser }) {
  // Sidebar doesn't use user — just passes it down
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }) {
  // Finally! This component actually uses it
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}`,
      },
      {
        title: 'Creating and Using Context',
        content:
          'The solution is a three-step pattern: (1) `createContext()` to create the context, (2) wrap the tree in `<Context.Provider value={...}>` to supply the value, (3) call `useContext(Context)` in any descendant to consume it. The component consuming context re-renders whenever the Provider\'s value changes. Export both the context and a custom hook for consuming it to keep usage clean.',
        code: `import { createContext, useContext, useState } from 'react'

// Step 1: Create context (null is the default when no Provider wraps)
const UserContext = createContext(null)

// Step 2: Create a custom hook for clean consumption
function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}

// Step 3: Create a Provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Sufyan', role: 'admin' })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Step 4: Wrap the app
function App() {
  return (
    <UserProvider>
      <Page />  {/* No user prop needed! */}
    </UserProvider>
  )
}

// Step 5: Any descendant consumes directly — no drilling
function UserMenu() {
  const { user, setUser } = useUser()
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}`,
      },
      {
        title: 'Performance: When to Use Context',
        content:
          'Every time the Provider\'s `value` changes, ALL components consuming that context re-render — even if they only use one property that did not change. Avoid creating a new object in the value on every render. Split contexts by how often they change: a UserContext (changes rarely) and a ThemeContext (changes when user toggles dark mode) should be separate so toggling the theme does not re-render components that only need user data.',
        code: `// PROBLEM: new object on every render — all consumers re-render every time!
function BadProvider({ children }) {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>  {/* new object each render */}
      {children}
    </UserContext.Provider>
  )
}

// FIX: memoize the value object
import { useMemo } from 'react'
function GoodProvider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user])  // stable reference
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Split contexts for better performance
const ThemeContext = createContext('light')    // changes on user toggle
const UserContext = createContext(null)        // changes on login/logout
// Components only re-render when their specific context changes`,
      },
    ],
    mcq: [
      {
        question: 'What problem does React Context solve?',
        options: [
          'Making components run faster by skipping renders',
          'Allowing global state without a library',
          'Passing data through a component tree without manually passing props at every level (prop drilling)',
          'Replacing useState for all state management',
        ],
        correctIndex: 2,
        explanation:
          'Context eliminates prop drilling — the pattern where props are passed through many intermediate components that don\'t use them just to reach a deeply nested component. With Context, the provider and consumer connect directly, and intermediate components don\'t need to know about the data at all.',
      },
      {
        question: 'What happens when the value of a Context Provider changes?',
        options: [
          'Only the Provider component re-renders',
          'All components in the tree re-render',
          'All components consuming that specific context re-render',
          'Nothing — consumers must manually check for changes',
        ],
        correctIndex: 2,
        explanation:
          'When the Provider\'s `value` prop changes, all components currently consuming that context with `useContext()` will re-render with the new value. Components that do not consume the context are unaffected. This is important for performance — a frequently changing context value causes many re-renders.',
      },
      {
        question: 'What is the default value of `createContext(defaultValue)` used for?',
        options: [
          'It is used as the initial state inside the Provider',
          'It is used when a component consumes the context without being inside any Provider',
          'It sets the maximum number of consumers',
          'It is used as the value until the Provider first renders',
        ],
        correctIndex: 1,
        explanation:
          'The default value of `createContext()` is only used when `useContext` is called in a component that has no matching Provider anywhere above it in the tree. It is useful as a fallback or for testing components in isolation. In practice, most providers supply a non-null value.',
      },
      {
        question: 'Why might splitting one large context into multiple smaller contexts improve performance?',
        options: [
          'Smaller contexts use less memory',
          'React can only handle a limited number of consumers per context',
          'Components only re-render when their specific consumed context changes — splitting means unrelated state changes don\'t trigger unnecessary re-renders',
          'Multiple contexts can be accessed in parallel',
        ],
        correctIndex: 2,
        explanation:
          'If you put theme and user data in the same context, toggling the theme causes all components consuming that context — including ones that only care about user data — to re-render. By splitting them (ThemeContext and UserContext), user-only components ignore theme changes and vice versa, minimizing unnecessary re-renders.',
      },
      {
        question: 'Is Context a replacement for state management libraries like Redux or Zustand?',
        options: [
          'Yes — Context replaces Redux entirely in modern React',
          'No — Context is for infrequently changing global values (theme, user); libraries handle complex state with optimized subscriptions',
          'Yes, but only for small applications',
          'No — Context is read-only and cannot hold mutable state',
        ],
        correctIndex: 1,
        explanation:
          'Context is excellent for low-frequency updates (authentication, theme, locale). For complex application state with many frequent updates, dedicated libraries (Zustand, Jotai, Redux Toolkit) offer optimized subscriptions — components re-render only when the specific slice they use changes. Context re-renders all consumers on any change to the provided value.',
      },
    ],
  },

  {
    slug: 'use-reducer',
    title: 'useReducer',
    subtitle: 'Managing complex state with predictable state transitions',
    category: 'react',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'When component state has multiple sub-values that change together, when the next state depends on the previous state in complex ways, or when state transitions have names (like "INCREMENT", "RESET", "FETCH_SUCCESS"), `useReducer` is a better fit than `useState`. It is React\'s implementation of the Redux pattern at the component level: a reducer function takes the current state and an action and returns the new state. All state transitions are explicit, predictable, and easy to test.',
    keyPoints: [
      'useReducer is an alternative to useState for complex state logic',
      'A reducer is a pure function: (state, action) => newState',
      'Actions are objects describing what happened — the reducer decides what changes',
      'All state transitions go through the reducer — making state changes explicit and traceable',
    ],
    sections: [
      {
        title: 'useState vs useReducer',
        content:
          'useState is ideal for independent, simple values. useReducer shines when: (1) the next state depends on the previous state in non-trivial ways, (2) multiple pieces of state change together in response to one event, or (3) the same state change happens in multiple places. The reducer centralizes all state logic, making it easy to understand all the ways state can change.',
        code: `// useState version — manageable but starts to get messy with many cases
function CounterWithUseState() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  return (
    <div>
      <button onClick={() => setCount(c => c - step)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + step)}>+</button>
      <button onClick={() => { setCount(0); setStep(1) }}>Reset</button>
      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} />
    </div>
  )
}

// useReducer version — all transitions explicit and centralized
const initialState = { count: 0, step: 1 }

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + state.step }
    case 'DECREMENT': return { ...state, count: state.count - state.step }
    case 'SET_STEP':  return { ...state, step: action.payload }
    case 'RESET':     return initialState
    default:          return state
  }
}`,
      },
      {
        title: 'Using useReducer in a Component',
        content:
          'Call `useReducer(reducer, initialState)` to get `[state, dispatch]`. `state` is the current state object. `dispatch` is a function you call with an action — the reducer processes the action and returns new state, triggering a re-render. Actions are plain objects with a `type` string and optional `payload`. By convention, types are SCREAMING_SNAKE_CASE strings.',
        code: `import { useReducer } from 'react'

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })}
      />
    </div>
  )
}

// More complex: a form reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, fields: { ...state.fields, [action.field]: action.value } }
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } }
    case 'SUBMIT_START':
      return { ...state, submitting: true, errors: {} }
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting: false, submitted: true }
    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, serverError: action.error }
    default:
      return state
  }
}`,
      },
      {
        title: 'useReducer + useContext for App-Level State',
        content:
          'Combining useReducer with useContext creates a lightweight global state solution that follows the Redux pattern without a library. The reducer lives in a context provider. Components dispatch actions to change state. This pattern is used by Redux itself and is how you understand what Redux is doing under the hood.',
        code: `const StoreContext = createContext(null)

const initialState = {
  user: null,
  cart: [],
  theme: 'light',
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':    return { ...state, user: action.payload }
    case 'ADD_TO_CART': return { ...state, cart: [...state.cart, action.item] }
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'LOGOUT':      return { ...initialState }
    default:            return state
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

// Any component can dispatch actions:
function LoginButton() {
  const { dispatch } = useContext(StoreContext)
  return (
    <button onClick={() => dispatch({ type: 'SET_USER', payload: { name: 'Sufyan' } })}>
      Login
    </button>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'What are the arguments to a reducer function?',
        options: [
          '(action, dispatch)',
          '(prevState, setState)',
          '(state, action)',
          '(action, newState)',
        ],
        correctIndex: 2,
        explanation:
          'A reducer is a pure function that takes `(state, action)` and returns a new state. The current state is the first argument, the action describing what happened is the second. The reducer never modifies state directly — it always returns a new state object.',
      },
      {
        question: 'What does `dispatch({ type: "INCREMENT" })` do?',
        options: [
          'Directly calls the INCREMENT function',
          'Sends the action object to the reducer, which computes new state and triggers a re-render',
          'Immediately updates state and re-renders',
          'Logs the action to the console',
        ],
        correctIndex: 1,
        explanation:
          '`dispatch` sends the action to the reducer. React calls `reducer(currentState, action)`, takes the returned new state, and schedules a re-render. The component receives the updated state on the next render. Dispatch itself is synchronous but the re-render is batched like setState.',
      },
      {
        question: 'When should you prefer useReducer over useState?',
        options: [
          'Always — useReducer is strictly better than useState',
          'Never — useState is always preferred for simplicity',
          'When state has complex logic with multiple sub-values changing together or when many different events trigger state transitions',
          'Only when integrating with Redux',
        ],
        correctIndex: 2,
        explanation:
          'useState is great for simple, independent values. useReducer is better when: state has multiple related fields that update together, the next state depends on the previous state in complex ways, or there are many different event types that modify state. The centralized reducer makes all transitions explicit and easier to reason about.',
      },
      {
        question: 'A reducer function must be:',
        options: [
          'Asynchronous — it returns a Promise',
          'Pure — given the same state and action, it always returns the same new state, with no side effects',
          'Connected to a database',
          'Defined inside the component',
        ],
        correctIndex: 1,
        explanation:
          'Reducers must be pure functions: given the same input (state + action), they always return the same output (new state). They cannot have side effects like API calls, timers, or random values. Side effects go in useEffect or event handlers. The purity of reducers makes them predictable, testable in isolation, and compatible with React\'s strict mode.',
      },
      {
        question: 'What is the `payload` convention in actions?',
        options: [
          'payload is a required field in all actions',
          'payload is the conventional name for the data an action carries beyond its type',
          'payload is used by React internally to process the action',
          'payload must be a string value',
        ],
        correctIndex: 1,
        explanation:
          '`payload` is a convention (not a requirement) for the data an action carries. For example, `{ type: "SET_STEP", payload: 5 }` carries the number 5 as the payload. Some teams use other names like `data` or inline it as `{ type: "ADD_ITEM", item: {...} }`. The key is consistency — pick a convention and stick to it.',
      },
    ],
  },

  {
    slug: 'use-ref-memo-callback',
    title: 'useRef, useMemo & useCallback',
    subtitle: 'Persisting values without re-renders and memoizing for performance',
    category: 'react',
    difficulty: 'advanced',
    readTime: '10 min',
    intro:
      'Not all data in a component needs to trigger re-renders. Sometimes you need a value that persists across renders but does NOT cause a re-render when it changes — that\'s `useRef`. When you have expensive computations or want to avoid unnecessary re-renders of child components, `useMemo` and `useCallback` let you cache values and functions. These are optimization hooks — understand the basics first, then apply these when you actually have a performance problem.',
    keyPoints: [
      'useRef creates a mutable container with a .current property — changes do NOT cause re-renders',
      'useRef is used for accessing DOM nodes, storing previous values, and persisting timers/IDs',
      'useMemo caches the result of an expensive computation until its dependencies change',
      'useCallback caches a function reference until its dependencies change — critical for referential equality',
    ],
    sections: [
      {
        title: 'useRef: Persistent Values Without Re-renders',
        content:
          'A `ref` is a plain JavaScript object `{ current: value }` that persists for the full lifetime of the component. Mutating `.current` does NOT trigger a re-render — this is the key difference from state. Refs have two main use cases: (1) accessing a DOM element directly (for focus, scroll, measurement), and (2) storing a mutable value that should persist across renders without causing re-renders (like interval IDs, previous state values, or flags).',
        code: `import { useRef, useEffect, useState } from 'react'

// Use case 1: DOM access
function TextInput() {
  const inputRef = useRef(null)  // will point to the <input> DOM element

  function focusInput() {
    inputRef.current.focus()     // direct DOM manipulation
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  )
}

// Use case 2: Storing values without re-renders
function Timer() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)  // store the interval ID

  function start() {
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000)
  }

  function stop() {
    clearInterval(intervalRef.current)
  }

  // Use case 3: Previous value
  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => { ref.current = value })  // updates AFTER render
    return ref.current  // returns PREVIOUS render's value
  }
}`,
      },
      {
        title: 'useMemo: Caching Expensive Computations',
        content:
          '`useMemo` caches the result of a computation. It only re-runs the computation when the listed dependencies change. Use it when: a computation is expensive (sorting/filtering large arrays, complex math), the result is used many times in the render, or you need referential stability for an object that is a dependency of another hook. Do not useMemo everything — it adds overhead and complicates code.',
        code: `import { useMemo, useState } from 'react'

function ProductList({ products, filters }) {
  const [sortBy, setSortBy] = useState('name')

  // WITHOUT useMemo: runs on EVERY render, even when products/filters/sortBy haven't changed
  // const filteredAndSorted = products
  //   .filter(p => p.price >= filters.minPrice)
  //   .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))

  // WITH useMemo: only re-runs when these dependencies change
  const filteredAndSorted = useMemo(() => {
    console.log('Computing sorted+filtered list...')
    return products
      .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
      .filter(p => filters.category === 'all' || p.category === filters.category)
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        return 0
      })
  }, [products, filters, sortBy])  // recompute when these change

  return <ul>{filteredAndSorted.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}`,
      },
      {
        title: 'useCallback: Stable Function References',
        content:
          '`useCallback` is like `useMemo` for functions — it returns the same function reference across renders unless dependencies change. Without it, a new function is created on every render. This matters for referential equality: if you pass a function as a prop to a child wrapped in `React.memo`, a new function reference on every render breaks the memoization and causes the child to re-render anyway. useCallback also prevents useEffect from running when a function dependency changes unnecessarily.',
        code: `import { useCallback, useState, memo } from 'react'

// Child only re-renders if its props change
const Button = memo(function Button({ onClick, label }) {
  console.log(\`\${label} rendered\`)
  return <button onClick={onClick}>{label}</button>
})

function Parent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // WITHOUT useCallback: new function on EVERY render
  // → Button re-renders even when only 'name' changes (because onClick is a new reference)

  // WITH useCallback: same function reference when count hasn't changed
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, [])  // no deps — setCount is stable

  const handleReset = useCallback(() => {
    setCount(0)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Button onClick={handleIncrement} label="+" />
      <Button onClick={handleReset} label="Reset" />
      {/* Button won't re-render when 'name' changes ✓ */}
    </div>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'What is the key difference between useRef and useState?',
        options: [
          'useRef can only store DOM elements; useState can store any value',
          'Mutating a ref\'s .current does NOT cause a re-render; calling a state setter does',
          'useState persists across renders; useRef resets on every render',
          'useRef is only for class components; useState is for functional components',
        ],
        correctIndex: 1,
        explanation:
          'The critical difference: mutating `ref.current` does not trigger a re-render. This makes refs perfect for values you want to persist across renders without causing UI updates — like interval IDs, previous values, or DOM references. State updates always trigger re-renders.',
      },
      {
        question: 'You want to store a setInterval ID so you can clear it later. Should you use useState or useRef?',
        options: [
          'useState — so the component re-renders when the interval starts/stops',
          'useRef — the ID is implementation detail that should not trigger a re-render',
          'Neither — use a module-level variable',
          'A local variable inside the component function',
        ],
        correctIndex: 1,
        explanation:
          'An interval ID is implementation detail — storing it in state would trigger an unnecessary re-render every time you save or clear the interval. A useRef persists the ID across renders without causing re-renders, and it does not become stale (unlike a local variable that gets recreated on each render).',
      },
      {
        question: 'When does useMemo re-compute its value?',
        options: [
          'On every render',
          'Never — it computes once and caches forever',
          'When the component unmounts and remounts',
          'When any of the listed dependencies change',
        ],
        correctIndex: 3,
        explanation:
          '`useMemo` recalculates only when its dependencies change. Between renders where dependencies stay the same, it returns the cached result from the last computation. If the dependency array is empty `[]`, it computes once on mount and never again.',
      },
      {
        question: 'Why does useCallback matter for React.memo?',
        options: [
          'React.memo requires all props to be wrapped in useCallback',
          'Without useCallback, a new function reference is created on every parent render, making React.memo\'s shallow comparison fail and the child re-render unnecessarily',
          'useCallback automatically adds React.memo to child components',
          'They work independently and have no interaction',
        ],
        correctIndex: 1,
        explanation:
          '`React.memo` skips re-rendering a child if its props have not changed — but it uses shallow (reference) equality. If the parent creates a new function on every render (without useCallback), the child receives a different function reference even when the logic is the same. React.memo sees a "changed" prop and re-renders. useCallback preserves the same reference, making React.memo effective.',
      },
      {
        question: 'Should you wrap all computations with useMemo and all functions with useCallback?',
        options: [
          'Yes — memoization always improves performance',
          'No — memoization has a cost (memory, dependency tracking). Only use it when you have a measured performance problem or referential stability is required',
          'Yes, but only for components with more than 100 lines of code',
          'Yes for useMemo, but not for useCallback',
        ],
        correctIndex: 1,
        explanation:
          'Premature optimization is harmful. useMemo and useCallback both add overhead — memory allocation for the cache, a dependency comparison on every render. For simple computations, this overhead can exceed the savings. Use them when: (1) a computation is demonstrably expensive (profile first!), (2) you need referential stability for a dependency of another hook, or (3) you are passing a function to a React.memo child.',
      },
    ],
  },

  {
    slug: 'react-forms',
    title: 'React Forms & Controlled Components',
    subtitle: 'Making form inputs predictable by letting React own their values',
    category: 'react',
    difficulty: 'beginner',
    readTime: '8 min',
    intro:
      'HTML form elements like `<input>`, `<textarea>`, and `<select>` maintain their own internal state in the DOM. React offers two approaches: controlled components (React owns the value via state) and uncontrolled components (the DOM owns the value, accessed via refs). Controlled components are the standard React approach — they make form values predictable, easy to validate, and in sync with React state. Understanding this pattern is essential for any form-heavy application.',
    keyPoints: [
      'A controlled component has its value driven by React state, not the DOM',
      'Every keystroke calls onChange which updates state, which updates the input value',
      'This creates a single source of truth — the form data is always in React state',
      'Uncontrolled components use useRef to read the DOM value on submit',
    ],
    sections: [
      {
        title: 'Controlled Components Pattern',
        content:
          'A controlled input ties its `value` to React state and its `onChange` to a state setter. Every keystroke fires onChange, which updates state, which causes a re-render, which sets the input\'s value to the new state. This circular flow ensures React always owns the current value. You can intercept, validate, or transform the value at any point in the cycle.',
        code: `import { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()  // prevent default form submission (page reload)

    if (!email.includes('@')) {
      setError('Invalid email address')
      return
    }

    // Submit to server — email and password are in state, always current
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}                            // controlled by state
        onChange={e => setEmail(e.target.value)} // update state on every keystroke
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  )
}`,
      },
      {
        title: 'Handling Multiple Inputs',
        content:
          'For forms with many fields, a common pattern is storing all field values in a single state object and using a single onChange handler that updates the right field based on the input\'s `name` attribute. This avoids creating a separate state variable and handler for every field.',
        code: `function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    role: 'user',
    terms: false,
  })

  // One handler for all fields — uses input's 'name' attribute
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"  value={form.name}  onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="age"   value={form.age}   onChange={handleChange} type="number" />
      <select name="role" value={form.role}  onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input name="terms" checked={form.terms} onChange={handleChange} type="checkbox" />
      <button type="submit">Register</button>
    </form>
  )
}`,
      },
      {
        title: 'Validation and Error Handling',
        content:
          'Controlled components make validation straightforward because form values are always in state. Validate on submit for a simple UX. Validate on blur (when the user leaves a field) for inline feedback. Validate on change for real-time feedback (use debouncing for async validation like checking email availability). Always show errors near the relevant field with helpful messages.',
        code: `function SignupForm() {
  const [fields, setFields] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate(name, value) {
    const newErrors = { ...errors }

    if (name === 'email') {
      if (!value) newErrors.email = 'Email is required'
      else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) newErrors.email = 'Invalid email'
      else delete newErrors.email
    }

    if (name === 'password') {
      if (!value) newErrors.password = 'Password is required'
      else if (value.length < 8) newErrors.password = 'Minimum 8 characters'
      else delete newErrors.password
    }

    return newErrors
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setErrors(validate(name, value))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitToAPI(fields)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="email" value={fields.email}
          onChange={e => setFields(p => ({ ...p, email: e.target.value }))}
          onBlur={handleBlur}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button disabled={submitting || Object.keys(errors).length > 0}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}`,
      },
    ],
    mcq: [
      {
        question: 'What makes a form input "controlled" in React?',
        options: [
          'It uses a special React form element instead of HTML',
          'Its value is driven by React state and updated via onChange',
          'It has validation logic attached to it',
          'It is wrapped in a form element with onSubmit',
        ],
        correctIndex: 1,
        explanation:
          'A controlled input has its `value` prop set from React state and its `onChange` handler updates that state. React becomes the "single source of truth" for the input\'s value — the DOM value always reflects the React state. Without the `value` prop, the input is uncontrolled (the DOM manages its own value).',
      },
      {
        question: 'Why is `e.preventDefault()` called in a form\'s onSubmit handler?',
        options: [
          'To prevent React from re-rendering the component',
          'To prevent the default browser behavior of reloading the page when a form is submitted',
          'To prevent the form from clearing its values',
          'To prevent other event listeners from running',
        ],
        correctIndex: 1,
        explanation:
          'By default, submitting an HTML form causes the browser to reload the page (or navigate to the action URL). In a React app, you handle form submission in JavaScript, so you need to call `e.preventDefault()` to stop the default behavior. Without it, your submit handler runs but then the page reloads, losing all state.',
      },
      {
        question: 'If you set `value` on an input but do not provide an `onChange` handler, what happens?',
        options: [
          'The input is read-only — React warns and the user cannot type in it',
          'The input updates normally but state is not synced',
          'React throws an error immediately',
          'The input value toggles between the state value and what the user types',
        ],
        correctIndex: 0,
        explanation:
          'Setting `value` without `onChange` creates a read-only input — React will warn "You provided a `value` prop to a form field without an `onChange` handler." The user\'s keystrokes are ignored because React keeps re-setting the input to the state value. To allow editing, always pair `value` with `onChange`. To make it truly read-only by intent, use `readOnly`.',
      },
      {
        question: 'What is the difference between the `value` and `defaultValue` props on an input?',
        options: [
          'They are identical — both set the initial and current value',
          '`value` makes the input controlled (React owns the value); `defaultValue` sets the initial DOM value (uncontrolled)',
          '`defaultValue` only works on select elements',
          '`value` is for text inputs; `defaultValue` is for checkboxes',
        ],
        correctIndex: 1,
        explanation:
          '`value` creates a controlled input — React owns the value and re-renders keep it in sync. `defaultValue` sets the initial value for an uncontrolled input and then React leaves the DOM in control. After mount, changes to `defaultValue` are ignored. Use `defaultValue` with `useRef` for uncontrolled forms.',
      },
      {
        question: 'For a checkbox input in React, which prop holds its current state?',
        options: [
          'value',
          'defaultChecked',
          'checked',
          'selected',
        ],
        correctIndex: 2,
        explanation:
          'Checkboxes use the `checked` prop (not `value`) for controlled state. `<input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />`. The event gives you `e.target.checked` (a boolean), not `e.target.value`. For radio buttons, use `checked` as well — true for the selected option.',
      },
    ],
  },
]
