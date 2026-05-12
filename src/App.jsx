import { useState } from 'react'
import DrumMachine from './DrumMachine.jsx'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DrumMachine/>
    </>
  )
}

export default App
