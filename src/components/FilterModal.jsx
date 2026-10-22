import React from 'react';
import { X, Check } from 'lucide-react';
import { CATEGORIES, LANGUAGES } from '../data/channels';

export default function FilterModal({
  isOpen,
  onClose,
  activeCategory,
  setActiveCategory,
  activeLanguage,
  setActiveLanguage,
  onReset
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Channel Filters</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Categories Section */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Categories / Genres
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
        </div>

        {/* Languages Section */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Languages
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                className={`category-pill ${activeLanguage === lang ? 'active' : ''}`}
                onClick={() => setActiveLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
            onClick={onReset}
          >
            Reset Filters
          </button>

          <button
            className="category-pill active"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            onClick={onClose}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
