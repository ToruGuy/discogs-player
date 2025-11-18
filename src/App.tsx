import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Discogs Player</h1>
      <p className="text-muted-foreground">Tauri + Vite + React + Shadcn UI</p>
      
      <div className="flex gap-4">
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
        <Button variant="outline">
          Secondary Action
        </Button>
      </div>
    </div>
  )
}

export default App
