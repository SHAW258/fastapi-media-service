import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle } from 'lucide-react';
import { createMedia } from '../services/api';

export default function AddMediaModal({ isOpen, onClose, onRefresh }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('audio');
  const [format, setFormat] = useState('mp3');
  const [category, setCategory] = useState('Music');
  const [duration, setDuration] = useState('03:30');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://dummyimage.com/600x400/037/fff&text=New+Media');
  const [mediaUrl, setMediaUrl] = useState('https://www.w3schools.com/html/horse.mp3');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const payload = {
      title,
      description,
      mediaType,
      format,
      category,
      duration,
      thumbnailUrl,
      mediaUrl,
      artist: artist || null,
      views: 0,
      likes: 0,
      isPremium: false,
      createdAt: new Date().toISOString()
    };

    const res = await createMedia(payload);
    setLoading(false);

    if (res.ok) {
      setSuccess(`Media item '${res.data.title}' created successfully in Supabase!`);
      setTimeout(() => {
        onRefresh();
        onClose();
      }, 1500);
    } else {
      setError(res.data.detail || res.data.message || 'Failed to create media item (JWT Auth Required)');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 relative border border-gray-200 dark:border-slate-700 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="text-purple-500" size={20} /> Add New Media Asset
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">{error}</div>}
        {success && <div className="p-3 mb-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold flex items-center gap-2"><CheckCircle size={16} /> {success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-400 mb-1">Title</label>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Midnight LoFi Beat"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-400 mb-1">Description</label>
            <textarea 
              rows={2}
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Short description of media"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-400 mb-1">Media Type</label>
              <select 
                value={mediaType} 
                onChange={(e) => {
                  setMediaType(e.target.value);
                  setFormat(e.target.value === 'audio' ? 'mp3' : 'mp4');
                }} 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="audio">Audio (Song)</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-400 mb-1">Format</label>
              <input 
                type="text" 
                value={format} 
                onChange={(e) => setFormat(e.target.value)} 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-400 mb-1">Category</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-400 mb-1">Duration</label>
              <input 
                type="text" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-400 mb-1">Artist Name (Optional)</label>
              <input 
                type="text" 
                value={artist} 
                onChange={(e) => setArtist(e.target.value)} 
                placeholder="e.g. Chill Beats"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-400 mb-1">Media Stream URL</label>
            <input 
              type="text" 
              required 
              value={mediaUrl} 
              onChange={(e) => setMediaUrl(e.target.value)} 
              className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-500/20 disabled:opacity-50"
            >
              {loading ? 'Creating in Supabase...' : 'Save Media Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
