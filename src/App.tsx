import { MainLayout } from "@/components/layout/MainLayout";
import { DiggingView } from "@/views/DiggingView";
import { LikedView } from "@/views/LikedView";
import { ScrapingView } from "@/views/ScrapingView";
import { FocusView } from "@/views/FocusView";
import { SettingsView } from "@/views/SettingsView";
import { CollectionView } from "@/views/CollectionView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/context/PlayerContext";
import { DataProvider } from "@/context/DataContext";
import { YoutubePlayer } from "@/components/player/YoutubePlayer";
import { Toaster } from "@/components/ui/sonner";

console.log('📱 App.tsx is loading...');

function App() {
  console.log('🎨 App component rendering...');
  
  return (
    <DataProvider>
        <PlayerProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
                <YoutubePlayer />
                <Toaster />
            </MainLayout>
            </Router>
        </PlayerProvider>
    </DataProvider>
  );
}

export default App;
