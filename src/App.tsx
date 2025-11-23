import { MainLayout } from "@/components/layout/MainLayout";
import { DiggingView } from "@/views/DiggingView";
import { LikedView } from "@/views/LikedView";
import { ScrapingView } from "@/views/ScrapingView";
import { FocusView } from "@/views/FocusView";
import { SettingsView } from "@/views/SettingsView";
import { CollectionView } from "@/views/CollectionView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

console.log('📱 App.tsx is loading...');

function App() {
  console.log('🎨 App component rendering...');
  
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DiggingView />} />
          <Route path="/liked" element={<LikedView />} />
          <Route path="/scraping" element={<ScrapingView />} />
          <Route path="/now-playing" element={<FocusView />} />
          <Route path="/now-playing/:id" element={<FocusView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/collections" element={<CollectionView />} />
          <Route path="/collection/:id" element={<DiggingView />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
