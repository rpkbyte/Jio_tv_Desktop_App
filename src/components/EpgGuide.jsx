import React, { useState } from 'react';
import { Calendar, Clock, History } from 'lucide-react';
import { generateCatchupSchedule } from '../data/channels.js';

export default function EpgGuide({ channels, onSelectChannel, currentChannel }) {
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);

  // Generate list of 7 days: Today, Yesterday, etc.
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      offset: i,
      label: i === 0 ? 'Today (Live)' : i === 1 ? 'Yesterday' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  return (
    <div className="epg-wrapper">
      {/* Top Catch-up Date Bar */}
      <div className="epg-top-bar">
        <div className="epg-title-section">
          <History size={18} aria-hidden="true" />
          <h2 className="epg-main-heading">
            {selectedDayOffset === 0 ? 'Electronic Program Guide (EPG)' : `Catch-up: ${days[selectedDayOffset].label}`}
          </h2>
        </div>

        {/* 7-Day Date Selector Buttons */}
        <div className="epg-day-buttons" role="tablist" aria-label="Catch-up Days">
          {days.map((d) => (
            <button
              key={d.offset}
              className={`category-pill ${selectedDayOffset === d.offset ? 'active' : ''}`}
              onClick={() => setSelectedDayOffset(d.offset)}
              role="tab"
              aria-selected={selectedDayOffset === d.offset}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full EPG Interactive Table */}
      <div className="epg-container">
        {/* Header timeline */}
        <div className="epg-header-row">
          <div className="epg-channel-col-header">
            Channels ({channels.length})
          </div>
          <div className="epg-timeline-slots">
            <div className="timeline-slot-header">06:00 AM - 08:30 AM</div>
            <div className="timeline-slot-header">08:30 AM - 12:00 PM</div>
            <div className="timeline-slot-header">12:00 PM - 03:00 PM</div>
            <div className="timeline-slot-header">03:00 PM - 06:00 PM</div>
            <div className="timeline-slot-header">06:00 PM - 08:30 PM</div>
            <div className="timeline-slot-header prime-slot-header">
              08:30 PM - 10:30 PM (Prime)
            </div>
            <div className="timeline-slot-header">10:30 PM - Late Night</div>
          </div>
        </div>

        {/* Channel Schedule Rows */}
        {channels.map((ch) => {
          const schedule = generateCatchupSchedule(ch, selectedDayOffset);
          const isCurrentCh = currentChannel?.id === ch.id;

          return (
            <div key={ch.id} className="epg-channel-row">
              {/* Channel badge column */}
              <button 
                className="epg-channel-badge"
                onClick={() => onSelectChannel(ch)}
                title={`Watch ${ch.name}`}
              >
                <img
                  src={ch.logo}
                  alt=""
                  className="epg-channel-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="epg-channel-meta">
                  <div className="epg-ch-name">
                    {ch.name}
                  </div>
                  <div className="epg-ch-num">
                    CH {ch.number} • {ch.language}
                  </div>
                </div>
              </button>

              {/* Show Slots Track */}
              <div className="epg-shows-track">
                {schedule.map((show, idx) => {
                  const isLiveShow = selectedDayOffset === 0 && show.title === ch.currentShow.title;

                  return (
                    <div
                      key={idx}
                      className={`epg-show-block ${isLiveShow ? 'is-current' : ''}`}
                      onClick={() => onSelectChannel(ch)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectChannel(ch);
                        }
                      }}
                      title={`${show.title} (${show.time})`}
                    >
                      <div className="epg-show-title-row">
                        <div className="epg-show-name">{show.title}</div>
                        {isLiveShow && (
                          <span className="live-badge">
                            Live
                          </span>
                        )}
                      </div>
                      <div className="epg-show-time">
                        <Clock size={11} aria-hidden="true" />
                        <span>{show.time} • {show.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
