import React, { useState } from 'react';
import { Film, Music, Video, Grid, List, Play, Plus, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

export default function MediaLibrary({ 
  mediaItems, 
  categories, 
  searchQuery, 
  onSelectMedia, 
  onOpenAddModal,
  token 
}) {
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter Logic
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMediaType = mediaTypeFilter === 'all' || item.mediaType?.toLowerCase() === mediaTypeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category?.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesMediaType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Film className="text-purple-600 dark:text-purple-400" />
            Media Assets Library ({filteredItems.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Querying Supabase PostgreSQL Database with JWT Bearer Protection
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20"
          >
            <Plus size={16} /> Add Media
          </button>
          
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-400'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-400'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Media Type Tabs */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800/60 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
          <button
            onClick={() => { setMediaTypeFilter('all'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${mediaTypeFilter === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            All Media ({mediaItems.length})
          </button>
          <button
            onClick={() => { setMediaTypeFilter('audio'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${mediaTypeFilter === 'audio' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            <Music size={14} /> Songs (500+)
          </button>
          <button
            onClick={() => { setMediaTypeFilter('video'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${mediaTypeFilter === 'video' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            <Video size={14} /> Videos (330+)
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.name}>{cat.name} ({cat.total})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedItems.map((item) => (
            <div 
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 bg-slate-900 overflow-hidden">
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
                {item.artist && <p className="text-xs text-gray-500 dark:text-gray-400">By {item.artist}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
          {paginatedItems.map((item) => (
            <div 
              key={item.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-purple-500/5 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 relative">
                  <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.category} • {item.mediaType?.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-mono">{item.duration}</span>
                <button
                  onClick={() => onSelectMedia(item)}
                  className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20"
                >
                  <Play size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Showing Page {currentPage} of {totalPages} ({filteredItems.length} Total)
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
