import { StreamingProvider } from './StreamingProvider.js';

export const AUTHORIZED_TEST_STREAMS = {
  hlsAdaptive: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  hlsLive: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  mp4Sample: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
};

/**
 * Provider supplying authorized public / local test streams
 */
export class AuthorizedSampleStreamProvider extends StreamingProvider {
  /**
   * @param {Object} [options]
   * @param {string} [options.customStreamUrl] - User-supplied authorized local or remote stream URL
   */
  constructor(options = {}) {
    super('authorized-sample-provider', 'Authorized Sample & Local Test Stream Provider');
    this._customStreamUrl = options.customStreamUrl || null;
  }

  setCustomStreamUrl(url) {
    this._customStreamUrl = url;
  }

  detectFormat(url) {
    if (!url || typeof url !== 'string') return 'unknown';
    const clean = url.split('?')[0].toLowerCase();
    if (clean.endsWith('.m3u8')) return 'hls';
    if (clean.endsWith('.mpd')) return 'dash';
    if (clean.endsWith('.mp4') || clean.endsWith('.m4v') || clean.endsWith('.webm')) return 'mp4';
    return 'hls'; // default stream container
  }

  async resolveStream(channel, session = null) {
    if (!channel) {
      return {
        success: false,
        errorCode: 'INVALID_CHANNEL',
        message: 'No channel was supplied for playback resolution.'
      };
    }

    // 1. If user supplied a custom authorized stream URL
    if (this._customStreamUrl) {
      return {
        success: true,
        streamUrl: this._customStreamUrl,
        format: this.detectFormat(this._customStreamUrl),
        isDrm: false,
        message: 'Resolved user-specified authorized test stream.'
      };
    }

    // 2. If channel object already has a verified public streamUrl
    if (channel.streamUrl && typeof channel.streamUrl === 'string') {
      const format = this.detectFormat(channel.streamUrl);
      return {
        success: true,
        streamUrl: channel.streamUrl,
        format: format,
        isDrm: false,
        message: `Resolved channel test stream (${channel.name}).`
      };
    }

    // 3. Fallback to reliable default test stream
    const defaultUrl = AUTHORIZED_TEST_STREAMS.hlsAdaptive;
    return {
      success: true,
      streamUrl: defaultUrl,
      format: 'hls',
      isDrm: false,
      message: 'Resolved default authorized HLS preview stream.'
    };
  }

  getCapabilities() {
    return {
      supportsHls: true,
      supportsDash: true,
      supportsDrm: false,
      supportedCodecs: ['avc1.4d401f', 'avc1.640028', 'mp4a.40.2']
    };
  }
}
