export const javascriptConcepts = [
  {
    slug: 'execution-context',
    title: 'Execution Context',
    subtitle: 'The invisible engine that runs every line of your JavaScript',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '7 min',
    intro:
      'Before JavaScript runs a single line of your code, it creates something called an Execution Context — an internal environment that determines which variables exist, what "this" refers to, and where you are in the program. Understanding this is the key to understanding scope, hoisting, closures, and the call stack. Everything flows from here.',
    keyPoints: [
      'Every JavaScript program starts with a Global Execution Context',
      'A new Function Execution Context is created every time a function is called',
      'The Call Stack tracks all active execution contexts in LIFO order',
      'Each context has two phases: Creation and Execution',
    ],
    sections: [
      {
        title: 'What Is an Execution Context?',
        content:
          'An Execution Context (EC) is a record that JavaScript\'s engine creates to manage the execution of code. Think of it as a "container" that holds all the information needed to run a piece of code: the variables in scope, the value of `this`, and a reference to the outer environment. There are two main types: the Global EC (created once when the script loads) and Function EC (created each time a function is called).',
        code: `// When this script loads, a Global EC is created.
// It sets up: global object (window), 'this' = window, memory space for variables.

var name = 'Sufyan'      // stored in Global EC memory
var age = 18             // stored in Global EC memory

function greet() {
  // A new Function EC is created when greet() is called.
  // It has its own memory, its own 'this', and a link to the Global EC.
  var message = 'Hello!'
  console.log(message)
}

greet() // → pushes a new Function EC onto the Call Stack`,
      },
      {
        title: 'Creation Phase vs Execution Phase',
        content:
          'Every EC goes through two phases. In the Creation Phase, the engine scans the code and sets up memory: function declarations are stored in full, and variable declarations (var) are set to `undefined`. This is what causes "hoisting". In the Execution Phase, the code actually runs line by line, and variables get their real values.',
        code: `console.log(x)    // undefined — not an error! (Creation phase set it to undefined)
console.log(add)  // [Function: add] — function declarations are fully hoisted

var x = 10        // In Execution phase, x is now 10
console.log(x)    // 10

function add(a, b) {
  return a + b
}

// let and const are NOT initialized in creation phase — they are in the
// Temporal Dead Zone (TDZ) until their line is reached.
// console.log(y) // ReferenceError: Cannot access 'y' before initialization
let y = 20`,
      },
      {
        title: 'The Call Stack',
        content:
          'The Call Stack is a stack data structure (Last In, First Out) that tracks which Execution Context is currently running. When a function is called, its EC is pushed on top. When it returns, it is popped off. This is why JavaScript is single-threaded — only one EC can run at a time, the one on top of the stack.',
        code: `function third() {
  console.log('third runs') // Call Stack: [Global, first, second, third]
}

function second() {
  third()                   // Call Stack: [Global, first, second]
}

function first() {
  second()                  // Call Stack: [Global, first]
}

first()                     // Call Stack: [Global]
// After first() returns, stack is back to just Global EC`,
      },
    ],
    mcq: [
      {
        question: 'How many Global Execution Contexts exist in a single JavaScript program?',
        options: [
          'One — created when the script loads',
          'One per function called',
          'One per variable declared',
          'It depends on the browser',
        ],
        correctIndex: 0,
        explanation:
          'There is exactly one Global Execution Context per JavaScript program (or per browser tab). It is created when the script first loads and persists until the program ends. Every function call creates its own Function Execution Context on top of it.',
      },
      {
        question: 'During the Creation Phase, what value does JavaScript assign to a `var` variable before its line is reached?',
        options: ['null', 'undefined', 'ReferenceError is thrown', 'The variable does not exist yet'],
        correctIndex: 1,
        explanation:
          '`var` declarations are hoisted and initialized to `undefined` during the Creation Phase. This is why you can access a `var` variable before its line without an error — it exists, it\'s just `undefined`. `let` and `const` are different: they are in the Temporal Dead Zone and throw a ReferenceError if accessed early.',
      },
      {
        question: 'What data structure is used to track Execution Contexts?',
        options: ['Queue (FIFO)', 'Stack (LIFO)', 'Linked List', 'Hash Map'],
        correctIndex: 1,
        explanation:
          'The Call Stack uses a Last In, First Out (LIFO) structure. When a function is called, its EC is pushed to the top. When the function returns, it is popped off. The most recently called function is always the one currently running.',
      },
      {
        question: 'What happens to a Function Execution Context after the function returns?',
        options: [
          'It is saved for future calls to the same function',
          'It is moved to the Global EC',
          'It is popped from the Call Stack and destroyed',
          'It stays on the Call Stack until the program ends',
        ],
        correctIndex: 2,
        explanation:
          'When a function returns, its Execution Context is popped from the Call Stack and the memory it held is released (garbage collected, unless a closure keeps a reference to it). This is the normal lifecycle — created on call, destroyed on return.',
      },
    ],
  },

  {
    slug: 'closures',
    title: 'Closures',
    subtitle: 'How functions remember variables from where they were born',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'A closure is one of the most powerful and most misunderstood features of JavaScript. In plain terms: a closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. This is not magic — it is a direct consequence of how Execution Contexts and the scope chain work. Closures are the engine behind module patterns, memoization, event handlers, and every React hook you\'ve ever used.',
    keyPoints: [
      'A closure is formed when a function accesses a variable from an outer scope',
      'The inner function holds a reference to the outer scope, not a copy',
      'Closures survive even after the outer function has returned',
      'Every function in JavaScript is a closure over its surrounding scope',
    ],
    sections: [
      {
        title: 'What Creates a Closure?',
        content:
          'A closure is created when a function is defined inside another function and the inner function references a variable from the outer function. The inner function "closes over" that variable — it keeps a live reference to it. Even after the outer function finishes, the inner function still has access to that variable.',
        code: `function makeCounter() {
  let count = 0   // This variable lives in makeCounter's scope

  return function increment() {
    count++        // increment closes over 'count'
    return count
  }
}

const counter = makeCounter()  // makeCounter has returned — count should be gone
console.log(counter())  // 1   — but it's not! closure keeps it alive
console.log(counter())  // 2
console.log(counter())  // 3

// count is not accessible from outside — it's private
// console.log(count) // ReferenceError`,
      },
      {
        title: 'Closures Hold References, Not Copies',
        content:
          'This is the most important detail: the closure holds a reference to the variable, not a snapshot of its value at the time the closure was created. This means if the variable changes, the closure sees the new value. This is the source of a classic JavaScript bug with loops and `var`.',
        code: `// Classic bug: var in a loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Prints: 3, 3, 3  (not 0, 1, 2!)
// Why? All 3 functions close over the SAME 'i' variable.
// By the time they run, the loop has finished and i is 3.

// Fix 1: use let (block-scoped, new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Prints: 0, 1, 2  ✓

// Fix 2: use an IIFE to create a new scope per iteration
for (var i = 0; i < 3; i++) {
  ;((j) => setTimeout(() => console.log(j), 100))(i)
}`,
      },
      {
        title: 'Practical Uses of Closures',
        content:
          'Closures are everywhere in professional JavaScript. They power data privacy (module pattern), function factories, memoization, and event handlers. Every time you write a React useState setter or a useCallback, closures are involved.',
        code: `// 1. Data privacy — the module pattern
function createUser(name) {
  let loginCount = 0   // private — no one can access this directly

  return {
    login() {
      loginCount++
      console.log(\`\${name} logged in \${loginCount} times\`)
    },
    getCount() { return loginCount }
  }
}

const user = createUser('Sufyan')
user.login()     // Sufyan logged in 1 times
user.login()     // Sufyan logged in 2 times
user.getCount()  // 2

// 2. Memoization — cache expensive results
function memoize(fn) {
  const cache = {}
  return function(n) {
    if (n in cache) return cache[n]   // closure over 'cache'
    cache[n] = fn(n)
    return cache[n]
  }
}`,
      },
    ],
    mcq: [
      {
        question: 'What does a closure "close over"?',
        options: [
          'A copy of all variables at the time of creation',
          'A live reference to variables in its outer scope',
          'Only the global variables',
          'The return value of the outer function',
        ],
        correctIndex: 1,
        explanation:
          'A closure holds a live reference to the variables in its outer scope, not a copy. This means if the outer variable changes after the closure is created, the closure will see the updated value. This is why the `var` loop bug produces 3, 3, 3 — all closures reference the same `i`.',
      },
      {
        question: 'When is a closure created?',
        options: [
          'Only when using the `closure` keyword',
          'When a function is returned from another function',
          'Whenever a function accesses a variable from its outer scope',
          'Only in ES6 and later',
        ],
        correctIndex: 2,
        explanation:
          'A closure is created whenever a function accesses a variable from its surrounding (outer) scope. You don\'t need to return the function — just accessing an outer variable creates the closure. In fact, every function in JavaScript is technically a closure over its surrounding scope.',
      },
      {
        question: 'Why does `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100) }` print 3, 3, 3?',
        options: [
          'setTimeout is buggy',
          'All three arrow functions close over the same `i` variable, which is 3 by the time they run',
          'var is not accessible inside arrow functions',
          'Closures only capture the initial value of a variable',
        ],
        correctIndex: 1,
        explanation:
          'All three arrow functions close over the same single `i` variable (because `var` is function-scoped, not block-scoped). The loop finishes before any setTimeout callback runs, so `i` is already 3 when all three print. Replacing `var` with `let` creates a new `i` binding per iteration, fixing the issue.',
      },
      {
        question: 'After `makeCounter()` returns, what happens to the `count` variable inside it?',
        options: [
          'It is destroyed immediately',
          'It is moved to the global scope',
          'It is kept alive by the closure returned from makeCounter',
          'It resets to 0 on the next call to makeCounter',
        ],
        correctIndex: 2,
        explanation:
          'Normally, when a function returns, its local variables are garbage collected. But if a closure (inner function) still references those variables, JavaScript\'s garbage collector cannot destroy them — the closure keeps them alive. This is the core mechanism of closures.',
      },
    ],
  },

  {
    slug: 'event-loop',
    title: 'The Event Loop',
    subtitle: 'How JavaScript handles async code despite being single-threaded',
    category: 'javascript',
    difficulty: 'advanced',
    readTime: '9 min',
    intro:
      'JavaScript is single-threaded — it can only do one thing at a time. But websites handle clicks, fetch data, run timers, and render animations simultaneously. How? The answer is the Event Loop: a coordination system between the Call Stack, the Web APIs, the Microtask Queue, and the Task Queue. Understanding this tells you exactly why Promises resolve before setTimeout, why async/await behaves the way it does, and how to avoid blocking the main thread.',
    keyPoints: [
      'JavaScript has one Call Stack — only one task runs at a time',
      'Async tasks (setTimeout, fetch, DOM events) are handled by Web APIs outside the JS engine',
      'Microtasks (Promises, queueMicrotask) always run before the next macrotask',
      'Blocking the Call Stack freezes the UI — never run heavy sync work on the main thread',
    ],
    sections: [
      {
        title: 'The Players: Stack, Heap, Queues',
        content:
          'The JavaScript runtime has several components working together. The Call Stack executes code synchronously. The Heap stores objects in memory. Web APIs (provided by the browser) handle timers, HTTP requests, and DOM events asynchronously. When an async operation completes, its callback is placed in a Queue. The Event Loop\'s job is to move callbacks from the Queue to the Stack when the Stack is empty.',
        code: `// Synchronous — runs immediately, blocks the stack
console.log('1 — sync')

// Async macrotask — Web API handles the timer, callback goes to Task Queue
setTimeout(() => console.log('2 — setTimeout'), 0)

// Async microtask — goes to Microtask Queue
Promise.resolve().then(() => console.log('3 — Promise'))

console.log('4 — sync')

// Output order:
// 1 — sync
// 4 — sync
// 3 — Promise     ← microtask runs before macrotask!
// 2 — setTimeout  ← macrotask runs last`,
      },
      {
        title: 'Microtasks vs Macrotasks',
        content:
          'This is the most important detail. There are two types of async queues. The Microtask Queue has higher priority — it is fully drained before the Event Loop moves to the next macrotask. Promise `.then()` callbacks, `queueMicrotask()`, and `MutationObserver` callbacks are microtasks. `setTimeout`, `setInterval`, and DOM events are macrotasks.',
        code: `console.log('start')

setTimeout(() => console.log('timeout 1'), 0)    // macrotask
setTimeout(() => console.log('timeout 2'), 0)    // macrotask

Promise.resolve()
  .then(() => console.log('promise 1'))           // microtask
  .then(() => console.log('promise 2'))           // microtask (chained)

console.log('end')

// Output:
// start
// end
// promise 1    ← all microtasks drain first
// promise 2
// timeout 1    ← then macrotasks run one by one
// timeout 2`,
      },
      {
        title: 'async/await Is Just Promises',
        content:
          'async/await is syntactic sugar over Promises. An `await` expression pauses the async function and schedules the rest of it as a microtask — it does NOT block the Call Stack. The rest of your synchronous code continues while the awaited value resolves.',
        code: `async function fetchUser() {
  console.log('B — inside async fn, before await')
  const data = await Promise.resolve({ name: 'Sufyan' })
  // Everything after await runs as a microtask
  console.log('D — after await, got:', data.name)
}

console.log('A — sync start')
fetchUser()
console.log('C — sync continues while fetchUser is awaiting')

// Output:
// A — sync start
// B — inside async fn, before await
// C — sync continues while fetchUser is awaiting
// D — after await, got: Sufyan`,
      },
    ],
    mcq: [
      {
        question: 'What is the correct output order?\n\nconsole.log("A")\nsetTimeout(() => console.log("B"), 0)\nPromise.resolve().then(() => console.log("C"))\nconsole.log("D")',
        options: ['A, B, C, D', 'A, D, B, C', 'A, D, C, B', 'A, C, D, B'],
        correctIndex: 2,
        explanation:
          'A and D are synchronous — they run first, in order. Then the microtask queue is drained (C — the Promise). Then the macrotask queue runs (B — the setTimeout). Rule: sync → microtasks → macrotasks.',
      },
      {
        question: 'Why do Promise callbacks run before setTimeout callbacks, even with setTimeout(fn, 0)?',
        options: [
          'Promises are faster to execute',
          'setTimeout is always delayed by at least 4ms',
          'Promise callbacks go to the Microtask Queue, which is drained before any macrotask',
          'The Event Loop checks Promises first by convention',
        ],
        correctIndex: 2,
        explanation:
          'After every macrotask (and after the current synchronous code), the Event Loop fully drains the Microtask Queue before picking up the next macrotask. Promise callbacks are microtasks. So no matter how short the setTimeout delay is, Promise callbacks always run first.',
      },
      {
        question: 'What does `await` actually do to the Call Stack?',
        options: [
          'It blocks the Call Stack until the Promise resolves',
          'It pauses the async function and schedules its continuation as a microtask, freeing the stack',
          'It moves execution to a separate thread',
          'It creates a new Call Stack for async operations',
        ],
        correctIndex: 1,
        explanation:
          '`await` does NOT block the Call Stack. It pauses the async function, saves its state, and returns control to the caller. When the awaited Promise resolves, the rest of the async function is scheduled as a microtask. This is why code after `fetchUser()` runs before the code after `await`.',
      },
    ],
  },

  {
    slug: 'prototypes',
    title: 'Prototypes & Inheritance',
    subtitle: 'How JavaScript objects share behavior without classes',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'JavaScript does not have traditional class-based inheritance like Java or C++. It has prototypal inheritance — objects can directly inherit from other objects via a prototype chain. When you access a property on an object and it doesn\'t exist there, JavaScript looks up the prototype chain until it finds it or reaches null. Classes in JavaScript (ES6) are just clean syntax over this same prototype system.',
    keyPoints: [
      'Every object has a hidden [[Prototype]] link to another object',
      'Property lookup climbs the prototype chain until found or null is reached',
      'Functions have a .prototype property used when called with new',
      'ES6 classes are syntactic sugar — they compile to prototypes under the hood',
    ],
    sections: [
      {
        title: 'The Prototype Chain',
        content:
          'Every object in JavaScript has an internal [[Prototype]] slot (accessible as __proto__ or via Object.getPrototypeOf()). When you access a property, JS first looks at the object itself. If not found, it looks at the prototype, then the prototype\'s prototype, and so on until it reaches Object.prototype, then null. This chain is how shared methods like .toString() and .hasOwnProperty() work on every object.',
        code: `const animal = {
  breathe() { return 'breathing' }
}

const dog = Object.create(animal)   // dog's prototype = animal
dog.bark = function() { return 'woof' }

console.log(dog.bark())     // 'woof'    — found on dog itself
console.log(dog.breathe())  // 'breathing' — found up the chain on animal
console.log(dog.toString()) // '[object Object]' — found on Object.prototype

// The chain: dog → animal → Object.prototype → null
console.log(Object.getPrototypeOf(dog) === animal)  // true`,
      },
      {
        title: 'Constructor Functions and .prototype',
        content:
          'Before ES6 classes, developers used constructor functions called with `new`. When you call `new Foo()`, JavaScript creates a new object, sets its [[Prototype]] to `Foo.prototype`, and runs the constructor. Methods placed on `Foo.prototype` are shared across all instances — they are not copied into each object.',
        code: `function Person(name) {
  this.name = name   // stored on the instance
}

// Methods on .prototype are shared — not duplicated per instance
Person.prototype.greet = function() {
  return \`Hi, I'm \${this.name}\`
}

const a = new Person('Sufyan')
const b = new Person('Ahmed')

console.log(a.greet())  // Hi, I'm Sufyan
console.log(b.greet())  // Hi, I'm Ahmed

// Both instances share the SAME greet function
console.log(a.greet === b.greet)  // true ✓ (memory efficient)
console.log(a.name === b.name)    // false (each has own name)`,
      },
      {
        title: 'ES6 Classes — Same Thing, Cleaner Syntax',
        content:
          'ES6 class syntax looks like Java, but it compiles down to the exact same prototype chain. Understanding this matters because it prevents confusion when you see prototype-based code and helps you debug class inheritance issues.',
        code: `class Animal {
  constructor(name) {
    this.name = name
  }
  speak() {
    return \`\${this.name} makes a sound\`
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`   // overrides Animal's speak
  }
}

const d = new Dog('Rex')
console.log(d.speak())         // Rex barks
console.log(d instanceof Dog)  // true
console.log(d instanceof Animal)  // true — chain includes Animal

// Under the hood, Dog.prototype.__proto__ === Animal.prototype`,
      },
    ],
    mcq: [
      {
        question: 'What happens when you access a property that does not exist on an object?',
        options: [
          'It throws a TypeError immediately',
          'It returns null',
          'JavaScript climbs the prototype chain looking for it, returning undefined if not found',
          'JavaScript creates the property automatically',
        ],
        correctIndex: 2,
        explanation:
          'JavaScript looks up the prototype chain — from the object, to its prototype, to its prototype\'s prototype, and so on until Object.prototype. If the property is never found, it returns `undefined` (not an error). An error only occurs if you try to call `undefined` as a function.',
      },
      {
        question: 'Methods defined on `Constructor.prototype` are:',
        options: [
          'Copied into each new instance',
          'Shared across all instances via the prototype chain',
          'Only accessible on the constructor itself',
          'Only available when using `new`',
        ],
        correctIndex: 1,
        explanation:
          'Methods on `.prototype` are not duplicated — they live on the prototype object and are shared by all instances through the chain. This is a key performance advantage: 1000 instances of Person share the same `greet` function, rather than each storing their own copy.',
      },
      {
        question: 'What does ES6 `class` syntax actually compile to under the hood?',
        options: [
          'A completely new inheritance system separate from prototypes',
          'A copy-based system where methods are cloned per instance',
          'Prototype-based inheritance — classes are syntactic sugar',
          'TypeScript interfaces',
        ],
        correctIndex: 2,
        explanation:
          'ES6 classes are pure syntactic sugar over JavaScript\'s existing prototype system. `class Dog extends Animal` is equivalent to setting `Dog.prototype.__proto__ = Animal.prototype`. The class keyword makes the syntax familiar to developers from other languages, but the runtime behavior is prototypal.',
      },
    ],
  },

  {
    slug: 'async-await',
    title: 'Async/Await & Promises',
    subtitle: 'Writing asynchronous code that reads like it is synchronous',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'Most real applications need to wait for things: API responses, database queries, file reads. JavaScript handles this without blocking the main thread using Promises and async/await. A Promise represents a value that will be available in the future. async/await is syntax built on top of Promises that makes asynchronous code look and behave like sequential synchronous code, while still being fully non-blocking.',
    keyPoints: [
      'A Promise is an object representing a future value: pending, fulfilled, or rejected',
      'async functions always return a Promise, even if you return a plain value',
      'await pauses the async function — not the whole program — until the Promise resolves',
      'Use try/catch with async/await for error handling',
    ],
    sections: [
      {
        title: 'Promises: The Foundation',
        content:
          'A Promise is an object with three possible states: pending (waiting), fulfilled (resolved with a value), or rejected (failed with an error). You chain `.then()` for success and `.catch()` for errors. Once a Promise settles (fulfills or rejects), it never changes state.',
        code: `// Creating a Promise manually
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true
    if (success) {
      resolve({ name: 'Sufyan', age: 18 })  // fulfills the Promise
    } else {
      reject(new Error('Something went wrong'))  // rejects it
    }
  }, 1000)
})

// Consuming the Promise
fetchData
  .then(data => {
    console.log(data.name)   // 'Sufyan'
    return data.age          // return value becomes next .then's argument
  })
  .then(age => console.log(age))   // 18
  .catch(err => console.error(err.message))`,
      },
      {
        title: 'async/await — Promises with Cleaner Syntax',
        content:
          'async/await does not replace Promises — it wraps them. An `async` function implicitly returns a Promise. `await` can only be used inside an async function. It pauses the function, waits for the Promise to resolve, and gives you the value directly — no .then() chains needed.',
        code: `// Same logic as above, but with async/await
async function getUser() {
  try {
    // await pauses getUser() — not the whole program
    const response = await fetch('https://api.example.com/user/1')

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`)
    }

    const data = await response.json()   // another await — fine!
    console.log(data.name)
    return data   // this becomes the resolved value of the returned Promise
  } catch (err) {
    console.error('Failed to fetch:', err.message)
    // don't re-throw if you handle it here
  }
}

getUser()   // returns a Promise — you can still .then() it if needed`,
      },
      {
        title: 'Running Promises in Parallel',
        content:
          'A common mistake is awaiting Promises sequentially when they could run in parallel. `await` inside a loop is especially wasteful. Use `Promise.all()` to run multiple Promises simultaneously and wait for all of them.',
        code: `// SLOW — sequential: waits 3s total (1s + 1s + 1s)
async function slow() {
  const a = await fetch('/api/users')      // wait 1s
  const b = await fetch('/api/products')   // wait 1s
  const c = await fetch('/api/orders')     // wait 1s
}

// FAST — parallel: waits ~1s total (all start at the same time)
async function fast() {
  const [users, products, orders] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/products'),
    fetch('/api/orders'),
  ])
}

// Promise.allSettled — doesn't fail if one rejects
// Promise.race — resolves/rejects with the first to settle
// Promise.any — resolves with the first to fulfill`,
      },
    ],
    mcq: [
      {
        question: 'What does an `async` function always return?',
        options: [
          'The value you returned with `return`',
          'undefined if no return statement',
          'A Promise, regardless of what you return',
          'A callback function',
        ],
        correctIndex: 2,
        explanation:
          'An async function always returns a Promise. If you `return 42`, it returns `Promise.resolve(42)`. If you throw an error, it returns a rejected Promise. This is why you can call `.then()` on an async function\'s return value.',
      },
      {
        question: 'What is wrong with this code?\nasync function loadAll() {\n  const a = await fetch(\'/a\')\n  const b = await fetch(\'/b\')\n}',
        options: [
          'await cannot be used multiple times in one function',
          'fetch() requires a callback, not await',
          'The two fetches run sequentially, wasting time when they could run in parallel',
          'There is nothing wrong — this is the correct pattern',
        ],
        correctIndex: 2,
        explanation:
          'Each `await` pauses the function until the previous request finishes before starting the next one. Since the two requests are independent, this wastes time. `Promise.all([fetch(\'/a\'), fetch(\'/b\')])` starts both at once and waits for both, cutting the time roughly in half.',
      },
      {
        question: 'A Promise in "pending" state means:',
        options: [
          'It has been rejected',
          'It has resolved but the value has not been read yet',
          'The async operation is still in progress',
          'The Promise was created but never given a resolve or reject function',
        ],
        correctIndex: 2,
        explanation:
          'Pending is the initial state — the async operation is still running. Once it completes, the Promise either fulfills (resolved with a value) or rejects (failed with a reason). A Promise can only change state once — from pending to fulfilled or from pending to rejected. It never goes back.',
      },
    ],
  },
]
