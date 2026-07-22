import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MediaLibrary from './components/MediaLibrary';
import SongsSection from './components/SongsSection';
import VideosSection from './components/VideosSection';
import UserProfile from './components/UserProfile';
import AddMediaModal from './components/AddMediaModal';
import PlayerModal from './components/PlayerModal';

import { 
  fetchAllMedia, 
  fetchCategories, 
  fetchSongs, 
  fetchVideos, 
  fetchArtists, 
  getProfile,
  getToken 
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // App Data State
  const [user, setUser] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync Dark/Light theme class on <html> element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Load User Profile if JWT Token exists
  const loadProfile = async () => {
    const token = getToken();
    if (token) {
      const res = await getProfile();
      if (res.ok) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Load Backend Data
  const loadData = async () => {
    await loadProfile();

    const [mediaRes, catRes, songsRes, videosRes, artistsRes] = await Promise.all([
      fetchAllMedia(),
      fetchCategories(),
      fetchSongs(),
      fetchVideos(),
      fetchArtists(),
    ]);

    if (mediaRes.ok && mediaRes.data.data) setMediaItems(mediaRes.data.data);
    if (catRes.ok && catRes.data.data) setCategories(catRes.data.data);
    if (songsRes.ok && songsRes.data.data) setSongs(songsRes.data.data);
    if (videosRes.ok && videosRes.data.data) setVideos(videosRes.data.data);
    if (artistsRes.ok && artistsRes.data.data) setArtists(artistsRes.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      {/* Sidebar Navigation Menu */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDark={isDark}
          setIsDark={setIsDark}
          user={user}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard 
              mediaItems={mediaItems} 
              categories={categories} 
              setActiveTab={setActiveTab}
              onSelectMedia={setSelectedMedia}
            />
          )}

          {activeTab === 'media' && (
            <MediaLibrary 
              mediaItems={mediaItems} 
              categories={categories} 
              searchQuery={searchQuery}
              onSelectMedia={setSelectedMedia}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              token={getToken()}
            />
          )}

          {activeTab === 'songs' && (
            <SongsSection 
              songs={songs} 
              artists={artists} 
              onSelectMedia={setSelectedMedia}
            />
          )}

          {activeTab === 'videos' && (
            <VideosSection 
              videos={videos} 
              onSelectMedia={setSelectedMedia}
            />
          )}

          {activeTab === 'categories' && (
            <MediaLibrary 
              mediaItems={mediaItems} 
              categories={categories} 
              searchQuery={searchQuery}
              onSelectMedia={setSelectedMedia}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              token={getToken()}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfile 
              user={user} 
              setUser={setUser} 
              onAuthSuccess={loadData}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <AddMediaModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={loadData}
      />

      <PlayerModal 
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  );
}
