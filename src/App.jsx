import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import ChannelGrid from './components/ChannelGrid.jsx';
import EpgGuide from './components/EpgGuide.jsx';
import FilterModal from './components/FilterModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import ChannelZapper from './components/ChannelZapper.jsx';
import { CHANNELS, CATEGORIES, LANGUAGES } from './data/channels.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'epg' | 'catchup' | 'favorites'
  const [currentChannel, setCurrentChannel] = useState(CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState('All Channels');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isZapperOpen, setIsZapperOpen] = useState(false);

  // Persistent Favorites in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('jiotv_favorites');
      return saved ? JSON.parse(saved) : ['star-plus', 'star-sports-1', 'aaj-tak'];
    } catch {
      return ['star-plus', 'star-sports-1', 'aaj-tak'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jiotv_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites]);

  const toggleFavorite = (channelId) => {
    setFavorites((prev) => 
      prev.includes(channelId) 
        ? prev.filter((id) => id !== channelId) 
        : [...prev, channelId]
    );
  };

  // Filtered Channels calculation
  const filteredChannels = useMemo(() => {
    return CHANNELS.filter((ch) => {
      // Favorites filter
      if (activeTab === 'favorites' && !favorites.includes(ch.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'All Channels' && ch.category !== activeCategory) {
        return false;
      }

      // Language filter
      if (activeLanguage !== 'All Languages' && ch.language !== activeLanguage) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = ch.name.toLowerCase().includes(query);
        const matchesShow = ch.currentShow.title.toLowerCase().includes(query);
        const matchesCategory = ch.category.toLowerCase().includes(query);
        const matchesLang = ch.language.toLowerCase().includes(query);
        const matchesNumber = ch.number.toString().includes(query);
        return matchesName || matchesShow || matchesCategory || matchesLang || matchesNumber;
      }

      return true;
    });
  }, [activeTab, activeCategory, activeLanguage, searchQuery, favorites]);

  // Channel switching helpers (Next / Previous)
  const handleNextChannel = () => {
    const currentIndex = CHANNELS.findIndex((c) => c.id === currentChannel.id);
    const nextIndex = (currentIndex + 1) % CHANNELS.length;
    setCurrentChannel(CHANNELS[nextIndex]);
  };

  const handlePrevChannel = () => {
    const currentIndex = CHANNELS.findIndex((c) => c.id === currentChannel.id);
    const prevIndex = (currentIndex - 1 + CHANNELS.length) % CHANNELS.length;
    setCurrentChannel(CHANNELS[prevIndex]);
  };

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFilterModal={() => setIsFilterModalOpen(true)}
        openSettingsModal={() => setIsSettingsModalOpen(true)}
        activeLanguage={activeLanguage}
        activeCategory={activeCategory}
        favoriteCount={favorites.length}
      />

      {/* Category Pills & Quick Filter Bar */}
      <div className="filter-bar">
        <div className="category-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Language Selector */}
        <div 
          className="language-dropdown"
          onClick={() => setIsFilterModalOpen(true)}
          title="Change language filter"
        >
          <span>🌐 {activeLanguage}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Live Video Player (Persistent on Live, Favorites & Catch-up) */}
        <div style={{ position: 'relative' }}>
          <Player
            channel={currentChannel}
            onNextChannel={handleNextChannel}
            onPrevChannel={handlePrevChannel}
            onToggleZapper={() => setIsZapperOpen(!isZapperOpen)}
            isZapperOpen={isZapperOpen}
          />

          {/* Quick TV Channel Zapper Drawer */}
          <ChannelZapper
            isOpen={isZapperOpen}
            onClose={() => setIsZapperOpen(false)}
            channels={CHANNELS}
            currentChannel={currentChannel}
            onSelectChannel={(ch) => setCurrentChannel(ch)}
          />
        </div>

        {/* View Switcher based on Active Tab */}
        {activeTab === 'epg' || activeTab === 'catchup' ? (
          <EpgGuide
            channels={filteredChannels}
            currentChannel={currentChannel}
            onSelectChannel={(ch) => setCurrentChannel(ch)}
          />
        ) : (
          <ChannelGrid
            channels={filteredChannels}
            currentChannel={currentChannel}
            onSelectChannel={(ch) => setCurrentChannel(ch)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            categoryTitle={
              activeTab === 'favorites'
                ? 'Your Favorite Channels'
                : searchQuery
                ? `Search Results for "${searchQuery}"`
                : `${activeCategory} (${activeLanguage})`
            }
          />
        )}
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeLanguage={activeLanguage}
        setActiveLanguage={setActiveLanguage}
        onReset={() => {
          setActiveCategory('All Channels');
          setActiveLanguage('All Languages');
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
