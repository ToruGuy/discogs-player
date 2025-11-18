# ExampleAppByToruGuy - Setup Guide

**Target Stack:** Tauri v2 + Vite 5 + React 18 + TypeScript + Shadcn UI + Tailwind CSS v3

## 1. Prerequisites
- Node.js v20.11.0 (Compatible with Vite 5)
- pnpm
- Rust (stable)
- Cargo

## 2. Initialization

### Frontend (Vite)
Initialize a new Vite project using React + TypeScript template.

```bash
pnpm create vite . --template react-ts
```

### Backend (Tauri)
Initialize Tauri within the project.

```bash
pnpm add -D @tauri-apps/cli@latest
pnpm tauri init --ci \
  --app-name "ExampleAppByToruGuy" \
  --window-title "Example App" \
  --frontend-dist ../dist \
  --dev-url http://localhost:5173 \
  --before-dev-command "pnpm dev" \
  --before-build-command "pnpm build"
```

## 3. Configuration

### `package.json`
Ensure dependencies align with Node v20 compatibility (Vite 5, React 18).

```json
{
  "name": "ExampleAppByToruGuy",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "tauri": "tauri"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@tauri-apps/api": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.441.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0",
    "@types/node": "^22.5.4",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.1",
    "postcss": "^8.4.45",
    "react-router-dom": "^6.26.1",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.3",
    "vite": "^5.4.3"
  }
}
```

### `src-tauri/Cargo.toml`
Ensure `tauri-plugin-log` uses a specific version if compilation fails on version parsing.

```toml
[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-log = "2.0.0" # Explicit version
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

## 4. Shadcn UI & Tailwind Setup

### Install Tailwind CSS (v3)
```bash
pnpm add -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

### Configure `tsconfig.json` & `tsconfig.app.json`
Add path alias for `@`.

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`vite.config.ts`**:
```typescript
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Initialize Shadcn
```bash
pnpm dlx shadcn@latest init
```
- Style: **New York**
- Base Color: **Zinc**
- CSS Variables: **Yes**

## 5. Example Usage
Add a Shadcn component and update `App.tsx` to verify setup.

```bash
pnpm dlx shadcn@latest add button --yes
```

**`src/App.tsx`**:
```tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">ExampleApp By ToruGuy</h1>
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
```

## 6. Run
Clean install and start dev server.

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm tauri dev
```
