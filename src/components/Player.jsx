import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, Volume1, VolumeX, 
  Maximize, Minimize, PictureInPicture2, Radio, 
  SkipBack, SkipForward, AlertCircle, RefreshCw
} from 'lucide-react';

export default function Player({ 
  channel, 
  userSession,
  onOpenLogin,
  onNextChannel, 
  onPrevChannel, 
  onToggleZapper,
  isZapperOpen,
  children
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('Auto');
  const [availableQualities, setAvailableQualities] = useState(['Auto', '1080p', '720p', '480p']);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiveEdge, setIsLiveEdge] = useState(true);

  // -------------------------------------------------------------
  // Fullscreen Detection & Cross-browser Listeners
  // -------------------------------------------------------------
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFs = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFs);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const isFs = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (!isFs) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setIsFullscreen(true));
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        setIsFullscreen(false);
      }
    }
  }, []);

  // -------------------------------------------------------------
  // Controls Auto-Hide Idle Timer (2.8s)
  // -------------------------------------------------------------
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Only auto-hide if video is actively playing and no dropdown is open
    if (isPlaying && !showQualityMenu && !isLoading && !streamError) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  }, [isPlaying, showQualityMenu, isLoading, streamError]);

  useEffect(() => {
    if (!isPlaying || showQualityMenu || isLoading || streamError) {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      resetControlsTimeout();
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, showQualityMenu, isLoading, streamError, resetControlsTimeout]);

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  // Close quality menu on outside interaction
  useEffect(() => {
    if (!showQualityMenu) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.quality-menu-container')) {
        setShowQualityMenu(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showQualityMenu]);

  // -------------------------------------------------------------
  // Initialize HLS Stream & Video
  // -------------------------------------------------------------
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
              if (data.details && (data.details.includes('key') || data.details.includes('decrypt') || data.details.includes('drm'))) {
                console.warn('DRM stream encountered; switching to backup preview stream.');
                hls.destroy();
                const fallbackHls = new Hls({ enableWorker: true, lowLatencyMode: true });
                hlsRef.current = fallbackHls;
                fallbackHls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
                fallbackHls.attachMedia(video);
                fallbackHls.on(Hls.Events.MANIFEST_PARSED, () => {
                  setIsLoading(false);
                  video.play().catch(() => setIsPlaying(false));
                });
                break;
              }
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

  // -------------------------------------------------------------
  // Video Playback Event Listeners (Timeupdate, Progress)
  // -------------------------------------------------------------
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(cur);
    if (dur && isFinite(dur)) {
      setDuration(dur);
      setIsLiveEdge(dur - cur < 8);
    } else {
      setIsLiveEdge(true);
    }
  };

  // -------------------------------------------------------------
  // Play / Pause & Single/Double Click Handling
  // -------------------------------------------------------------
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const handleVideoClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      toggleFullscreen();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
        togglePlay();
      }, 250);
    }
  };

  // -------------------------------------------------------------
  // Volume Controls
  // -------------------------------------------------------------
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setPrevVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted || volume === 0) {
      const restored = prevVolume || 0.8;
      videoRef.current.muted = false;
      videoRef.current.volume = restored;
      setVolume(restored);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // -------------------------------------------------------------
  // Jump to Live Edge
  // -------------------------------------------------------------
  const jumpToLive = () => {
    if (!videoRef.current) return;
    if (videoRef.current.seekable && videoRef.current.seekable.length > 0) {
      videoRef.current.currentTime = videoRef.current.seekable.end(videoRef.current.seekable.length - 1);
    } else if (duration && isFinite(duration)) {
      videoRef.current.currentTime = duration;
    }
    setIsLiveEdge(true);
  };

  // Skip Rewind/Forward 10s
  const handleSkip = (seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
    setIsLiveEdge(false);
  };

  // Picture in Picture
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

  // -------------------------------------------------------------
  // Global Keyboard Shortcuts for Player
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
        resetControlsTimeout();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
        resetControlsTimeout();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSkip(10);
        resetControlsTimeout();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSkip(-10);
        resetControlsTimeout();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        onPrevChannel();
        resetControlsTimeout();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        onNextChannel();
        resetControlsTimeout();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [togglePlay, toggleFullscreen, onPrevChannel, onNextChannel, resetControlsTimeout]);

  // Calculate timeline progress
  const progressPercent = duration && isFinite(duration)
    ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
    : (channel?.currentShow?.progress || 75);

  return (
    <div 
      className={`player-container ${isFullscreen ? 'is-fullscreen' : ''} ${!showControls && isFullscreen ? 'hide-cursor' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying && !showQualityMenu) setShowControls(false);
      }}
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
          onTimeUpdate={handleTimeUpdate}
          onClick={handleVideoClick}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="center-play-overlay" aria-live="polite">
            <RefreshCw size={36} className="spin-icon spin-animation" aria-label="Loading stream" />
          </div>
        )}

        {/* Stream Error Overlay */}
        {streamError && (
          <div className="center-play-overlay error-overlay" role="alert">
            <div className="error-box">
              <AlertCircle size={40} className="error-icon" aria-hidden="true" />
              <h3>Live Broadcast Temporarily Unavailable</h3>
              <p className="error-desc">
                Reconnecting to JioTV broadcast feed…
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

        {/* Center Play Button Overlay when Paused */}
        {!isPlaying && !isLoading && !streamError && (
          <div 
            className="center-play-overlay" 
            onClick={togglePlay} 
            role="button" 
            aria-label="Play video"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && togglePlay()}
          >
            <div className="big-play-btn">
              <Play size={28} aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Top Header Bar */}
        <div 
          className="player-top-bar" 
          style={{ 
            opacity: showControls ? 1 : 0, 
            pointerEvents: showControls ? 'auto' : 'none' 
          }}
        >
          <div className="player-channel-info">
            <img
              src={channel.logo}
              alt=""
              className="player-channel-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="player-title-text">
              <div className="player-meta-badges">
                <button 
                  className={`live-badge-btn ${isLiveEdge ? 'is-live' : 'is-delayed'}`}
                  onClick={jumpToLive}
                  title={isLiveEdge ? 'Streaming Live' : 'Click to jump to Live'}
                >
                  <span className="live-pulse" />
                  <span>{isLiveEdge ? 'Live' : 'Go to Live'}</span>
                </button>
                {channel.isHd && <span className="hd-pill">HD 1080p</span>}
                {channel.isJioLive && (
                  <span className="jio-feed-pill" title="Direct live stream from Jio network">
                    Official Feed
                  </span>
                )}
                {channel.isDRM && (
                  <span className="drm-pill" title="Protected broadcast feed with verified subscriber token">
                    DRM
                  </span>
                )}
                {!userSession && onOpenLogin && (
                  <button 
                    className="signin-feed-pill" 
                    onClick={onOpenLogin}
                    title="Sign in with your Jio mobile number for direct high-definition streams"
                  >
                    Sign In for HD Feed
                  </button>
                )}
                <span className="player-ch-num">
                  CH {channel.number}
                </span>
              </div>
              <h3>{channel.name}: {channel.currentShow.title}</h3>
              <p>{channel.currentShow.time} • {channel.category} ({channel.language})</p>
            </div>
          </div>

          <div className="player-top-actions">
            {/* Quick Channel Switcher Button */}
            <button 
              className={`action-btn ${isZapperOpen ? 'active' : ''}`}
              onClick={onToggleZapper}
              title="Quick Channel Switcher (Z)"
              aria-label="Toggle Channel Switcher"
            >
              <Radio size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div 
          className="player-controls-bar" 
          style={{ 
            opacity: showControls ? 1 : 0, 
            pointerEvents: showControls ? 'auto' : 'none' 
          }}
        >
          {/* Live Progress Scrubber */}
          <div 
            className="timeline-scrubber" 
            role="slider"
            aria-label="Playback timeline"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin="0"
            aria-valuemax="100"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              if (videoRef.current && duration && isFinite(duration)) {
                videoRef.current.currentTime = clickPos * duration;
                setIsLiveEdge(clickPos > 0.95);
              }
            }}
          >
            <div 
              className="timeline-progress" 
              style={{ width: `${progressPercent}%` }}
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
                  title={isMuted || volume === 0 ? 'Unmute (M)' : 'Mute (M)'}
                  aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={18} aria-hidden="true" />
                  ) : volume < 0.5 ? (
                    <Volume1 size={18} aria-hidden="true" />
                  ) : (
                    <Volume2 size={18} aria-hidden="true" />
                  )}
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
                  aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
                />
              </div>
            </div>

            {/* Right Controls: Quality, PiP, Fullscreen */}
            <div className="controls-right">
              {/* Quality Dropdown Selector */}
              <div className="quality-menu-container" style={{ position: 'relative' }}>
                <button 
                  className="quality-badge"
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  title="Select Stream Quality"
                  aria-label="Quality settings"
                  aria-expanded={showQualityMenu}
                >
                  {quality}
                </button>

                {showQualityMenu && (
                  <div className="quality-menu-popup" role="menu">
                    {availableQualities.map((q) => (
                      <button
                        key={q}
                        className={`quality-menu-item ${quality === q ? 'active' : ''}`}
                        role="menuitem"
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

        {/* Children Slots (e.g. ChannelZapper in Fullscreen) */}
        {children}
      </div>
    </div>
  );
}
