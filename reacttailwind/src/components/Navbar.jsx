import React from 'react';
import { Search, Sun, Moon, Menu, User, ShieldCheck, Lock } from 'lucide-react';
import { getBaseUrl, setBaseUrl } from '../services/api';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  isDark, 
  setIsDark, 
  user, 
  onToggleMobileSidebar,
  setActiveTab 
}) {
  const currentBaseUrl = getBaseUrl();

  const handleBaseUrlChange = (e) => {
    setBaseUrl(e.target.value);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button 
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search media, songs, videos, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/60 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Controls & User Profile Badge */}
      <div className="flex items-center gap-3">
        {/* Backend API Host Selector */}
        <div className="hidden md:flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700/60 text-xs">
          <span className="text-gray-400 font-medium">Host:</span>
          <select 
            value={currentBaseUrl} 
            onChange={handleBaseUrlChange}
            className="bg-transparent text-gray-800 dark:text-gray-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="https://fastapi-media-service-production.up.railway.app" className="dark:bg-slate-900">
              Railway Live
            </option>
            <option value="http://localhost:8000" className="dark:bg-slate-900">
              Localhost:8000
            </option>
          </select>
        </div>

        {/* Dark / Light Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-600" />}
        </button>

        {/* User Profile Button */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/60 hover:border-purple-500/50 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {user ? user.username.charAt(0).toUpperCase() : <User size={16} />}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
              <span>{user ? user.username : 'Guest Mode'}</span>
              {user ? <ShieldCheck size={13} className="text-green-500" /> : <Lock size={12} className="text-yellow-500" />}
            </div>
            <p className="text-gray-400 font-medium">
              {user ? 'JWT Authenticated' : 'Click to Log In'}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
