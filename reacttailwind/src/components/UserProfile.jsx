import React, { useState } from 'react';
import { User, ShieldCheck, Key, LogOut, Copy, Check, Lock, UserPlus, LogIn } from 'lucide-react';
import { registerUser, loginUser, setToken, getToken } from '../services/api';

export default function UserProfile({ user, setUser, onAuthSuccess }) {
  const [activeMode, setActiveMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const currentToken = getToken();

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setErrorMsg('');

    const res = await registerUser(username, email, password);
    if (res.ok) {
      setStatusMsg(`Registered user '${res.data.username}' successfully! Now log in.`);
      setActiveMode('login');
    } else {
      setErrorMsg(res.data.detail || res.data.message || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setErrorMsg('');

    const res = await loginUser(username, password);
    if (res.ok && res.data.access_token) {
      setStatusMsg('Logged in successfully!');
      onAuthSuccess();
    } else {
      setErrorMsg(res.data.detail || res.data.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    setStatusMsg('Logged out.');
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(currentToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
            {user ? user.username.charAt(0).toUpperCase() : <User size={28} />}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {user ? user.username : 'User Authentication'}
              {user && <ShieldCheck className="text-green-500" size={20} />}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user ? user.email : 'Sign in or create an account to access protected media APIs'}
            </p>
          </div>
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-red-500/20"
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>

      {/* Messages */}
      {statusMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">
          {statusMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* If Authenticated: Display Profile Card & JWT Token */}
      {user ? (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-purple-500" size={18} /> User Account Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-100 dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-gray-400 block font-medium">Username</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{user.username}</span>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-gray-400 block font-medium">Email Address</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">{user.email}</span>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-gray-400 block font-medium">Account Status</span>
                <span className="font-bold text-green-500 text-sm">Active (Supabase Verified)</span>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-gray-400 block font-medium">Superuser / Admin</span>
                <span className="font-bold text-purple-400 text-sm">{user.is_superuser ? 'Yes (Admin)' : 'Standard User'}</span>
              </div>
            </div>
          </div>

          {/* Active JWT Token Box */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Key className="text-yellow-500" size={18} /> Active JWT Bearer Access Token
              </h2>
              <button
                onClick={handleCopyToken}
                className="px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-500 font-semibold rounded-lg text-xs flex items-center gap-1.5 border border-purple-500/20"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Token'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-purple-300 break-all border border-purple-500/30">
              {currentToken || 'No token active'}
            </div>
          </div>
        </div>
      ) : (
        /* If Unauthenticated: Registration & Login Form Card */
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setActiveMode('login')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeMode === 'login' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500'}`}
            >
              <LogIn size={14} /> Log In
            </button>
            <button
              onClick={() => setActiveMode('register')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeMode === 'register' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500'}`}
            >
              <UserPlus size={14} /> Register New Account
            </button>
          </div>

          <form onSubmit={activeMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {activeMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm shadow-md shadow-purple-500/20 transition-all"
            >
              {activeMode === 'login' ? 'Log In & Acquire JWT Token' : 'Register Account'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
