import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, LANGUAGES } from '../data/channels.js';

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="filter-modal-title" className="modal-title">Channel Filters</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Filter Dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="modal-section">
          <h4 className="modal-section-title">
            Categories &amp; Genres
          </h4>
          <div className="modal-pills-wrap">
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
        <div className="modal-section">
          <h4 className="modal-section-title">
            Languages
          </h4>
          <div className="modal-pills-wrap">
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
        <div className="modal-footer-row">
          <button
            className="btn-text"
            onClick={onReset}
          >
            Reset Filters
          </button>

          <button
            className="category-pill active"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
