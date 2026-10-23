import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Maximize, Minimize, PictureInPicture2, Radio, 
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
    } catch (e) {
      console.warn('PiP error:', e);
    }
  };

  // Skip Rewind/Forward 10s
  const handleSkip = (seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
  };

  // Keyboard controls within video player
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        handleSkip(10);
      } else if (e.key === 'ArrowLeft') {
        handleSkip(-10);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        onPrevChannel();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        onNextChannel();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPlaying, isMuted, volume]);

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
          muted={false}
          poster={channel.banner || "./extracted_resources/ic_launcher.webp"}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="center-play-overlay">
            <RefreshCw size={36} className="spin-icon" aria-label="Loading stream" />
          </div>
        )}

        {/* Stream Error Overlay */}
        {streamError && (
          <div className="center-play-overlay error-overlay">
            <div className="error-box">
              <AlertCircle size={40} className="error-icon" aria-hidden="true" />
              <h3>Live Broadcast Temporarily Unavailable</h3>
              <p className="error-desc">
                Reconnecting to JioTV streaming server…
              </p>
              <button 
                className="category-pill active" 
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
          <div className="center-play-overlay" onClick={togglePlay} role="button" aria-label="Play video">
            <div className="big-play-btn">
              <Play size={28} aria-hidden="true" />
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
              <div className="player-meta-badges">
                <span className="live-badge">
                  <span className="live-pulse" /> Live
                </span>
                {channel.isHd && <span className="hd-pill">HD 1080p</span>}
                <span className="player-ch-num">
                  CH {channel.number}
                </span>
              </div>
              <h3>{channel.name}: {channel.currentShow.title}</h3>
              <p>{channel.currentShow.time} • {channel.category} ({channel.language})</p>
            </div>
          </div>

          <div className="player-top-actions">
            {/* Quick Channel Zapper Button */}
            <button 
              className={`action-btn ${isZapperOpen ? 'active' : ''}`}
              onClick={onToggleZapper}
              title="Quick Channel Switcher (Z)"
              aria-label="Toggle Channel Zapper"
            >
              <Radio size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="player-controls-bar" style={{ opacity: showControls ? 1 : 0 }}>
          {/* Live Progress Scrubber */}
          <div 
            className="timeline-scrubber" 
            role="slider"
            aria-label="Playback timeline"
            aria-valuenow={channel.currentShow.progress || 60}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              if (videoRef.current && videoRef.current.duration) {
                videoRef.current.currentTime = clickPos * videoRef.current.duration;
              }
            }}
          >
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
              <button 
                className="ctrl-btn" 
                onClick={togglePlay} 
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              </button>

              <button 
                className="ctrl-btn" 
                onClick={onPrevChannel} 
                title="Previous Channel (Up Arrow)"
                aria-label="Previous Channel"
              >
                <SkipBack size={18} aria-hidden="true" />
              </button>

              <button 
                className="ctrl-btn" 
                onClick={onNextChannel} 
                title="Next Channel (Down Arrow)"
                aria-label="Next Channel"
              >
                <SkipForward size={18} aria-hidden="true" />
              </button>

              <button 
                className="ctrl-btn" 
                onClick={() => handleSkip(-10)} 
                title="Rewind 10 Seconds (Left Arrow)"
                aria-label="Rewind 10 Seconds"
              >
                <RotateCcw size={16} aria-hidden="true" />
              </button>

              <button 
                className="ctrl-btn" 
                onClick={() => handleSkip(10)} 
                title="Forward 10 Seconds (Right Arrow)"
                aria-label="Forward 10 Seconds"
              >
                <RotateCw size={16} aria-hidden="true" />
              </button>

              <div className="volume-container">
                <button 
                  className="ctrl-btn" 
                  onClick={toggleMute} 
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
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
                  aria-label="Volume slider"
                />
              </div>
            </div>

            {/* Right Controls: Quality, PiP, Fullscreen */}
            <div className="controls-right">
              {/* Quality Dropdown Selector */}
              <div style={{ position: 'relative' }}>
                <button 
                  className="quality-badge"
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  title="Select Stream Quality"
                  aria-label="Quality settings"
                >
                  {quality}
                </button>

                {showQualityMenu && (
                  <div className="quality-menu-popup">
                    {availableQualities.map((q) => (
                      <button
                        key={q}
                        className={`category-pill ${quality === q ? 'active' : ''}`}
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
              <button 
                className="ctrl-btn" 
                onClick={togglePiP} 
                title="Picture in Picture (P)"
                aria-label="Picture in picture"
              >
                <PictureInPicture2 size={17} aria-hidden="true" />
              </button>

              {/* Fullscreen Toggle */}
              <button 
                className="ctrl-btn" 
                onClick={toggleFullscreen} 
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize size={18} aria-hidden="true" /> : <Maximize size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
