import React from 'react';
import { Heart, Radio, Tv } from 'lucide-react';

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
      <div className="empty-state-box">
        <Radio size={40} className="empty-state-icon" aria-hidden="true" />
        <h3 className="empty-state-title">No Channels Found</h3>
        <p className="empty-state-desc">Try adjusting your search query, genre, or language filters.</p>
      </div>
    );
  }

  return (
    <section aria-labelledby="section-heading-id">
      <div className="section-title-row">
        <h2 id="section-heading-id" className="section-heading">
          <Tv size={18} aria-hidden="true" />
          <span>{categoryTitle}</span>
          <span className="channel-count-badge">
            ({channels.length} {channels.length === 1 ? 'Channel' : 'Channels'})
          </span>
        </h2>
      </div>

      <div className="channel-grid">
        {channels.map((ch, index) => {
          const isPlaying = currentChannel?.id === ch.id;
          const isFav = favorites.includes(ch.id);

          return (
            <div
              key={ch.id}
              className={`channel-card ${isPlaying ? 'active-playing' : ''}`}
              onClick={() => onSelectChannel(ch)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectChannel(ch);
                }
              }}
              aria-label={`Play channel ${ch.name}`}
            >
              {/* Banner with Clean Overlays */}
              <div className="card-banner">
                <img
                  src={ch.banner}
                  alt={ch.name}
                  className="card-banner-img"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "auto"}
                />
                <div className="card-banner-gradient" />

                {/* Channel Logo & Number Badge */}
                <div className="card-logo-badge">
                  <img
                    src={ch.logo}
                    alt=""
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
                  aria-label={isFav ? `Remove ${ch.name} from Favorites` : `Add ${ch.name} to Favorites`}
                >
                  <Heart
                    size={14}
                    fill={isFav ? 'currentColor' : 'none'}
                    color="currentColor"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Card Body Details */}
              <div className="card-body">
                <div className="card-channel-name">
                  <span>{ch.name}</span>
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
                <div 
                  className="card-progress-bar"
                  role="progressbar"
                  aria-valuenow={ch.currentShow.progress || 50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
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
