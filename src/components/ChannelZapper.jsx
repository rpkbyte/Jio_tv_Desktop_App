import React from 'react';
import { X, Play } from 'lucide-react';

export default function ChannelZapper({
  isOpen,
  onClose,
  channels,
  currentChannel,
  onSelectChannel
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '320px',
      background: 'rgba(12, 16, 24, 0.94)',
      backdropFilter: 'blur(16px)',
      borderLeft: '1px solid var(--border-glass)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      boxShadow: '-8px 0 25px rgba(0,0,0,0.7)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-white)' }}>
          Quick Channel Zapper
        </h3>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {channels.map((ch) => {
          const isSelected = currentChannel?.id === ch.id;

          return (
            <div
              key={ch.id}
              onClick={() => {
                onSelectChannel(ch);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 10px',
                borderRadius: '8px',
                background: isSelected ? 'rgba(225, 27, 34, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid var(--jio-red)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <img
                src={ch.logo}
                alt={ch.name}
                style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
              />

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ch.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ch.currentShow.title}
                </div>
              </div>

              <span style={{ fontSize: '0.72rem', color: isSelected ? 'var(--jio-red)' : 'var(--text-muted)', fontWeight: 700 }}>
                {ch.number}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
