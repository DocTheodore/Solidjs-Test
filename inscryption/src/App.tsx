import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import './App.css'
import { DragAndDropExample } from './drag-drop'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <DragAndDropExample/>
      <DragAndDropExample/>
      <DragAndDropExample/>
      <DragAndDropExample/>
    </>
  )
}

export default App
