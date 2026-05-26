export const javascriptConcepts = [
  {
    slug: 'execution-context',
    title: 'Execution Context',
    subtitle: 'The invisible engine that runs every line of your JavaScript',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'Before JavaScript runs a single line of your code, it creates something called an Execution Context — an internal environment that determines which variables exist, what "this" refers to, and where you are in the program. Understanding this is the key to understanding scope, hoisting, closures, and the call stack. Everything in JavaScript flows from here.',
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
          'An Execution Context (EC) is a record that JavaScript\'s engine creates to manage the execution of code. Think of it as a "container" that holds all the information needed to run a piece of code: the variables in scope, the value of `this`, and a reference to the outer environment. There are two main types: the Global EC (created once when the script loads) and Function EC (created each time a function is called). Every context has a Variable Environment (memory for variables/functions), a Lexical Environment (scope chain pointer), and a `this` binding.',
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
          'Every EC goes through two phases. In the Creation Phase, the engine scans the code and sets up memory: function declarations are stored in full, and variable declarations (var) are set to `undefined`. This is what causes "hoisting." In the Execution Phase, the code actually runs line by line, and variables get their real values. `let` and `const` are hoisted too — but they are placed in the Temporal Dead Zone (TDZ) and cannot be accessed before their declaration.',
        code: `console.log(x)    // undefined — not an error! (Creation phase set it to undefined)
console.log(add)  // [Function: add] — function declarations are fully hoisted

var x = 10        // In Execution phase, x is now 10
console.log(x)    // 10

function add(a, b) {
  return a + b
}

// let and const are in the Temporal Dead Zone until their line is reached.
// console.log(y) // ReferenceError: Cannot access 'y' before initialization
let y = 20

// const behaves the same as let for TDZ
// console.log(z) // ReferenceError
const z = 30`,
      },
      {
        title: 'The Call Stack',
        content:
          'The Call Stack is a stack data structure (Last In, First Out) that tracks which Execution Context is currently running. When a function is called, its EC is pushed on top. When it returns, it is popped off. This is why JavaScript is single-threaded — only one EC can run at a time, the one on top of the stack. A "stack overflow" error occurs when the stack gets too deep, usually from infinite recursion.',
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
// After first() returns, stack is back to just Global EC

// Stack Overflow example:
// function infinite() { infinite() }  // RangeError: Maximum call stack size exceeded`,
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
      {
        question: 'What is the Temporal Dead Zone (TDZ)?',
        options: [
          'The time between a script loading and the first line executing',
          'The zone where `var` variables exist before the script runs',
          'The region between the start of a block scope and a let/const declaration where accessing the variable throws a ReferenceError',
          'A browser-specific delay in executing JavaScript',
        ],
        correctIndex: 2,
        explanation:
          'The TDZ is the period from the start of the block where a `let` or `const` is declared until the actual declaration line is reached. In this zone the variable is technically hoisted (the engine knows it exists) but is not initialized — accessing it throws a ReferenceError. This prevents the confusing "undefined before declaration" behavior of `var`.',
      },
      {
        question: 'What causes a "Maximum call stack size exceeded" (stack overflow) error?',
        options: [
          'Declaring too many variables in the global scope',
          'A function recursing infinitely, pushing new ECs onto the stack until it is full',
          'Using async/await incorrectly',
          'Calling setTimeout too many times',
        ],
        correctIndex: 1,
        explanation:
          'Each function call pushes a new Execution Context onto the Call Stack. The stack has a finite size. If a function keeps calling itself without a base case (infinite recursion), the stack fills up and the engine throws a "Maximum call stack size exceeded" RangeError. This is the "stack overflow" error.',
      },
    ],
  },

  {
    slug: 'closures',
    title: 'Closures',
    subtitle: 'How functions remember variables from where they were born',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'A closure is one of the most powerful and most misunderstood features of JavaScript. In plain terms: a closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. This is not magic — it is a direct consequence of how Execution Contexts and the scope chain work. Closures are the engine behind module patterns, memoization, event handlers, and every React hook you\'ve ever used.',
    keyPoints: [
      'A closure is formed when a function accesses a variable from an outer scope',
      'The inner function holds a live reference to the outer scope, not a copy of its value',
      'Closures survive even after the outer function has returned',
      'Every function in JavaScript is a closure over its surrounding scope',
    ],
    sections: [
      {
        title: 'What Creates a Closure?',
        content:
          'A closure is created when a function is defined inside another function and the inner function references a variable from the outer function. The inner function "closes over" that variable — it keeps a live reference to it. Even after the outer function finishes and its Execution Context is popped from the Call Stack, the inner function still has access to that variable because the closure prevents it from being garbage collected.',
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
          'This is the most important detail: the closure holds a reference to the variable, not a snapshot of its value at the time the closure was created. This means if the variable changes, the closure sees the new value. This is the source of a classic JavaScript bug with loops and `var` — all closures in the loop share the same variable reference, so they all see the final value when executed.',
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
          'Closures are everywhere in professional JavaScript. They power data privacy (module pattern), function factories, memoization, and event handlers. Every time you write a React useState setter or a useCallback, closures are involved. Understanding closures is what separates junior developers from senior ones — virtually every advanced JavaScript pattern depends on them.',
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
}

// 3. Function factories
function multiplier(factor) {
  return (number) => number * factor   // closes over 'factor'
}
const double = multiplier(2)
const triple = multiplier(3)
console.log(double(5))  // 10
console.log(triple(5))  // 15`,
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
      {
        question: 'What is the module pattern and how does it use closures?',
        options: [
          'It uses import/export to share code between files',
          'It uses closures to create private variables and expose a public API through returned methods',
          'It uses classes to encapsulate behavior',
          'It prevents functions from accessing global variables',
        ],
        correctIndex: 1,
        explanation:
          'The module pattern uses closures to simulate private state. You define variables inside a function (making them private), then return an object with methods that close over those private variables. External code can only interact through the returned API — the private variables cannot be accessed or mutated directly. This is how you get data encapsulation in JavaScript without classes.',
      },
      {
        question: 'In React, why do stale closures occur in useEffect?',
        options: [
          'React clears all closures after each render',
          'useEffect closes over state/props values from the render in which it was created, not the latest render',
          'useEffect does not support closures',
          'Stale closures only happen in class components',
        ],
        correctIndex: 1,
        explanation:
          'In React, each render creates a snapshot of state and props. When a useEffect runs, it closes over the values from that specific render. If state updates but the effect does not re-run (because of its dependency array), the effect\'s closure still sees the old values — a "stale closure." The fix is to include the value in the dependency array, or use a ref to always have the latest value.',
      },
    ],
  },

  {
    slug: 'event-loop',
    title: 'The Event Loop',
    subtitle: 'How JavaScript handles async code despite being single-threaded',
    category: 'javascript',
    difficulty: 'advanced',
    readTime: '10 min',
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
          'The JavaScript runtime has several components working together. The Call Stack executes code synchronously. The Heap stores objects in memory. Web APIs (provided by the browser) handle timers, HTTP requests, and DOM events asynchronously. When an async operation completes, its callback is placed in a Queue. The Event Loop\'s single job is to check if the Call Stack is empty — and if it is, move the next callback from the Queue onto the Stack.',
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
          'There are two types of async queues with different priorities. The Microtask Queue has higher priority — it is fully drained (every item processed) before the Event Loop picks the next macrotask. Promise `.then()` callbacks, `queueMicrotask()`, and `MutationObserver` callbacks are microtasks. `setTimeout`, `setInterval`, I/O operations, and DOM events are macrotasks. This means you can starve macrotasks by indefinitely adding microtasks.',
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
// timeout 2

// Microtask starvation example (don't do this!):
// function starve() {
//   Promise.resolve().then(starve)  // new microtask every cycle — timeouts never run
// }`,
      },
      {
        title: 'async/await Is Just Promises',
        content:
          'async/await is syntactic sugar over Promises. An `await` expression pauses the async function and schedules the rest of it as a microtask — it does NOT block the Call Stack. The rest of your synchronous code continues while the awaited value resolves. Every `await` introduces a microtask checkpoint — code after the `await` runs in a microtask, after the current synchronous code finishes.',
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
// D — after await, got: Sufyan

// requestAnimationFrame is a special macrotask that runs before paint:
// requestAnimationFrame(() => console.log('before next frame'))`,
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
      {
        question: 'Which of these is a MACROTASK (not a microtask)?',
        options: [
          'Promise.resolve().then()',
          'queueMicrotask()',
          'setTimeout(fn, 0)',
          'async/await continuation',
        ],
        correctIndex: 2,
        explanation:
          'setTimeout callbacks go to the Macrotask Queue (also called the Task Queue). Promise.then callbacks, queueMicrotask, and async/await continuations all go to the Microtask Queue. The key distinction is that microtasks are processed completely after each task, before the next task from the Macrotask Queue.',
      },
      {
        question: 'What happens if you continuously add new microtasks from within a microtask?',
        options: [
          'The browser crashes immediately',
          'Macrotasks (like setTimeout) are starved — they never run until microtasks stop',
          'JavaScript automatically moves some microtasks to the macrotask queue',
          'Nothing special — microtasks and macrotasks alternate normally',
        ],
        correctIndex: 1,
        explanation:
          'The Microtask Queue is fully drained before the Event Loop picks the next macrotask. If a microtask keeps adding more microtasks, the queue never empties, and macrotasks (like setTimeout, UI rendering) never get a chance to run — this is called "microtask starvation." It is the async equivalent of an infinite loop.',
      },
    ],
  },

  {
    slug: 'prototypes',
    title: 'Prototypes & Inheritance',
    subtitle: 'How JavaScript objects share behavior without classical classes',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'JavaScript does not have traditional class-based inheritance like Java or C++. It has prototypal inheritance — objects can directly inherit from other objects via a prototype chain. When you access a property on an object and it doesn\'t exist there, JavaScript looks up the prototype chain until it finds it or reaches null. Classes in JavaScript (ES6) are just clean syntax over this same prototype system — understanding prototypes means understanding the true heart of JavaScript\'s object model.',
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
          'Every object in JavaScript has an internal [[Prototype]] slot (accessible as __proto__ or via Object.getPrototypeOf()). When you access a property, JS first looks at the object itself. If not found, it looks at the prototype, then the prototype\'s prototype, and so on until it reaches Object.prototype, then null. This chain is how shared methods like .toString() and .hasOwnProperty() work on every object without being defined on the object itself.',
        code: `const animal = {
  breathe() { return 'breathing' }
}

const dog = Object.create(animal)   // dog's [[Prototype]] = animal
dog.bark = function() { return 'woof' }

console.log(dog.bark())     // 'woof'      — found on dog itself
console.log(dog.breathe())  // 'breathing' — found on animal (prototype)
console.log(dog.toString()) // '[object Object]' — found on Object.prototype

// The chain: dog → animal → Object.prototype → null
console.log(Object.getPrototypeOf(dog) === animal)  // true

// hasOwnProperty checks the object itself, NOT the chain
console.log(dog.hasOwnProperty('bark'))    // true
console.log(dog.hasOwnProperty('breathe')) // false — it's inherited`,
      },
      {
        title: 'Constructor Functions and .prototype',
        content:
          'Before ES6 classes, developers used constructor functions called with `new`. When you call `new Foo()`, JavaScript (1) creates a new empty object, (2) sets its [[Prototype]] to `Foo.prototype`, (3) runs the constructor with `this` pointing to the new object, and (4) returns the new object. Methods placed on `Foo.prototype` are shared across all instances — they are not copied into each object, saving memory.',
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
console.log(a.name === b.name)    // false (each has own 'name')

// instanceof checks the prototype chain
console.log(a instanceof Person)  // true`,
      },
      {
        title: 'ES6 Classes — Same Thing, Cleaner Syntax',
        content:
          'ES6 class syntax looks like Java, but it compiles down to the exact same prototype chain. `extends` sets up the prototype chain between two constructors. `super()` calls the parent constructor. Understanding this matters because it prevents confusion when you see prototype-based code, and helps you debug class inheritance issues by knowing the true underlying mechanism.',
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
console.log(d.speak())            // Rex barks
console.log(d instanceof Dog)     // true
console.log(d instanceof Animal)  // true — chain includes Animal

// Under the hood: Dog.prototype.__proto__ === Animal.prototype
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype)  // true

// Property shadowing: own property takes precedence over inherited
d.breathe = () => 'custom breathe'  // shadows any inherited breathe`,
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
      {
        question: 'What does `hasOwnProperty()` check?',
        options: [
          'Whether a property exists anywhere in the prototype chain',
          'Whether a property exists directly on the object, not inherited from its prototype',
          'Whether a property is writable',
          'Whether a property was defined with const',
        ],
        correctIndex: 1,
        explanation:
          '`hasOwnProperty()` returns true only if the property is a direct (own) property of the object — not inherited through the prototype chain. `dog.hasOwnProperty("bark")` returns true if `bark` was set directly on `dog`. Use it to distinguish own properties from inherited ones when iterating.',
      },
      {
        question: 'What are the four steps JavaScript performs when you call `new Person("Sufyan")`?',
        options: [
          'Clone Person, run constructor, return the clone, set prototype',
          'Create empty object, set prototype to Person.prototype, run constructor with this=new object, return the object',
          'Copy Person.prototype, add constructor properties, freeze the object, return it',
          'Run constructor, create object, set properties, return Person.prototype',
        ],
        correctIndex: 1,
        explanation:
          '`new` performs four steps: (1) Creates a new empty object. (2) Sets its [[Prototype]] to `Person.prototype`. (3) Runs the constructor function with `this` pointing to the new object. (4) Returns the new object (unless the constructor explicitly returns a different object). This is the complete `new` binding mechanism.',
      },
    ],
  },

  {
    slug: 'async-await',
    title: 'Async/Await & Promises',
    subtitle: 'Writing asynchronous code that reads like synchronous code',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '10 min',
    intro:
      'Most real applications need to wait for things: API responses, database queries, file reads. JavaScript handles this without blocking the main thread using Promises and async/await. A Promise represents a value that will be available in the future. async/await is syntax built on top of Promises that makes asynchronous code look and behave like sequential synchronous code, while still being fully non-blocking. Mastering these is essential for modern JavaScript development.',
    keyPoints: [
      'A Promise is an object representing a future value: pending, fulfilled, or rejected',
      'async functions always return a Promise, even if you return a plain value',
      'await pauses the async function — not the whole program — until the Promise resolves',
      'Use try/catch with async/await and Promise.all() for parallel execution',
    ],
    sections: [
      {
        title: 'Promises: The Foundation',
        content:
          'A Promise is an object with three possible states: pending (waiting), fulfilled (resolved with a value), or rejected (failed with an error). You chain `.then()` for success and `.catch()` for errors. Once a Promise settles (fulfills or rejects), it never changes state — this immutability makes Promises predictable. You can attach multiple `.then()` handlers to the same Promise and chain them to transform data.',
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
  .catch(err => console.error(err.message))
  .finally(() => console.log('Done!'))  // runs regardless of success/failure`,
      },
      {
        title: 'async/await — Promises with Cleaner Syntax',
        content:
          'async/await does not replace Promises — it wraps them. An `async` function implicitly returns a Promise. `await` can only be used inside an async function (or at the top level in modules). It pauses the function, waits for the Promise to resolve, and gives you the value directly — no .then() chains needed. Use try/catch to handle errors, which works exactly like synchronous error handling.',
        code: `// Same logic as above, but with async/await
async function getUser() {
  try {
    const response = await fetch('https://api.example.com/user/1')

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`)
    }

    const data = await response.json()   // another await — fine!
    console.log(data.name)
    return data   // becomes the resolved value of the returned Promise
  } catch (err) {
    console.error('Failed to fetch:', err.message)
    throw err  // re-throw if you want the caller to handle it too
  }
}

// getUser() returns a Promise — you can still .then() it
getUser().then(user => console.log(user))`,
      },
      {
        title: 'Running Promises in Parallel',
        content:
          'A common mistake is awaiting Promises sequentially when they could run in parallel. Use `Promise.all()` to start multiple Promises simultaneously and wait for all of them. If any rejects, Promise.all() immediately rejects. Use `Promise.allSettled()` when you want all results regardless of failures. `Promise.race()` resolves/rejects with the first to settle. `Promise.any()` resolves with the first to fulfill.',
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
const results = await Promise.allSettled([
  fetch('/api/users'),    // might fail
  fetch('/api/products'), // might succeed
])
results.forEach(result => {
  if (result.status === 'fulfilled') console.log(result.value)
  if (result.status === 'rejected') console.log(result.reason)
})`,
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
      {
        question: 'What is the difference between `Promise.all()` and `Promise.allSettled()`?',
        options: [
          'Promise.all() runs them in sequence; allSettled() runs them in parallel',
          'Promise.all() rejects immediately if any Promise rejects; allSettled() waits for all and returns results for each',
          'Promise.allSettled() only works with fetch()',
          'There is no difference — they are aliases',
        ],
        correctIndex: 1,
        explanation:
          '`Promise.all()` is fail-fast: if any Promise rejects, the whole `Promise.all()` immediately rejects. `Promise.allSettled()` always waits for every Promise to settle (either fulfill or reject) and returns an array of result objects — each with `status: "fulfilled"` or `status: "rejected"`. Use `allSettled` when you need all results regardless of failures.',
      },
      {
        question: 'What does `finally()` do in a Promise chain?',
        options: [
          'It only runs if the Promise is rejected',
          'It only runs if the Promise is fulfilled',
          'It runs regardless of whether the Promise fulfilled or rejected',
          'It cancels the Promise if called after rejection',
        ],
        correctIndex: 2,
        explanation:
          '`.finally()` runs after the Promise settles, regardless of outcome — success or failure. It is useful for cleanup operations that should always happen: hiding a loading spinner, closing a database connection, logging. It does not receive the resolved value or rejection reason; it just runs unconditionally.',
      },
    ],
  },

  {
    slug: 'scope-chain',
    title: 'Scope & the Scope Chain',
    subtitle: 'Understanding where variables live and how JavaScript finds them',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'Scope determines the visibility and lifetime of variables. JavaScript uses lexical scoping — the scope of a variable is determined by where it is written in the source code, not where it is called from. Every function and every block creates a new scope. When you reference a variable, JavaScript searches the current scope, then the outer scope, then its outer scope — this chain of lookups is the scope chain. Getting scope wrong is the source of "variable is not defined" errors, accidental global pollution, and unexpected behavior.',
    keyPoints: [
      'Lexical scope: variable access is determined by code structure, not call location',
      'The scope chain is the series of outer scopes searched when a variable is not found locally',
      'let and const are block-scoped; var is function-scoped (or global)',
      'Variables in inner scopes can "shadow" variables with the same name in outer scopes',
    ],
    sections: [
      {
        title: 'Lexical Scope Explained',
        content:
          'JavaScript uses lexical (static) scope, meaning the scope is determined by where functions and blocks are written in the source code — not by where they are called. An inner function has access to all variables in its containing functions, all the way up to the global scope. This is determined at parse time, before the code even runs. This is why "lexical" — it refers to the written structure (the lexicon).',
        code: `const global = 'I am global'

function outer() {
  const outerVar = 'I am outer'

  function inner() {
    const innerVar = 'I am inner'
    // inner has access to all outer scopes (lexical scope)
    console.log(innerVar)   // own scope
    console.log(outerVar)   // outer function's scope
    console.log(global)     // global scope
  }

  inner()
  // console.log(innerVar)  // ✗ ReferenceError — inner's scope is private
}

outer()
// console.log(outerVar)  // ✗ ReferenceError — outer's scope is private`,
      },
      {
        title: 'The Scope Chain: How Variable Lookup Works',
        content:
          'When JavaScript encounters a variable reference, it starts searching at the current scope. If not found, it moves to the immediately enclosing scope, then that scope\'s enclosing scope, and so on — all the way up to the global scope. This linked series of scopes is the scope chain. If the variable is not found anywhere in the chain, a ReferenceError is thrown. Variable shadowing occurs when a variable in an inner scope has the same name as one in an outer scope — the inner one wins for code inside that scope.',
        code: `let x = 'global'

function middle() {
  let x = 'middle'  // shadows global x

  function inner() {
    // Scope chain lookup: inner → middle → global
    console.log(x)  // 'middle' — finds x in middle's scope first
  }

  inner()
}

middle()
console.log(x)  // 'global' — middle's x did not change the global one

// No shadowing:
function noShadow() {
  console.log(x)  // 'global' — not found in noShadow, searches chain, finds global x
}
noShadow()`,
      },
      {
        title: 'Block Scope: let/const vs var',
        content:
          'Before ES6, JavaScript only had global scope and function scope. `var` is function-scoped — it ignores block boundaries like if statements and for loops. ES6 introduced `let` and `const` with block scope — they are confined to the `{}` block they are declared in. This makes code more predictable and prevents variables from leaking out of loops and conditionals. Always prefer `let` and `const` over `var`.',
        code: `// var leaks out of blocks
if (true) {
  var leaky = 'I escape the block'
  let blocked = 'I stay inside'
}
console.log(leaky)    // 'I escape the block' — var ignores if block
// console.log(blocked) // ReferenceError — let is block-scoped ✓

// var in a loop is famously problematic
for (var i = 0; i < 3; i++) { /* ... */ }
console.log(i)  // 3 — var i survives the loop!

for (let j = 0; j < 3; j++) { /* ... */ }
// console.log(j)  // ReferenceError — let j is block-scoped ✓

// var is function-scoped, not block-scoped:
function example() {
  if (true) {
    var x = 'inside if'
  }
  console.log(x)  // 'inside if' — var ignores the if block
}`,
      },
    ],
    mcq: [
      {
        question: 'What is "lexical scope" in JavaScript?',
        options: [
          'Scope that is determined when the function is called at runtime',
          'Scope that is determined by the physical location of code in the source file',
          'A special scope for let and const only',
          'The global scope accessible from anywhere',
        ],
        correctIndex: 1,
        explanation:
          'Lexical scope means the scope is determined by where code is written (its position in the source), not where it is called from at runtime. A function\'s scope is determined at parse time based on its location in the code. This is why inner functions can access outer variables — the scope relationship is baked into the code structure.',
      },
      {
        question: 'What is "variable shadowing"?',
        options: [
          'Accessing a variable before it is declared',
          'Declaring a variable in an inner scope with the same name as an outer scope variable, hiding the outer one',
          'A var variable being hoisted to the top of its function',
          'A global variable being accessed inside a function',
        ],
        correctIndex: 1,
        explanation:
          'Variable shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope. Inside the inner scope, references to that name resolve to the inner variable, effectively "shadowing" (hiding) the outer one. The outer variable is unchanged — it just cannot be accessed by that name within the shadow.',
      },
      {
        question: 'A `var` variable declared inside an if block is accessible:',
        options: [
          'Only inside the if block',
          'Only inside the function containing the if block (or globally if not in a function)',
          'Only after the if block executes',
          'Nowhere outside the if statement',
        ],
        correctIndex: 1,
        explanation:
          '`var` is function-scoped, not block-scoped. If you declare a `var` inside an `if` block, it is actually hoisted to the containing function (or to global scope if not inside a function). The block boundaries `{}` of if/for/while statements do not create a new scope for `var`. This is a major source of bugs, which is why `let` and `const` were introduced.',
      },
      {
        question: 'What happens when JavaScript looks up a variable and cannot find it anywhere in the scope chain?',
        options: [
          'It returns undefined',
          'It creates the variable in the global scope automatically',
          'It throws a ReferenceError',
          'It returns null',
        ],
        correctIndex: 2,
        explanation:
          'If a variable cannot be found in the current scope, JavaScript searches up the entire scope chain to the global scope. If it is not found anywhere, a ReferenceError is thrown: "X is not defined." (This is different from a variable being `undefined` — that means the variable exists but has no value. A ReferenceError means the variable name was never declared.)',
      },
      {
        question: 'What is the difference between `let` and `var` inside a for loop?',
        options: [
          'let is faster than var inside loops',
          'var creates a new binding per iteration; let creates one binding for the whole loop',
          'let creates a new binding per iteration; var creates one binding shared across all iterations',
          'They are identical inside for loops',
        ],
        correctIndex: 2,
        explanation:
          '`var` in a for loop creates a single function-scoped variable that all iterations share. `let` creates a new block-scoped binding for each iteration — each loop iteration gets its own independent copy of the variable. This is why `for (let i = 0; ...)` with setTimeout prints 0, 1, 2 while `for (var i = 0; ...)` prints 3, 3, 3.',
      },
    ],
  },

  {
    slug: 'this-keyword',
    title: 'The `this` Keyword',
    subtitle: 'Understanding dynamic context binding in JavaScript functions',
    category: 'javascript',
    difficulty: 'advanced',
    readTime: '9 min',
    intro:
      '`this` is one of JavaScript\'s most confusing features because it is dynamic — its value is not determined by where a function is written (lexical scope), but by how and where the function is called. The same function can have a different `this` depending on the call site. There are four binding rules: default, implicit, explicit, and new binding. Arrow functions break the pattern entirely by having no `this` of their own. Understanding these rules eliminates an entire class of bugs.',
    keyPoints: [
      'The value of `this` is determined at call time, not at definition time (for regular functions)',
      'Arrow functions do not have their own `this` — they inherit it from the enclosing lexical scope',
      'call(), apply(), and bind() explicitly set `this` for a function',
      'In strict mode, default `this` is undefined instead of the global object',
    ],
    sections: [
      {
        title: 'The Four Binding Rules',
        content:
          'JavaScript has four rules that determine what `this` is bound to. They are applied in priority order: new binding (highest) > explicit binding (call/apply/bind) > implicit binding (method call) > default binding (lowest). Understanding this priority order lets you predict `this` in any situation by looking at the call site.',
        code: `// 1. DEFAULT BINDING — called as a plain function
function showThis() {
  console.log(this)
}
showThis()  // window (browser) or global (Node) — in strict mode: undefined

// 2. IMPLICIT BINDING — called as a method
const obj = {
  name: 'Sufyan',
  greet() { console.log(this.name) }
}
obj.greet()  // 'Sufyan' — this = obj (the object before the dot)

// 3. EXPLICIT BINDING — call(), apply(), bind()
function greet(greeting) {
  console.log(\`\${greeting}, \${this.name}\`)
}
const person = { name: 'Ahmed' }
greet.call(person, 'Hello')    // 'Hello, Ahmed' — this = person
greet.apply(person, ['Hi'])    // 'Hi, Ahmed'   — same but args as array
const boundGreet = greet.bind(person)  // returns new function with this = person
boundGreet('Hey')              // 'Hey, Ahmed'

// 4. NEW BINDING — called with new
function Person(name) {
  this.name = name   // this = new empty object
}
const p = new Person('Sufyan')  // this inside = the new object`,
      },
      {
        title: 'Arrow Functions Have No `this`',
        content:
          'Arrow functions do not have their own `this`. Instead, they inherit `this` from the enclosing lexical scope — wherever the arrow function was defined. This makes arrow functions perfect for callbacks and class methods where you need `this` to refer to the surrounding context. This is the most practical rule to learn: use arrow functions when you need to preserve `this`.',
        code: `const timer = {
  count: 0,

  // PROBLEM: regular function loses 'this' in callback
  startBroken() {
    setInterval(function() {
      this.count++  // 'this' is window/undefined here, NOT the timer object
      console.log(this.count)  // NaN — window.count is undefined
    }, 1000)
  },

  // FIX: arrow function inherits 'this' from startFixed
  startFixed() {
    setInterval(() => {
      this.count++  // 'this' is the timer object — arrow inherits from startFixed
      console.log(this.count)  // 1, 2, 3...
    }, 1000)
  }
}

// Common class pattern — arrow methods always have correct 'this'
class Button {
  constructor() {
    this.clicks = 0
  }
  // Arrow function as class field — 'this' is always the Button instance
  handleClick = () => {
    this.clicks++
    console.log(this.clicks)
  }
}`,
      },
      {
        title: 'Common `this` Bugs and Fixes',
        content:
          'The most common `this` bug is losing context when passing methods as callbacks. When you write `setTimeout(obj.method, 1000)`, you are passing the function itself — not the binding to `obj`. The function runs with default binding. This exact bug happens when passing React event handlers that reference `this`, passing methods to Array methods, and passing methods to event listeners.',
        code: `const user = {
  name: 'Sufyan',
  greet() { console.log(\`Hello, \${this.name}\`) }
}

// BUG: method is extracted — loses its binding to user
setTimeout(user.greet, 100)          // "Hello, undefined" — this = window

// Fix 1: wrap in arrow function (most common)
setTimeout(() => user.greet(), 100)  // "Hello, Sufyan" ✓

// Fix 2: bind()
setTimeout(user.greet.bind(user), 100)  // "Hello, Sufyan" ✓

// Array callback 'this' issue:
const team = {
  members: ['Alice', 'Bob'],
  prefix: 'Team: ',
  getNames() {
    return this.members.map(function(name) {
      return this.prefix + name  // 'this' is window inside regular callback!
    })
  },
  getNamesFixed() {
    return this.members.map(name => this.prefix + name)  // arrow ✓
  }
}`,
      },
    ],
    mcq: [
      {
        question: 'When is the value of `this` determined for a regular function?',
        options: [
          'When the function is defined (written in the code)',
          'When the function is called (at the call site)',
          'When the script first loads',
          'When the function is assigned to a variable',
        ],
        correctIndex: 1,
        explanation:
          'For regular functions (not arrow functions), `this` is determined dynamically at call time — specifically by how the function is called (the call site). The same function can have different `this` values depending on whether it is called as a plain function, as a method, with call/apply/bind, or with `new`. This is called "dynamic binding."',
      },
      {
        question: 'What is the value of `this` inside an arrow function?',
        options: [
          'The global object (window)',
          'undefined always',
          'The `this` of the surrounding lexical scope where the arrow function was defined',
          'The object that calls the arrow function',
        ],
        correctIndex: 2,
        explanation:
          'Arrow functions do not have their own `this` binding. They inherit `this` from the enclosing lexical scope — the surrounding function or class where the arrow was defined. This makes them ideal for callbacks where you need to preserve the outer `this`, like in setTimeout, array methods, and event listeners.',
      },
      {
        question: 'What is the difference between `call()` and `apply()`?',
        options: [
          'call() sets this permanently; apply() only for one call',
          'call() takes arguments individually; apply() takes arguments as an array',
          'call() returns a new function; apply() calls the function immediately',
          'There is no difference — they are identical',
        ],
        correctIndex: 1,
        explanation:
          'Both `call()` and `apply()` invoke a function immediately with a specified `this` value. The difference is how additional arguments are passed: `fn.call(obj, arg1, arg2)` takes arguments individually (comma-separated). `fn.apply(obj, [arg1, arg2])` takes arguments as an array. A mnemonic: **A**pply = **A**rray.',
      },
      {
        question: 'You extract a method from an object: `const fn = obj.method`. When you call `fn()`, what is `this`?',
        options: [
          'obj — the original owner of the method',
          'undefined (in strict mode) or the global object (in non-strict mode)',
          'null',
          'A new empty object',
        ],
        correctIndex: 1,
        explanation:
          'Extracting a method and calling it as a plain function loses the implicit binding to `obj`. There is no object before the dot, so default binding applies — `this` becomes the global object (window in browsers, global in Node) in non-strict mode, or `undefined` in strict mode. To preserve the binding, use `.bind(obj)` or wrap in an arrow function.',
      },
      {
        question: 'What does `bind()` return?',
        options: [
          'The result of calling the function with the given this',
          'A new function permanently bound to the specified this, that can be called later',
          'The original function with this temporarily set',
          'A Promise that resolves to the function result',
        ],
        correctIndex: 1,
        explanation:
          '`bind()` returns a new function with `this` permanently set to the first argument. Unlike `call()` and `apply()`, which invoke the function immediately, `bind()` creates a bound function that you can call later. The binding cannot be overridden — even `call()` or `apply()` on a bound function will not change its `this`.',
      },
    ],
  },

  {
    slug: 'destructuring-spread-rest',
    title: 'Destructuring, Spread & Rest',
    subtitle: 'Extracting, cloning, and combining data with modern ES6+ syntax',
    category: 'javascript',
    difficulty: 'beginner',
    readTime: '8 min',
    intro:
      'ES6 introduced powerful syntax for working with arrays and objects. Destructuring lets you unpack values from arrays and objects into individual variables in a single line. The spread operator (...) expands an iterable into individual elements. The rest operator (...) collects multiple elements into an array. These features are everywhere in modern JavaScript — they are the backbone of React component props, function parameters, array manipulation, and state management patterns.',
    keyPoints: [
      'Destructuring unpacks values from arrays/objects into named variables',
      'Default values in destructuring prevent undefined when a property is missing',
      'Spread (...) expands an array or object — use it for cloning and merging',
      'Rest (...) collects remaining values — use it in function parameters to accept any number of arguments',
    ],
    sections: [
      {
        title: 'Array and Object Destructuring',
        content:
          'Array destructuring extracts values by position. Object destructuring extracts values by property name. Both support default values (for when the value is undefined) and renaming (to change the variable name). Nested destructuring lets you unpack deeply nested structures in a single expression.',
        code: `// ARRAY DESTRUCTURING — position-based
const [first, second, ...rest] = [10, 20, 30, 40, 50]
console.log(first)   // 10
console.log(second)  // 20
console.log(rest)    // [30, 40, 50]

// Skip elements with commas
const [,, third] = [1, 2, 3]
console.log(third)   // 3

// OBJECT DESTRUCTURING — name-based
const { name, age, city = 'Lahore' } = { name: 'Sufyan', age: 18 }
console.log(name)    // 'Sufyan'
console.log(age)     // 18
console.log(city)    // 'Lahore' (default — city was undefined)

// Rename while destructuring
const { name: userName, age: userAge } = { name: 'Ahmed', age: 22 }
console.log(userName)  // 'Ahmed'

// Nested destructuring
const { address: { street, zip } } = { address: { street: 'Main St', zip: '12345' } }
console.log(street)  // 'Main St'`,
      },
      {
        title: 'Spread Operator: Expanding & Cloning',
        content:
          'The spread operator (...) expands an iterable (array, string, Set) into individual elements, or expands an object\'s properties. It creates shallow copies — nested objects are still referenced, not deeply cloned. Spread is the standard way to clone arrays and objects in React to avoid direct mutation of state.',
        code: `// Spread with arrays
const a = [1, 2, 3]
const b = [4, 5, 6]
const merged = [...a, ...b]     // [1, 2, 3, 4, 5, 6]
const cloned = [...a]            // [1, 2, 3] — new array, not same reference
const withExtra = [...a, 99]    // [1, 2, 3, 99]

// Spread with objects
const user = { name: 'Sufyan', age: 18 }
const updated = { ...user, age: 19 }     // { name: 'Sufyan', age: 19 }
const extended = { ...user, role: 'admin' }  // { name: 'Sufyan', age: 18, role: 'admin' }

// Later spread properties win (important for React state updates)
const overwrite = { ...user, name: 'Ahmed', age: 25 }
// { name: 'Ahmed', age: 25 } — last one wins for duplicate keys

// Spread in function calls
function sum(a, b, c) { return a + b + c }
const nums = [1, 2, 3]
console.log(sum(...nums))  // 6 — same as sum(1, 2, 3)`,
      },
      {
        title: 'Rest Parameters: Collecting Arguments',
        content:
          'The rest operator (...) in a function parameter collects all remaining arguments into an array. It must be the last parameter. Rest replaces the older `arguments` object and works with arrow functions (which do not have their own `arguments`). In destructuring, rest collects the remaining items not explicitly destructured.',
        code: `// Rest in function parameters
function sum(...numbers) {  // collects all arguments into 'numbers' array
  return numbers.reduce((total, n) => total + n, 0)
}
console.log(sum(1, 2, 3, 4, 5))  // 15
console.log(sum(10, 20))          // 30

// Rest with other named params (rest must be LAST)
function log(level, ...messages) {
  console.log(\`[\${level}]\`, messages.join(', '))
}
log('INFO', 'Server started', 'Port 3000')
// [INFO] Server started, Port 3000

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5]
console.log(head)  // 1
console.log(tail)  // [2, 3, 4, 5]

const { name, ...rest } = { name: 'Sufyan', age: 18, role: 'admin' }
console.log(name)  // 'Sufyan'
console.log(rest)  // { age: 18, role: 'admin' }`,
      },
    ],
    mcq: [
      {
        question: 'What does `const { name = "Guest" } = {}` produce?',
        options: [
          'An error — name is undefined in the object',
          'name = undefined',
          'name = "Guest" — the default value is used when the property is undefined',
          'name = null',
        ],
        correctIndex: 2,
        explanation:
          'Destructuring default values kick in when the property is `undefined` (not just when the key is missing — also when the value is explicitly `undefined`). Here, `name` does not exist in `{}` so it is `undefined`, and the default `"Guest"` is used. If the value is `null`, the default is NOT used — `null` is a valid value.',
      },
      {
        question: 'What does the spread operator create when used on an object?',
        options: [
          'A deep clone — all nested objects are fully copied',
          'A shallow clone — top-level properties are copied, but nested objects still reference the originals',
          'A reference to the same object',
          'An array of the object\'s values',
        ],
        correctIndex: 1,
        explanation:
          'Spread creates a shallow copy. Top-level properties are copied by value (for primitives) or by reference (for objects/arrays). Nested objects are NOT deeply cloned — they still point to the same underlying objects. For deep cloning, use `structuredClone()` or a library like lodash\'s `cloneDeep`.',
      },
      {
        question: 'Where must the rest parameter appear in a function signature?',
        options: [
          'First',
          'Anywhere',
          'Last — it must be the final parameter',
          'Only in arrow functions',
        ],
        correctIndex: 2,
        explanation:
          'The rest parameter must always be the last parameter. `function fn(a, b, ...rest)` is valid. `function fn(...rest, a)` is a SyntaxError. This makes sense because rest collects "everything remaining" — having parameters after it would be ambiguous.',
      },
      {
        question: 'What is the result of `const merged = { ...obj1, ...obj2 }` when both objects have a key `name`?',
        options: [
          'An error is thrown for duplicate keys',
          'The value from obj1 wins',
          'The value from obj2 wins — later spread properties override earlier ones',
          'Both values are kept in an array',
        ],
        correctIndex: 2,
        explanation:
          'When spreading objects with duplicate keys, the last one wins. `{ ...obj1, ...obj2 }` processes obj1 properties first, then obj2 — obj2\'s `name` overwrites obj1\'s. This is intentional and useful: `{ ...defaultSettings, ...userSettings }` lets user settings override defaults.',
      },
      {
        question: 'In React, why is spread used for state updates: `setState({ ...state, count: 5 })`?',
        options: [
          'For performance — spread is faster than direct assignment',
          'To preserve all existing state properties while updating only one, since React replaces state entirely',
          'Because React does not support direct object mutation in any case',
          'To convert the state to an array',
        ],
        correctIndex: 1,
        explanation:
          '`useState` replaces the entire state with the new value you pass to the setter — it does not merge like class component `this.setState()`. So if your state is `{ name: "Sufyan", count: 0 }` and you call `setUser({ count: 5 })`, you lose `name`. Using `{ ...state, count: 5 }` copies all existing properties first, then overrides just `count`.',
      },
    ],
  },

  {
    slug: 'array-methods',
    title: 'Array Higher-Order Functions',
    subtitle: 'map, filter, reduce, and the functional programming model of arrays',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '9 min',
    intro:
      'JavaScript arrays have powerful built-in methods that take functions as arguments — these are higher-order functions. Instead of writing imperative loops with manual index management, these methods express what you want to do with data. `map` transforms every item. `filter` keeps only matching items. `reduce` combines all items into one value. `find`, `some`, `every`, and `includes` answer questions about the data. Mastering these is essential because they are the foundation of all React list rendering and data transformation.',
    keyPoints: [
      'map() creates a new array by transforming every element — original is not modified',
      'filter() creates a new array with only elements that pass a test function',
      'reduce() accumulates all elements into a single value using a callback',
      'find/some/every answer questions about array contents without creating new arrays',
    ],
    sections: [
      {
        title: 'map, filter, reduce',
        content:
          'These three methods cover the vast majority of array transformation needs. `map` applies a function to every element and returns a new array of results. `filter` applies a predicate function and keeps elements where it returns true. `reduce` applies a callback with an accumulator — it is the most powerful and the most general, since map and filter can be implemented with reduce. All three return new arrays without modifying the original.',
        code: `const products = [
  { name: 'Laptop', price: 1200, inStock: true },
  { name: 'Phone', price: 800, inStock: false },
  { name: 'Tablet', price: 500, inStock: true },
]

// MAP — transform every element
const names = products.map(p => p.name)
// ['Laptop', 'Phone', 'Tablet']

const withTax = products.map(p => ({ ...p, price: p.price * 1.1 }))
// Each product with price increased by 10%

// FILTER — keep elements matching condition
const available = products.filter(p => p.inStock)
// [{ name: 'Laptop', ... }, { name: 'Tablet', ... }]

const affordable = products.filter(p => p.price < 1000)
// [{ name: 'Phone', ... }, { name: 'Tablet', ... }]

// REDUCE — accumulate to a single value
const totalValue = products.reduce((sum, p) => sum + p.price, 0)
// 2500

// Reduce to build an object (group by stock status)
const grouped = products.reduce((acc, p) => {
  const key = p.inStock ? 'available' : 'outOfStock'
  acc[key] = [...(acc[key] || []), p]
  return acc
}, {})`,
      },
      {
        title: 'find, findIndex, some, every, includes',
        content:
          'These methods answer questions about array contents efficiently. `find()` returns the first matching element (or undefined). `findIndex()` returns its index (or -1). `some()` returns true if at least one element matches. `every()` returns true if all elements match. `includes()` checks if a value exists. They all short-circuit — they stop as soon as the answer is known, making them faster than mapping the whole array.',
        code: `const users = [
  { id: 1, name: 'Sufyan', role: 'admin' },
  { id: 2, name: 'Ahmed', role: 'user' },
  { id: 3, name: 'Sara', role: 'user' },
]

// find — returns first match or undefined
const admin = users.find(u => u.role === 'admin')
// { id: 1, name: 'Sufyan', role: 'admin' }

const notFound = users.find(u => u.name === 'Ghost')
// undefined

// findIndex — returns index or -1
const ahmedIndex = users.findIndex(u => u.name === 'Ahmed')
// 1

// some — true if at least one matches
const hasAdmin = users.some(u => u.role === 'admin')    // true
const hasMod = users.some(u => u.role === 'moderator')  // false

// every — true if ALL match
const allHaveId = users.every(u => u.id !== undefined)  // true
const allAdmins = users.every(u => u.role === 'admin')  // false

// includes — for primitive arrays
const nums = [1, 2, 3, 4, 5]
console.log(nums.includes(3))  // true
console.log(nums.includes(9))  // false`,
      },
      {
        title: 'Chaining and Functional Patterns',
        content:
          'Because map, filter, and reduce all return new arrays, you can chain them. Method chaining creates a readable data pipeline — each step transforms the array and passes it to the next. In React, chaining is how you render filtered, sorted, transformed lists from component state. The key is to chain in order: filter first (reduce the data), then map (transform it), since filtering a smaller array is faster.',
        code: `const orders = [
  { id: 1, amount: 150, status: 'completed', userId: 1 },
  { id: 2, amount: 50, status: 'pending',   userId: 2 },
  { id: 3, amount: 300, status: 'completed', userId: 1 },
  { id: 4, amount: 200, status: 'cancelled', userId: 3 },
]

// Chained pipeline: filter → map → reduce
const userTotal = orders
  .filter(o => o.userId === 1 && o.status === 'completed')  // [order 1, order 3]
  .map(o => o.amount)                                         // [150, 300]
  .reduce((sum, amt) => sum + amt, 0)                         // 450

console.log(userTotal)  // 450

// React list rendering pattern
function OrderList({ orders }) {
  return (
    <ul>
      {orders
        .filter(o => o.status !== 'cancelled')
        .sort((a, b) => b.amount - a.amount)  // sort by amount descending
        .map(o => (
          <li key={o.id}>{o.id}: \${o.amount}</li>
        ))
      }
    </ul>
  )
}

// flatMap — map then flatten (useful for one-to-many)
const sentences = ['hello world', 'foo bar']
const words = sentences.flatMap(s => s.split(' '))
// ['hello', 'world', 'foo', 'bar']`,
      },
    ],
    mcq: [
      {
        question: 'What does `[1, 2, 3].map(x => x * 2)` return?',
        options: [
          'It mutates the original array to [2, 4, 6]',
          'A new array [2, 4, 6] — the original is unchanged',
          '[1, 2, 3] — map does not change values',
          'undefined',
        ],
        correctIndex: 1,
        explanation:
          '`map()` always returns a new array with the transformed values. It never modifies the original array. The callback is applied to each element, and the results form the new array. Immutability is a core principle of functional array methods.',
      },
      {
        question: 'What does the initial value argument in `reduce(callback, initialValue)` do?',
        options: [
          'It sets the initial value of the current element',
          'It becomes the starting value of the accumulator before the first iteration',
          'It is the default return value if the array is empty (but otherwise unused)',
          'It limits how many times the callback runs',
        ],
        correctIndex: 1,
        explanation:
          'The initial value becomes the accumulator\'s value before the first element is processed. Without it, the first element becomes the initial accumulator and iteration starts from the second element. Always provide an initial value — without it, calling `reduce` on an empty array throws a TypeError, and the behavior without it can be surprising.',
      },
      {
        question: 'You have `const result = users.find(u => u.id === 5)`. The user with id 5 does not exist. What is `result`?',
        options: ['null', 'undefined', '-1', 'An empty array []'],
        correctIndex: 1,
        explanation:
          '`find()` returns `undefined` when no element matches the predicate. It returns `-1` is `findIndex()`, not `find()`. It returns `null` for nothing. Always check the result before using it: `if (result) { ... }` or `result?.name`.',
      },
      {
        question: 'What is the difference between `some()` and `every()`?',
        options: [
          'some() checks the first element; every() checks the last element',
          'some() returns true if at least ONE element matches; every() returns true only if ALL elements match',
          'some() creates a new array; every() returns a boolean',
          'every() stops at the first match; some() checks all elements',
        ],
        correctIndex: 1,
        explanation:
          '`some()` returns true as soon as one element passes the test (short-circuits on the first match). `every()` returns true only if every element passes — it short-circuits on the first failure. Use `some()` to check "does any X exist?" and `every()` to check "are all X valid?"',
      },
      {
        question: 'Why should you filter before mapping in a chain?',
        options: [
          'filter() only works on the original array, not a mapped array',
          'map() changes the data structure, making filter() unreliable afterward',
          'Filtering first reduces the array size before the more expensive map transformation',
          'JavaScript requires filter to come before map in a chain',
        ],
        correctIndex: 2,
        explanation:
          'Performance optimization: `filter` first reduces the number of elements, so the subsequent `map` runs on a smaller array. If you map first, you run the transformation on ALL elements (even ones you will later discard). The result is the same either way, but filter → map is more efficient when filtering removes a significant portion of the data.',
      },
    ],
  },

  {
    slug: 'error-handling',
    title: 'Error Handling',
    subtitle: 'Writing resilient JavaScript that handles failures gracefully',
    category: 'javascript',
    difficulty: 'intermediate',
    readTime: '8 min',
    intro:
      'Every real application encounters errors: network failures, invalid input, unexpected data formats, programming mistakes. JavaScript provides structured error handling with try/catch/finally, a hierarchy of built-in Error types, and patterns for handling errors in both synchronous and asynchronous code. Writing good error handling separates production-ready code from code that crashes silently or shows users cryptic error messages.',
    keyPoints: [
      'try/catch intercepts runtime errors; finally always runs regardless of outcome',
      'JavaScript has built-in Error types: TypeError, ReferenceError, SyntaxError, RangeError',
      'You can throw any value, but always throw Error objects (with stack traces)',
      'In async/await, try/catch handles both synchronous and asynchronous errors',
    ],
    sections: [
      {
        title: 'try / catch / finally',
        content:
          'The `try` block contains code that might throw. If an error occurs, execution jumps to the `catch` block, which receives the error object. The `finally` block always runs — whether the code succeeded, threw, or even had a `return` statement. Use finally for cleanup that must happen no matter what: closing connections, hiding loading states, releasing resources.',
        code: `function parseJSON(str) {
  try {
    const data = JSON.parse(str)  // might throw SyntaxError
    return data
  } catch (error) {
    // error.name — the type ('SyntaxError')
    // error.message — description of what went wrong
    // error.stack — full stack trace (for debugging)
    console.error(\`Failed to parse: \${error.message}\`)
    return null  // graceful fallback
  } finally {
    console.log('Parsing attempt finished')  // ALWAYS runs
  }
}

parseJSON('{"name":"Sufyan"}')  // returns object, logs "Parsing attempt finished"
parseJSON('not valid json')     // catches SyntaxError, logs both messages

// You can re-throw if you can't handle the error:
function strictParse(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(\`Invalid config: \${error.message}\`)  // wrap with context
    }
    throw error  // re-throw unexpected errors
  }
}`,
      },
      {
        title: 'Error Types and Custom Errors',
        content:
          'JavaScript has built-in error types for different situations: TypeError (wrong type), ReferenceError (undefined variable), SyntaxError (invalid syntax, usually parse-time), RangeError (value out of valid range), URIError, EvalError. You can create custom error classes by extending Error, which lets you add specific properties and makes errors easier to identify with `instanceof`.',
        code: `// Built-in error types
try {
  null.property           // TypeError: Cannot read properties of null
} catch(e) { console.log(e instanceof TypeError) }  // true

try {
  undeclaredVar           // ReferenceError: undeclaredVar is not defined
} catch(e) { console.log(e instanceof ReferenceError) }  // true

try {
  new Array(-1)           // RangeError: Invalid array length
} catch(e) { console.log(e instanceof RangeError) }  // true

// Custom errors — extend Error for domain-specific errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message)           // calls Error constructor
    this.name = 'ValidationError'
    this.field = field       // extra context
  }
}

class NetworkError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'NetworkError'
    this.status = status
  }
}

// Now you can check error types precisely:
try {
  throw new ValidationError('email', 'Invalid email format')
} catch(e) {
  if (e instanceof ValidationError) {
    console.log(\`Field \${e.field} failed: \${e.message}\`)
  }
}`,
      },
      {
        title: 'Async Error Handling',
        content:
          'Handling errors in async code requires care. With Promises, unhandled rejections used to fail silently — modern Node.js and browsers now crash/warn on them. Always add `.catch()` to Promise chains. With async/await, wrap `await` calls in try/catch — it handles both sync throws and async rejections uniformly. For parallel Promises, a single rejection in `Promise.all()` rejects the whole thing.',
        code: `// async/await error handling — most readable
async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`)

    if (!res.ok) {
      throw new NetworkError(res.status, \`User \${id} not found\`)
    }

    return await res.json()
  } catch (error) {
    if (error instanceof NetworkError && error.status === 404) {
      return null  // handle 404 specifically
    }
    throw error  // re-throw other errors to the caller
  }
}

// Handling parallel Promise.all errors
async function loadDashboard() {
  try {
    const [user, posts] = await Promise.all([
      fetchUser(1),
      fetch('/api/posts').then(r => r.json())
    ])
    return { user, posts }
  } catch (error) {
    console.error('Dashboard load failed:', error)
    return { user: null, posts: [] }  // safe fallback
  }
}

// .catch() on Promise chains (equivalent to try/catch)
fetch('/api/data')
  .then(res => res.json())
  .then(data => processData(data))
  .catch(err => console.error('Failed:', err))`,
      },
    ],
    mcq: [
      {
        question: 'When does the `finally` block run?',
        options: [
          'Only if no error was thrown',
          'Only if an error was thrown',
          'Always — whether the try block succeeded, threw, or returned',
          'Only once per program execution',
        ],
        correctIndex: 2,
        explanation:
          '`finally` always executes — after the try block succeeds, after catch handles an error, or even after a `return` statement in the try or catch block. This guarantees cleanup code (closing connections, resetting state, hiding spinners) will always run regardless of what happened.',
      },
      {
        question: 'What is the difference between `throw new Error("msg")` and `throw "msg"`?',
        options: [
          'They are identical — throw works the same way for any value',
          'throw "msg" is a SyntaxError',
          'throw new Error() creates an Error object with a stack trace; throw "msg" is just a string with no stack',
          'throw new Error() must be caught with try/catch; throw "msg" can be ignored',
        ],
        correctIndex: 2,
        explanation:
          'You can throw any value in JavaScript, but you should always throw Error objects (or subclasses). Error objects include a `.stack` trace showing where the error originated, which is invaluable for debugging. Throwing a plain string gives you no stack trace and makes type-checking with `instanceof` impossible.',
      },
      {
        question: 'In an async/await function, does try/catch handle both synchronous throws and Promise rejections?',
        options: [
          'No — try/catch only handles synchronous errors; you need .catch() for async errors',
          'Yes — await converts a rejected Promise into a thrown error, making try/catch work for both',
          'No — you need a separate catch block for each await',
          'Only if you use async/await inside a class',
        ],
        correctIndex: 1,
        explanation:
          '`await` converts a rejected Promise into a thrown exception. This means a single try/catch block around multiple `await` expressions handles all errors — both synchronous throws and asynchronous rejections — uniformly. This is one of the main benefits of async/await over raw Promise chains.',
      },
      {
        question: 'What is the benefit of creating a custom error class like `class ValidationError extends Error`?',
        options: [
          'Custom errors run faster than built-in Error objects',
          'You can check `instanceof ValidationError` in catch blocks and add domain-specific properties like field names',
          'Custom errors automatically show UI messages to users',
          'Custom errors prevent the program from crashing',
        ],
        correctIndex: 1,
        explanation:
          'Custom error classes let you add domain-specific context (e.g., which form field failed, which HTTP status code) and identify error types precisely with `instanceof`. Instead of checking `error.message.includes("validation")`, you can write `if (error instanceof ValidationError)` which is reliable and readable.',
      },
      {
        question: 'You have `Promise.all([fetchA(), fetchB()])` and fetchB() rejects. What happens?',
        options: [
          'Only fetchB\'s result is omitted; fetchA\'s result is still returned',
          'The whole Promise.all() immediately rejects with fetchB\'s error',
          'Both promises are retried automatically',
          'An array with one result and one error object is returned',
        ],
        correctIndex: 1,
        explanation:
          '`Promise.all()` is fail-fast: if any Promise in the array rejects, the whole `Promise.all()` immediately rejects with that error — even if other Promises were still pending or have already resolved. To get all results regardless of failures, use `Promise.allSettled()` instead.',
      },
    ],
  },
]
