import React from 'react';
import { X, Wifi, Keyboard, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function SettingsModal({ isOpen, onClose }) {
  const { theme, effectiveTheme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="settings-modal-title" className="modal-title">Settings &amp; Preferences</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Settings"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="settings-content">
          {/* Network status */}
          <div className="settings-status-row">
            <div className="status-row-left">
              <Wifi size={16} className="status-icon" aria-hidden="true" />
              <div>
                <div className="status-row-label">Jio Network Status</div>
                <div className="status-row-desc">Connected via Jio Broadband</div>
              </div>
            </div>
            <span className="status-badge">
              Connected
            </span>
          </div>

          {/* Appearance & Theme */}
          <div className="settings-field">
            <div className="settings-field-header">
              <label id="theme-selection-label" className="settings-label">
                Appearance &amp; Theme
              </label>
              <span className="settings-hint">
                {theme === 'system'
                  ? `System (${effectiveTheme === 'dark' ? 'Dark' : 'Light'})`
                  : theme === 'dark'
                  ? 'Dark Mode'
                  : 'Light Mode'}
              </span>
            </div>
            <div
              className="theme-selector-group"
              role="radiogroup"
              aria-labelledby="theme-selection-label"
            >
              <button
                type="button"
                className={`theme-option-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
                role="radio"
                aria-checked={theme === 'dark'}
                aria-label="Dark Mode"
              >
                <Moon size={15} aria-hidden="true" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                className={`theme-option-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
                role="radio"
                aria-checked={theme === 'light'}
                aria-label="Light Mode"
              >
                <Sun size={15} aria-hidden="true" />
                <span>Light</span>
              </button>
              <button
                type="button"
                className={`theme-option-btn ${theme === 'system' ? 'active' : ''}`}
                onClick={() => setTheme('system')}
                role="radio"
                aria-checked={theme === 'system'}
                aria-label="System Mode"
              >
                <Monitor size={15} aria-hidden="true" />
                <span>System</span>
              </button>
            </div>
          </div>


          {/* Streaming Quality */}
          <div className="settings-field">
            <label htmlFor="setting-quality" className="settings-label">
              Default Streaming Quality
            </label>
            <select
              id="setting-quality"
              className="settings-select"
              defaultValue="Auto"
            >
              <option value="Auto">Auto (Adaptive 1080p Full HD)</option>
              <option value="1080p">1080p Full HD Always</option>
              <option value="720p">720p Standard HD</option>
              <option value="480p">480p Data Saver</option>
            </select>
          </div>

          {/* Audio Language */}
          <div className="settings-field">
            <label htmlFor="setting-audio" className="settings-label">
              Preferred Audio Track
            </label>
            <select
              id="setting-audio"
              className="settings-select"
              defaultValue="Original"
            >
              <option value="Original">Original Broadcast / Hindi</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          {/* Keyboard Shortcuts Reference */}
          <div className="settings-shortcuts-block">
            <div className="shortcuts-header">
              <Keyboard size={15} aria-hidden="true" />
              <span className="shortcuts-title">Keyboard Shortcuts</span>
            </div>
            <div className="shortcuts-grid">
              <div className="shortcut-row">
                <span>Play / Pause</span>
                <kbd className="shortcut-kbd">Space</kbd>
              </div>
              <div className="shortcut-row">
                <span>Toggle Mute</span>
                <kbd className="shortcut-kbd">M</kbd>
              </div>
              <div className="shortcut-row">
                <span>Fullscreen</span>
                <kbd className="shortcut-kbd">F</kbd>
              </div>
              <div className="shortcut-row">
                <span>Channel Switcher</span>
                <kbd className="shortcut-kbd">Z</kbd>
              </div>
              <div className="shortcut-row">
                <span>Previous / Next Channel</span>
                <kbd className="shortcut-kbd">↑ / ↓</kbd>
              </div>
              <div className="shortcut-row">
                <span>Switch Tabs</span>
                <kbd className="shortcut-kbd">1 - 4</kbd>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="modal-footer-row">
            <button
              className="category-pill active"
              onClick={onClose}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
