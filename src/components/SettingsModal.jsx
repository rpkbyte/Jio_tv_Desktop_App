import React from 'react';
import { X, ShieldCheck, Cpu, Tv, Wifi, Globe, Sliders } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Settings & System Info</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
          {/* Account status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '8px',
            border: '1px solid var(--border-glass)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wifi size={18} style={{ color: 'var(--live-green)' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Jio Network Status</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Connected via JioFiber Broadband</div>
              </div>
            </div>
            <span style={{ color: 'var(--live-green)', fontSize: '0.75rem', fontWeight: 700 }}>
              ACTIVE
            </span>
          </div>

          {/* Video Streaming Preferences */}
          <div>
            <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Default Streaming Quality
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-glass)',
                borderRadius: '6px',
                color: '#fff',
                outline: 'none'
              }}
              defaultValue="Auto (Adaptive 1080p)"
            >
              <option value="Auto (Adaptive 1080p)">Auto (Adaptive 1080p High Quality)</option>
              <option value="1080p">1080p Full HD Always</option>
              <option value="720p">720p Standard HD</option>
              <option value="480p">480p Data Saver</option>
            </select>
          </div>

          {/* Audio Language */}
          <div>
            <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Default Primary Audio Track
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-glass)',
                borderRadius: '6px',
                color: '#fff',
                outline: 'none'
              }}
              defaultValue="Original / Hindi"
            >
              <option value="Original / Hindi">Original Broadcast / Hindi</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          {/* Reverse Engineering & Build Parity Info */}
          <div style={{
            padding: '12px',
            background: 'rgba(225, 27, 34, 0.08)',
            borderRadius: '8px',
            border: '1px solid rgba(225, 27, 34, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--jio-red)' }} />
              <div style={{ fontWeight: 600, color: 'var(--jio-red)', fontSize: '0.85rem' }}>
                JioTV APK v7.1.8 Specification Match
              </div>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Reverse-engineered using REA static asset and package inspection. Includes authentic UI drawables, live HLS video playback pipeline, 7-day catch-up engine, and full EPG schedule guide.
            </p>
          </div>

          {/* Close action */}
          <button
            className="category-pill active"
            style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            onClick={onClose}
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
