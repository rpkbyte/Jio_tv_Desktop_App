import React from 'react';
import { X } from 'lucide-react';

export default function ChannelZapper({
  isOpen,
  onClose,
  channels,
  currentChannel,
  onSelectChannel
}) {
  if (!isOpen) return null;

  return (
    <aside className="channel-zapper-drawer" aria-label="Channel Quick Switcher">
      <div className="zapper-header">
        <h3 className="zapper-title">
          Channel Switcher
        </h3>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Channel Switcher"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="zapper-list" role="list">
        {channels.map((ch) => {
          const isSelected = currentChannel?.id === ch.id;

          return (
            <button
              key={ch.id}
              className={`zapper-item ${isSelected ? 'active' : ''}`}
              onClick={() => {
                onSelectChannel(ch);
                onClose();
              }}
              role="listitem"
            >
              <img
                src={ch.logo}
                alt=""
                className="zapper-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              <div className="zapper-info">
                <div className="zapper-ch-name">
                  {ch.name}
                </div>
                <div className="zapper-show-title">
                  {ch.currentShow.title}
                </div>
              </div>

              <span className="zapper-ch-number">
                {ch.number}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
