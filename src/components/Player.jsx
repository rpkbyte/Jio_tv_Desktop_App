import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Maximize, Minimize, PictureInPicture2, Radio, ListMusic, 
  SkipBack, SkipForward, AlertCircle, RefreshCw
} from 'lucide-react';

export default function Player({ 
  channel, 
  onNextChannel, 
  onPrevChannel, 
  onToggleZapper,
  isZapperOpen 
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('Auto');
  const [availableQualities, setAvailableQualities] = useState(['Auto', '1080p', '720p', '480p']);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize HLS Stream
  useEffect(() => {
    if (!channel || !videoRef.current) return;

    setStreamError(false);
    setIsLoading(true);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    const streamUrl = channel.streamUrl;

    if (Hls.isSupported() && streamUrl.includes('.m3u8')) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
        
        if (data.levels && data.levels.length > 0) {
          const levels = ['Auto', ...data.levels.map(l => `${l.height}p`)];
          setAvailableQualities([...new Set(levels)]);
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setStreamError(true);
              setIsLoading(false);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });
    } else {
      // Standard video format fallback
      video.src = streamUrl;
      setIsLoading(false);
      video.play().catch(() => setIsPlaying(false));
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Handle Volume
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Handle PiP
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error('PiP Error:', err);
    }
  };

  // Skip Rewind / Fast Forward 10s
  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div 
      className="player-container" 
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          playsInline
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="center-play-overlay">
            <RefreshCw size={44} className="spin-animation" style={{ color: 'var(--jio-red)' }} />
          </div>
        )}

        {/* Stream Error Overlay */}
        {streamError && (
          <div className="center-play-overlay" style={{ background: 'rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <AlertCircle size={48} style={{ color: 'var(--jio-red)', marginBottom: '12px' }} />
              <h3>Live Broadcast Temporarily Unavailable</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
                Reconnecting to JioTV streaming server...
              </p>
              <button 
                className="category-pill active" 
                style={{ marginTop: '14px' }}
                onClick={() => {
                  setStreamError(false);
                  setIsLoading(true);
                  if (videoRef.current) videoRef.current.load();
                }}
              >
                Retry Stream
              </button>
            </div>
          </div>
        )}

        {/* Center Play Overlay when Paused */}
        {!isPlaying && !isLoading && !streamError && (
          <div className="center-play-overlay" onClick={togglePlay}>
            <div className="big-play-btn">
              <Play size={34} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
            </div>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="player-top-bar" style={{ opacity: showControls ? 1 : 0 }}>
          <div className="player-channel-info">
            <img
              src={channel.logo}
              alt={channel.name}
              className="player-channel-logo"
            />
            <div className="player-title-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-badge">
                  <span className="live-pulse" /> Live
                </span>
                {channel.isHd && <span className="hd-pill">HD 1080p</span>}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  CH {channel.number}
                </span>
              </div>
              <h3>{channel.name} — {channel.currentShow.title}</h3>
              <p>{channel.currentShow.time} • {channel.category} ({channel.language})</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quick Channel Zapper Button */}
            <button 
              className={`action-btn ${isZapperOpen ? 'active' : ''}`}
              onClick={onToggleZapper}
              title="Quick Channel Switcher"
            >
              <Radio size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="player-controls-bar" style={{ opacity: showControls ? 1 : 0 }}>
          {/* Live Progress / Scrubber */}
          <div className="timeline-scrubber" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = clickPos * videoRef.current.duration;
            }
          }}>
            <div 
              className="timeline-progress" 
              style={{ width: `${channel.currentShow.progress || 60}%` }}
            >
              <div className="timeline-thumb" />
            </div>
          </div>

          <div className="controls-row">
            {/* Left Controls: Play, Prev/Next Channel, Rewind/Forward, Volume */}
            <div className="controls-left">
              <button className="ctrl-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button className="ctrl-btn" onClick={onPrevChannel} title="Previous Channel">
                <SkipBack size={19} />
              </button>

              <button className="ctrl-btn" onClick={onNextChannel} title="Next Channel">
                <SkipForward size={19} />
              </button>

              <button className="ctrl-btn" onClick={() => handleSkip(-10)} title="Rewind 10 Seconds">
                <RotateCcw size={17} />
              </button>

              <button className="ctrl-btn" onClick={() => handleSkip(10)} title="Forward 10 Seconds">
                <RotateCw size={17} />
              </button>

              <div className="volume-container">
                <button className="ctrl-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted || volume === 0 ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </div>
            </div>

            {/* Right Controls: Quality, PiP, Fullscreen */}
            <div className="controls-right">
              {/* Quality Dropdown Selector */}
              <div style={{ position: 'relative' }}>
                <div 
                  className="quality-badge"
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  title="Video Quality"
                >
                  {quality}
                </div>

                {showQualityMenu && (
                  <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: 0,
                    background: 'var(--bg-sidebar)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 20,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
                  }}>
                    {availableQualities.map((q) => (
                      <button
                        key={q}
                        className={`category-pill ${quality === q ? 'active' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '0.75rem', textAlign: 'left' }}
                        onClick={() => {
                          setQuality(q);
                          setShowQualityMenu(false);
                          if (hlsRef.current && q !== 'Auto') {
                            const levelIndex = hlsRef.current.levels.findIndex(l => `${l.height}p` === q);
                            if (levelIndex !== -1) hlsRef.current.currentLevel = levelIndex;
                          } else if (hlsRef.current) {
                            hlsRef.current.currentLevel = -1; // Auto
                          }
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture in Picture */}
              <button className="ctrl-btn" onClick={togglePiP} title="Picture in Picture">
                <PictureInPicture2 size={18} />
              </button>

              {/* Fullscreen Toggle */}
              <button className="ctrl-btn" onClick={toggleFullscreen} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                {isFullscreen ? <Minimize size={19} /> : <Maximize size={19} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
