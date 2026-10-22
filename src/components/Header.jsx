import React from 'react';
import { Search, X, SlidersHorizontal, Settings, Tv, Calendar, Heart, History, Radio } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  openFilterModal,
  openSettingsModal,
  activeLanguage,
  activeCategory,
  favoriteCount
}) {
  return (
    <header className="app-header">
      {/* Brand logo & title */}
      <div className="brand-section" onClick={() => setActiveTab('live')}>
        <img
          src="./extracted_resources/ic_launcher.webp"
          alt="JioTV Logo"
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
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="header-nav">
        <button
          className={`nav-item ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <Tv size={16} />
          <span>Live TV</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'epg' ? 'active' : ''}`}
          onClick={() => setActiveTab('epg')}
        >
          <Calendar size={16} />
          <span>TV Guide (EPG)</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'catchup' ? 'active' : ''}`}
          onClick={() => setActiveTab('catchup')}
        >
          <History size={16} />
          <span>Catch-up (7 Days)</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={16} />
          <span>Favorites {favoriteCount > 0 ? `(${favoriteCount})` : ''}</span>
        </button>
      </nav>

      {/* Global Search Bar */}
      <div className="header-search">
        <Search size={16} className="search-icon-pos" />
        <input
          type="text"
          className="search-input"
          placeholder="Search channels, shows, genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={15} />
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
        >
          <SlidersHorizontal size={17} />
        </button>

        {/* Settings Button */}
        <button
          className="action-btn"
          onClick={openSettingsModal}
          title="App & Player Settings"
        >
          <Settings size={17} />
        </button>

        {/* User Profile Avatar */}
        <div className="action-btn" title="Jio User Account">
          <img
            src="./extracted_resources/jio_user.webp"
            alt="Profile"
            style={{ width: '22px', height: '22px', borderRadius: '50%' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </header>
  );
}
