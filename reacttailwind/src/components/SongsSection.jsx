import React from 'react';
import { Music, Play, UserCheck, Disc } from 'lucide-react';

export default function SongsSection({ songs, artists, onSelectMedia }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Music className="text-blue-500" />
            Audio Songs &amp; Artists Directory ({songs.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Audio Tracks &amp; Featured Artists Streamed Live from Cloud Supabase
          </p>
        </div>
      </div>

      {/* Artists Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UserCheck size={18} className="text-purple-500" /> Featured Audio Artists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {artists.map((artist) => (
            <div key={artist.id} className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                {artist.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[120px]">{artist.name}</h4>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{artist.totalSongs} Songs</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Disc size={18} className="text-blue-500" /> Audio Tracks ({songs.length})
        </h2>

        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
          {songs.slice(0, 15).map((song) => (
            <div 
              key={song.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-purple-500/5 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <Music size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{song.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{song.artist || 'Unknown Artist'} • {song.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-mono">{song.duration}</span>
                <button
                  onClick={() => onSelectMedia(song)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                >
                  <Play size={14} /> Play Audio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
