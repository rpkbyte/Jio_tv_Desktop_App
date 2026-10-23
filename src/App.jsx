import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import ChannelGrid from './components/ChannelGrid.jsx';
import EpgGuide from './components/EpgGuide.jsx';
import FilterModal from './components/FilterModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import LoginModal from './components/LoginModal.jsx';
import ChannelZapper from './components/ChannelZapper.jsx';
import { CHANNELS, CATEGORIES, LANGUAGES } from './data/channels.js';
import { initBackgroundSync, fetchChannelLiveEpg } from './services/jioApiService.js';
import { getStoredSession } from './services/jioAuthService.js';
import { Globe } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'epg' | 'catchup' | 'favorites'
  // Pre-bundled channels render at 0ms instant startup
  const [allChannels, setAllChannels] = useState(CHANNELS);
  const [currentChannel, setCurrentChannel] = useState(CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState('All Channels');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isZapperOpen, setIsZapperOpen] = useState(false);

  // Authenticated Subscriber Session
  const [userSession, setUserSession] = useState(getStoredSession);

  // Persistent Favorites in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('jiotv_favorites');
      return saved ? JSON.parse(saved) : ['ch-144', 'ch-154', 'ch-298'];
    } catch {
      return ['ch-144', 'ch-154', 'ch-298'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jiotv_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites]);

  // Background SWR Revalidation: Silently fetch and merge 1,000+ channels without blocking UI
  useEffect(() => {
    initBackgroundSync((freshChannels) => {
      if (freshChannels && freshChannels.length > 0) {
        setAllChannels(freshChannels);
      }
    });
  }, []);

  // Fetch real-time live EPG for currently selected channel
  useEffect(() => {
    if (!currentChannel?.channelId) return;
    let isMounted = true;

    fetchChannelLiveEpg(currentChannel.channelId).then((epgData) => {
      if (isMounted && epgData?.currentShow) {
        setCurrentChannel((prev) => {
          if (prev && (prev.id === currentChannel.id || prev.channelId === currentChannel.channelId)) {
            return {
              ...prev,
              currentShow: epgData.currentShow,
              nextShow: epgData.nextShow || prev.nextShow
            };
          }
          return prev;
        });
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [currentChannel?.channelId]);

  // Listen to subscriber login/logout events
  useEffect(() => {
    const handleAuthChange = () => {
      setUserSession(getStoredSession());
    };
    window.addEventListener('jiotv-auth-change', handleAuthChange);
    return () => window.removeEventListener('jiotv-auth-change', handleAuthChange);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      if (e.key === 'Escape') {
        setIsFilterModalOpen(false);
        setIsSettingsModalOpen(false);
        setIsLoginModalOpen(false);
        setIsZapperOpen(false);
      } else if (e.key === '1') {
        setActiveTab('live');
      } else if (e.key === '2') {
        setActiveTab('epg');
      } else if (e.key === '3') {
        setActiveTab('catchup');
      } else if (e.key === '4') {
        setActiveTab('favorites');
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZapperOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (channelId) => {
    setFavorites((prev) => 
      prev.includes(channelId) 
        ? prev.filter((id) => id !== channelId) 
        : [...prev, channelId]
    );
  };

  // Filtered Channels calculation
  const filteredChannels = useMemo(() => {
    return allChannels.filter((ch) => {
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
        const matchesName = ch.name?.toLowerCase().includes(query);
        const matchesShow = ch.currentShow?.title?.toLowerCase().includes(query);
        const matchesCategory = ch.category?.toLowerCase().includes(query);
        const matchesLang = ch.language?.toLowerCase().includes(query);
        const matchesNumber = ch.number?.toString().includes(query);
        return matchesName || matchesShow || matchesCategory || matchesLang || matchesNumber;
      }

      return true;
    });
  }, [allChannels, activeTab, activeCategory, activeLanguage, searchQuery, favorites]);

  // Channel switching helpers (Next / Previous)
  const handleNextChannel = () => {
    const currentIndex = allChannels.findIndex((c) => c.id === currentChannel.id);
    const nextIndex = (currentIndex + 1) % allChannels.length;
    setCurrentChannel(allChannels[nextIndex]);
  };

  const handlePrevChannel = () => {
    const currentIndex = allChannels.findIndex((c) => c.id === currentChannel.id);
    const prevIndex = (currentIndex - 1 + allChannels.length) % allChannels.length;
    setCurrentChannel(allChannels[prevIndex]);
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
        openLoginModal={() => setIsLoginModalOpen(true)}
        activeLanguage={activeLanguage}
        activeCategory={activeCategory}
        favoriteCount={favorites.length}
        userSession={userSession}
        isLoggedIn={Boolean(userSession)}
      />

      {/* Category Pills & Quick Filter Bar */}
      <div className="filter-bar">
        <div className="category-scroll" role="toolbar" aria-label="Channel Categories">
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
        <button 
          className="language-dropdown"
          onClick={() => setIsFilterModalOpen(true)}
          title="Change language filter"
        >
          <Globe size={15} aria-hidden="true" />
          <span>{activeLanguage}</span>
        </button>
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
          >
            {/* Quick TV Channel Zapper Drawer (Accessible in Fullscreen & Normal) */}
            <ChannelZapper
              isOpen={isZapperOpen}
              onClose={() => setIsZapperOpen(false)}
              channels={allChannels}
              currentChannel={currentChannel}
              onSelectChannel={(ch) => setCurrentChannel(ch)}
            />
          </Player>
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

      {/* JioTV Subscriber Login & Account Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
