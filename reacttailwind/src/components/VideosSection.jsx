import React from 'react';
import { Video, Play, Eye, ThumbsUp } from 'lucide-react';

export default function VideosSection({ videos, onSelectMedia }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Video className="text-emerald-500" />
            Video Streams Gallery ({videos.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            HD Video Items Streamed Live from Cloud Supabase Database
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.map((video) => (
          <div 
            key={video.id}
            className="glass-panel rounded-2xl overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 bg-slate-900 overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Video+Thumbnail'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-600/80 backdrop-blur-md text-white">
                {video.format?.toUpperCase()}
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                {video.duration}
              </span>
              <button
                onClick={() => onSelectMedia(video)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-emerald-500/50 transform group-hover:scale-110"
              >
                <Play size={20} className="ml-1" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>{video.category}</span>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1"><Eye size={12} /> {video.views}</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={12} /> {video.likes}</span>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white truncate">{video.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
