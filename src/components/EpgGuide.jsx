import React, { useState } from 'react';
import { Calendar, Clock, Play, History, CheckCircle } from 'lucide-react';
import { generateCatchupSchedule } from '../data/channels';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Catch-up Date Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={20} style={{ color: 'var(--jio-red)' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {selectedDayOffset === 0 ? 'Interactive TV Guide (EPG)' : `Catch-up Schedule (${days[selectedDayOffset].label})`}
          </h2>
        </div>

        {/* 7-Day Date Selector Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px' }}>
          {days.map((d) => (
            <button
              key={d.offset}
              className={`category-pill ${selectedDayOffset === d.offset ? 'active' : ''}`}
              onClick={() => setSelectedDayOffset(d.offset)}
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
            <div className="timeline-slot-header" style={{ color: 'var(--jio-red)', fontWeight: 700 }}>
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
              <div 
                className="epg-channel-badge"
                onClick={() => onSelectChannel(ch)}
                title="Click to play channel"
              >
                <img
                  src={ch.logo}
                  alt={ch.name}
                  style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-white)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {ch.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    CH {ch.number} • {ch.language}
                  </div>
                </div>
              </div>

              {/* Show Slots Track */}
              <div className="epg-shows-track">
                {schedule.map((show, idx) => {
                  const isLiveShow = selectedDayOffset === 0 && show.title === ch.currentShow.title;

                  return (
                    <div
                      key={idx}
                      className={`epg-show-block ${isLiveShow ? 'is-current' : ''}`}
                      onClick={() => onSelectChannel(ch)}
                      title={`${show.title} (${show.time}) - Click to Watch`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                        <div className="epg-show-name">{show.title}</div>
                        {isLiveShow && (
                          <span className="live-badge" style={{ padding: '1px 5px', fontSize: '0.62rem' }}>
                            Live
                          </span>
                        )}
                      </div>
                      <div className="epg-show-time">
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {show.time} • {show.category}
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
