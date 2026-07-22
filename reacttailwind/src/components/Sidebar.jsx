import React from 'react';
import { LayoutDashboard, Film, Music, Layers, User, PlusCircle, Server, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, onOpenAddModal }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'media', label: 'Media Library', icon: Film, badge: '830+' },
    { id: 'songs', label: 'Songs & Music', icon: Music, badge: '500+' },
    { id: 'videos', label: 'Videos Gallery', icon: Film, badge: '330+' },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'profile', label: 'User Profile & Auth', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 glass-sidebar z-50 transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-bold text-lg">
              FA
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">MediaBackend</h2>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">FastAPI + Supabase</p>
            </div>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4">
          <button
            onClick={onOpenAddModal}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
          >
            <PlusCircle size={18} />
            <span>Add New Media</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
            <Server size={14} className="text-green-500" />
            <span className="truncate">Railway + Supabase PostgreSQL</span>
          </div>
        </div>
      </aside>
    </>
  );
}
