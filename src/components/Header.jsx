import React from 'react';
import { Search, X, SlidersHorizontal, Settings, Tv, Calendar, Heart, History, User } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  openFilterModal,
  openSettingsModal,
  openLoginModal,
  activeLanguage,
  activeCategory,
  favoriteCount,
  userSession,
  isLoggedIn
}) {
  return (
    <header className="app-header">
      {/* Brand logo & title */}
      <button 
        className="brand-section" 
        onClick={() => setActiveTab('live')}
        title="JioTV Desktop - Back to Live"
      >
        <img
          src="./extracted_resources/ic_launcher.webp"
          alt="JioTV"
          className="brand-logo-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="brand-title">
          <span className="jio">Jio</span>
          <span className="tv">TV</span>
          <span className="badge-desktop">Desktop</span>
        </div>
      </button>

      {/* Primary Navigation Tabs */}
      <nav className="header-nav" aria-label="Main Navigation">
        <button
          className={`nav-item ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <Tv size={15} aria-hidden="true" />
          <span>Live TV</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'epg' ? 'active' : ''}`}
          onClick={() => setActiveTab('epg')}
        >
          <Calendar size={15} aria-hidden="true" />
          <span>TV Guide</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'catchup' ? 'active' : ''}`}
          onClick={() => setActiveTab('catchup')}
        >
          <History size={15} aria-hidden="true" />
          <span>Catch-up</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={15} aria-hidden="true" />
          <span>Favorites {favoriteCount > 0 ? `(${favoriteCount})` : ''}</span>
        </button>
      </nav>

      {/* Global Search Bar */}
      <div className="header-search">
        <Search size={15} className="search-icon-pos" aria-hidden="true" />
        <input
          type="text"
          className="search-input"
          placeholder="Search channels, shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search channels and shows"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn" 
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Right Action Icons */}
      <div className="header-actions">
        {/* Filters Button */}
        <button
          className={`action-btn ${activeLanguage !== 'All Languages' || activeCategory !== 'All Channels' ? 'active' : ''}`}
          onClick={openFilterModal}
          title="Filter by Language & Category"
          aria-label="Filter Channels"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
        </button>

        {/* Settings Button */}
        <button
          className="action-btn"
          onClick={openSettingsModal}
          title="Settings & System Preferences"
          aria-label="App Settings"
        >
          <Settings size={16} aria-hidden="true" />
        </button>

        {/* Jio Subscriber Account / Sign In */}
        {isLoggedIn ? (
          <button
            className="jio-header-user-badge"
            onClick={openLoginModal}
            title={`Logged in as Jio Subscriber: ${userSession?.mobile || ''}`}
            aria-label="Jio Account Profile"
          >
            <span className="jio-status-dot-pulse" aria-hidden="true" />
            <span className="jio-header-user-text">
              {userSession?.mobile ? `+91 ${userSession.mobile.slice(-4)}` : 'Jio User'}
            </span>
            <User size={14} className="jio-header-user-icon" aria-hidden="true" />
          </button>
        ) : (
          <button
            className="jio-header-login-btn"
            onClick={openLoginModal}
            title="Sign in with your Jio mobile number"
            aria-label="Sign in with Jio"
          >
            <User size={14} aria-hidden="true" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
