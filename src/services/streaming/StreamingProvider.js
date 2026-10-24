/**
 * Streaming Provider Interface & Playback Contracts
 * Defines stream resolution, format detection, and playback capability contracts.
 */

/**
 * @typedef {Object} StreamResolutionResult
 * @property {boolean} success - Whether stream resolution succeeded
 * @property {string} [streamUrl] - Playback URL (HLS / DASH / MP4)
 * @property {'hls'|'dash'|'mp4'|'unknown'} [format] - Stream format type
 * @property {boolean} [isDrm] - Whether playback requires DRM decryption
 * @property {string} [drmScheme] - e.g. 'widevine' | 'fairplay' | 'clearkey'
 * @property {string} [licenseServerUrl] - DRM licensing server endpoint
 * @property {string} [message] - Description or reason
 * @property {string} [errorCode] - Error code on failure
 */

/**
 * @typedef {Object} PlaybackCapabilities
 * @property {boolean} supportsHls - HLS stream support
 * @property {boolean} supportsDash - DASH stream support
 * @property {boolean} supportsDrm - Widevine or hardware DRM support
 * @property {string[]} supportedCodecs - List of verified codecs (e.g. ['avc1.4d401f', 'mp4a.40.2'])
 */

/**
 * Abstract Streaming Provider base class
 */
export class StreamingProvider {
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    if (new.target === StreamingProvider) {
      throw new TypeError('Cannot construct StreamingProvider instances directly');
    }
    this.id = id;
    this.name = name;
  }

  /**
   * Resolve an authorized playback stream for a channel
   * @param {Object} channel
   * @param {Object} [session]
   * @returns {Promise<StreamResolutionResult>}
   */
  async resolveStream(channel, session = null) {
    throw new Error('resolveStream() must be implemented by subclass');
  }

  /**
   * Return playback capabilities of this provider
   * @returns {PlaybackCapabilities}
   */
  getCapabilities() {
    return {
      supportsHls: true,
      supportsDash: false,
      supportsDrm: false,
      supportedCodecs: ['avc1.42e01e', 'mp4a.40.2']
    };
  }
}
