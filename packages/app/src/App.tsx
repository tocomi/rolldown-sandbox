import { useState } from 'react'
import { Button } from './components/button.jsx'
import { hello } from './module/hello.js'

hello()

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  )
}

export default App
