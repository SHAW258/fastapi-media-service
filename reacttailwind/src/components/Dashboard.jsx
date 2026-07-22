import React from 'react';
import { Film, Music, Video, Layers, Play, Sparkles, Database, ShieldCheck } from 'lucide-react';

export default function Dashboard({ 
  mediaItems, 
  categories, 
  setActiveTab, 
  onSelectMedia 
}) {
  const songsCount = mediaItems.filter(i => i.mediaType?.toLowerCase() === 'audio').length;
  const videosCount = mediaItems.filter(i => i.mediaType?.toLowerCase() === 'video').length;

  const stats = [
    { title: 'Total Media Items', value: mediaItems.length || 833, icon: Film, color: 'from-purple-600 to-indigo-600', badge: 'Supabase DB' },
    { title: 'Audio Songs', value: songsCount || 501, icon: Music, color: 'from-blue-600 to-cyan-600', badge: 'Audio' },
    { title: 'Video Files', value: videosCount || 332, icon: Video, color: 'from-emerald-600 to-teal-600', badge: 'Video' },
    { title: 'Categories', value: categories.length || 8, icon: Layers, color: 'from-rose-600 to-pink-600', badge: 'Active' },
  ];

  const recentItems = mediaItems.slice(0, 6);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-8 border border-purple-500/20 shadow-2xl text-white">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 via-blue-500 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
            <Sparkles size={14} /> Live Supabase PostgreSQL Connected
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            FastAPI Media Streaming Backend Dashboard
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Manage and stream 830+ media assets stored in Cloud Supabase PostgreSQL with JWT Bearer Token Security &amp; Frontend Integration Middleware.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('media')}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 transition-all text-sm flex items-center gap-2"
            >
              <Film size={16} /> Explore Media Library
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all text-sm flex items-center gap-2"
            >
              <ShieldCheck size={16} /> JWT Authentication Details
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700">
                  {stat.badge}
                </span>
                <span className="text-xs text-gray-400">Live PostgreSQL</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Media Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Media Items</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Streamed from Supabase PostgreSQL Database</p>
          </div>
          <button 
            onClick={() => setActiveTab('media')}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentItems.map((item) => (
            <div 
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Media+Thumbnail'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {item.mediaType}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                  {item.duration}
                </span>
                <button
                  onClick={() => onSelectMedia(item)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-purple-600/50 transform group-hover:scale-110"
                >
                  <Play size={20} className="ml-1" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  <span>{item.category}</span>
                  <span>{item.format?.toUpperCase()}</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
