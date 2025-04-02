import { createSignal } from 'solid-js'
import './App.css'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div class='background'></div>
    </>
  )
}

export default App
