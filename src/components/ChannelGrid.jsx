import React from 'react';
import { Heart, Play, Radio, Sparkles } from 'lucide-react';

export default function ChannelGrid({
  channels,
  currentChannel,
  onSelectChannel,
  favorites,
  onToggleFavorite,
  categoryTitle
}) {
  if (channels.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
        <Radio size={48} style={{ color: 'var(--text-muted)', marginBottom: '14px' }} />
        <h3 style={{ color: 'var(--text-white)', marginBottom: '6px' }}>No Channels Found</h3>
        <p style={{ fontSize: '0.9rem' }}>Try adjusting your search query, genre, or language filters.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="section-title-row">
        <h2 className="section-heading">
          <Sparkles size={20} style={{ color: 'var(--jio-red)' }} />
          <span>{categoryTitle}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            ({channels.length} {channels.length === 1 ? 'Channel' : 'Channels'})
          </span>
        </h2>
      </div>

      <div className="channel-grid">
        {channels.map((ch) => {
          const isPlaying = currentChannel?.id === ch.id;
          const isFav = favorites.includes(ch.id);

          return (
            <div
              key={ch.id}
              className={`channel-card ${isPlaying ? 'active-playing' : ''}`}
              onClick={() => onSelectChannel(ch)}
            >
              {/* Banner with Gradient & Badges */}
              <div className="card-banner">
                <img
                  src={ch.banner}
                  alt={ch.name}
                  className="card-banner-img"
                  loading="lazy"
                />
                <div className="card-banner-gradient" />

                {/* Channel Logo & Number Badge */}
                <div className="card-logo-badge">
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    className="card-logo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="card-channel-num">CH {ch.number}</span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  className={`card-fav-btn ${isFav ? 'is-fav' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(ch.id);
                  }}
                  title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <Heart
                    size={15}
                    fill={isFav ? 'var(--jio-red)' : 'none'}
                    color={isFav ? 'var(--jio-red)' : '#FFFFFF'}
                  />
                </button>
              </div>

              {/* Card Body Details */}
              <div className="card-body">
                <div className="card-channel-name">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {ch.name}
                  </span>
                  {ch.isHd && <span className="hd-pill">HD</span>}
                </div>

                <div className="card-show-title" title={ch.currentShow.title}>
                  {ch.currentShow.title}
                </div>

                <div className="card-show-meta">
                  <span>{ch.currentShow.time}</span>
                  <span>{ch.language}</span>
                </div>

                {/* Live Progress Bar */}
                <div className="card-progress-bar">
                  <div
                    className="card-progress-fill"
                    style={{ width: `${ch.currentShow.progress || 50}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
