import React from 'react';
import { Search, X, SlidersHorizontal, Settings, Tv, Calendar, Heart, History, User, ChevronDown } from 'lucide-react';

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

        {/* Subtle Section Divider */}
        <div className="header-divider" aria-hidden="true" />

        {/* Jio Subscriber Account / Sign In */}
        {isLoggedIn ? (
          <button
            className="header-profile-btn"
            onClick={openLoginModal}
            title={`Jio Subscriber Account (${userSession?.displayName || userSession?.mobile || 'Active'})`}
            aria-label="Jio Subscriber Account Profile"
          >
            <div className="profile-avatar">
              <User size={13} aria-hidden="true" />
            </div>
            <div className="profile-meta">
              <span className="profile-name">
                {userSession?.displayName || (userSession?.mobile ? `+91 ${userSession.mobile.slice(-4)}` : 'Subscriber')}
              </span>
              <span className="profile-status-dot" aria-hidden="true" />
            </div>
            <ChevronDown size={14} className="profile-chevron" aria-hidden="true" />
          </button>
        ) : (
          <button
            className="header-login-btn"
            onClick={openLoginModal}
            title="Sign in with your Jio subscriber account"
            aria-label="Sign in with Jio"
          >
            <User size={15} aria-hidden="true" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
