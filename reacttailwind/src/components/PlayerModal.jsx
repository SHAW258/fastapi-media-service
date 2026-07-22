import React from 'react';
import { X, Music, Film, ExternalLink } from 'lucide-react';

export default function PlayerModal({ item, onClose }) {
  if (!item) return null;

  const isVideo = item.mediaType?.toLowerCase() === 'video';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 relative border border-gray-200 dark:border-slate-700 shadow-2xl animate-fade-in space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white ${isVideo ? 'bg-emerald-600' : 'bg-purple-600'}`}>
              {isVideo ? <Film size={20} /> : <Music size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.category} • {item.mediaType?.toUpperCase()}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* Media Player Player Box */}
        <div className="bg-black rounded-2xl overflow-hidden flex items-center justify-center min-h-[250px] border border-gray-800">
          {isVideo ? (
            <video 
              controls 
              autoPlay 
              src={item.mediaUrl} 
              poster={item.thumbnailUrl}
              className="w-full max-h-[380px] object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>
          ) : (
            <div className="p-8 w-full text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold text-3xl shadow-xl animate-pulse">
                <Music size={40} />
              </div>
              <audio controls autoPlay src={item.mediaUrl} className="w-full">
                Your browser does not support HTML5 audio playback.
              </audio>
            </div>
          )}
        </div>

        {/* Metadata Details */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
          <span>Format: <strong className="text-white">{item.format?.toUpperCase()}</strong></span>
          <span>Duration: <strong className="text-white">{item.duration}</strong></span>
          <a 
            href={item.mediaUrl} 
            target="_blank" 
            rel="noreferrer"
            className="text-purple-400 hover:underline flex items-center gap-1"
          >
            Direct Stream URL <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
