import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🚀 Main.tsx is loading...');

const root = document.getElementById('root');
if (!root) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, rendering App...');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('✅ Render complete!');
