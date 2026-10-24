// JioTV Official API Service (Hybrid Sync, CDN Metadata & Live 24-hr EPG)
// Backed by StreamingProvider abstraction
import { getStoredSession, getOrCreateDeviceId } from './jioAuthService.js';
import { AuthorizedSampleStreamProvider } from './streaming/AuthorizedSampleStreamProvider.js';
import { JioTVStreamProvider } from './streaming/JioTVStreamProvider.js';

export const authorizedSampleProvider = new AuthorizedSampleStreamProvider();
export const jioProductionProvider = new JioTVStreamProvider();

export const JIO_CATEGORY_MAP = {
  '10': 'Infotainment',
  '11': 'Devotional',
  '12': 'News',
  '13': 'Music',
  '14': 'Regional',
  '15': 'Devotional',
  '16': 'Business News',
  '17': 'Educational',
  '18': 'Lifestyle',
  '19': 'Devotional',
  '5': 'Entertainment',
  '6': 'Movies',
  '7': 'Kids',
  '8': 'Sports',
  '9': 'Lifestyle'
};

export const JIO_LANGUAGE_MAP = {
  '1': 'Hindi',
  '2': 'Marathi',
  '3': 'Punjabi',
  '4': 'Urdu',
  '5': 'Bengali',
  '6': 'English',
  '7': 'Malayalam',
  '8': 'Tamil',
  '9': 'Gujarati',
  '10': 'Odia',
  '11': 'Telugu',
  '12': 'Bhojpuri',
  '13': 'Kannada',
  '14': 'Assamese',
  '15': 'Nepali',
  '16': 'English'
};

const CDN_BASE_DATA = 'https://jiotv.data.cdn.jio.com';
const CDN_BASE_IMAGES = 'https://jiotvimages.cdn.jio.com';
const CDN_BASE_EPG = 'https://jiotvapi.cdn.jio.com';

const STORAGE_KEY_CHANNELS = 'jiotv_dynamic_channel_cache';
const STORAGE_KEY_TIMESTAMP = 'jiotv_dynamic_channel_ts';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Reliable test fallback streams for browser playback
const FALLBACK_STREAMS = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  'https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

/**
 * Format epoch milliseconds to 12-hour AM/PM string
 */
export function formatTimeFromEpoch(epoch) {
  if (!epoch) return '';
  const date = new Date(Number(epoch));
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Normalize a raw JioTV API channel object to the application channel schema
 */
export function normalizeJioChannel(rawChannel, index = 0) {
  const cid = rawChannel.channel_id;
  const cname = rawChannel.channel_name || `Channel ${cid}`;
  const cat = JIO_CATEGORY_MAP[String(rawChannel.channelCategoryId)] || 'Entertainment';
  const lang = JIO_LANGUAGE_MAP[String(rawChannel.channelLanguageId)] || 'Hindi';
  const isHd = Boolean(rawChannel.isHD);
  const number = rawChannel.stbChannelNumber || cid;
  const logoFile = rawChannel.logoUrl || '';
  const logoUrl = logoFile ? `${CDN_BASE_IMAGES}/dare_images/images/${logoFile}` : '';

  return {
    id: `ch-${cid}`,
    channelId: cid,
    name: cname,
    number: number,
    category: cat,
    language: lang,
    isHd: isHd,
    logo: logoUrl,
    banner: rawChannel.banner || `https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80`,
    currentShow: {
      title: `${cname} Live`,
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: cat,
      progress: 50,
      description: `Official live high-definition broadcast of ${cname} on JioTV.`
    },
    nextShow: {
      title: `${cname} Prime Telecast`,
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: FALLBACK_STREAMS[index % FALLBACK_STREAMS.length],
    catchupDays: 7
  };
}

/**
 * Fetch the full 1,000+ channel catalog from JioTV CDN
 */
export async function fetchAllJioChannels() {
  const url = `${CDN_BASE_DATA}/apis/v3.1/getMobileChannelList/get/?os=android&devicetype=phone&usertype=tvYR7NSNn7rymo3F`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Channel list API failed with status ${response.status}`);
    }

    const data = await response.json();
    const rawList = data.result || [];
    const normalized = rawList.map((ch, idx) => normalizeJioChannel(ch, idx));

    // Cache in localStorage
    try {
      localStorage.setItem(STORAGE_KEY_CHANNELS, JSON.stringify(normalized));
      localStorage.setItem(STORAGE_KEY_TIMESTAMP, String(Date.now()));
    } catch {
      // localStorage quota exceeded fallback; ignore silently
    }

    return normalized;
  } catch (err) {
    console.warn('JioTV channel fetch warning (using cache or bundle fallback):', err);
    // Try reading cached version
    try {
      const cached = localStorage.getItem(STORAGE_KEY_CHANNELS);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // fallback
    }
    return null;
  }
}

/**
 * Fetch live 24-hr EPG schedule for a specific channel
 */
export async function fetchChannelLiveEpg(channelId, offsetDays = 0) {
  if (!channelId) return null;
  const numId = String(channelId).replace('ch-', '');
  const url = `${CDN_BASE_EPG}/apis/v1.3/getepg/get?offset=${offsetDays}&channel_id=${numId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`EPG API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const epgItems = data.epg || [];
    if (!epgItems.length) return null;

    const now = Date.now();
    let currentItem = null;
    let nextItem = null;

    // Find current active show based on startEpoch and endEpoch
    for (let i = 0; i < epgItems.length; i++) {
      const item = epgItems[i];
      const start = Number(item.startEpoch);
      const end = Number(item.endEpoch);

      if (now >= start && now <= end) {
        currentItem = item;
        nextItem = epgItems[i + 1] || null;
        break;
      }
    }

    // If offset is not today or current not found, fallback to first item
    if (!currentItem && epgItems.length > 0) {
      currentItem = epgItems[0];
      nextItem = epgItems[1] || null;
    }

    let progress = 50;
    if (currentItem && currentItem.startEpoch && currentItem.endEpoch) {
      const start = Number(currentItem.startEpoch);
      const end = Number(currentItem.endEpoch);
      const duration = end - start;
      if (duration > 0) {
        progress = Math.min(100, Math.max(0, Math.round(((now - start) / duration) * 100)));
      }
    }

    const posterUrl = currentItem?.episodePoster 
      ? `${CDN_BASE_IMAGES}/dare_images/shows/${currentItem.episodePoster}`
      : null;

    return {
      currentShow: currentItem ? {
        title: currentItem.showname || 'Live Show',
        time: `${formatTimeFromEpoch(currentItem.startEpoch)} - ${formatTimeFromEpoch(currentItem.endEpoch)}`,
        duration: currentItem.duration || '60 mins',
        genre: Array.isArray(currentItem.showGenre) ? currentItem.showGenre.join(' / ') : (currentItem.showGenre || 'Entertainment'),
        progress: progress,
        description: currentItem.episode_desc || currentItem.description || 'Live broadcast.',
        poster: posterUrl
      } : null,
      nextShow: nextItem ? {
        title: nextItem.showname || 'Next Broadcast',
        time: `${formatTimeFromEpoch(nextItem.startEpoch)} - ${formatTimeFromEpoch(nextItem.endEpoch)}`
      } : null,
      epgList: epgItems.map((item) => ({
        id: item.srno || item.showId,
        title: item.showname,
        time: `${formatTimeFromEpoch(item.startEpoch)} - ${formatTimeFromEpoch(item.endEpoch)}`,
        category: Array.isArray(item.showGenre) ? item.showGenre[0] : (item.showGenre || 'General'),
        description: item.episode_desc || item.description || '',
        startEpoch: item.startEpoch,
        endEpoch: item.endEpoch,
        poster: item.episodePoster ? `${CDN_BASE_IMAGES}/dare_images/shows/${item.episodePoster}` : null
      }))
    };
  } catch (err) {
    console.warn(`EPG fetch failed for channel ${channelId}:`, err);
    return null;
  }
}

/**
 * Silent Background Synchronizer
 * Pre-bundled channels render at 0ms. Then after 800ms, background sync revalidates.
 */
export function initBackgroundSync(onUpdateCallback) {
  // Check if we have freshly cached data
  try {
    const cached = localStorage.getItem(STORAGE_KEY_CHANNELS);
    const ts = Number(localStorage.getItem(STORAGE_KEY_TIMESTAMP) || 0);
    const isFresh = Date.now() - ts < CACHE_TTL_MS;

    if (cached && isFresh) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onUpdateCallback(parsed);
        return;
      }
    }
  } catch {
    // Ignore cache error
  }

  // Defer API sync by 800ms so initial render is completely zero-latency
  setTimeout(async () => {
    try {
      const freshChannels = await fetchAllJioChannels();
      if (freshChannels && freshChannels.length > 0) {
        onUpdateCallback(freshChannels);
      }
    } catch (e) {
      console.warn('Background sync warning:', e);
    }
  }, 800);
}

/**
 * Request real official live playback URL for a channel from JioTV Playback API
 * Reverse engineered from classes8.dex: PostLoginNewSystemApiInterface.getPlaybackURL & ChannelUrlModel
 * @param {string|number} channelId - e.g. "ch-144" or 144
 * @param {object} [providedSession] - Optional stored subscriber session
 */
export async function fetchChannelStreamUrl(channelId, providedSession = null) {
  if (!channelId) {
    return { success: false, reason: 'invalid_channel', message: 'Channel ID missing.' };
  }

  const session = providedSession || getStoredSession();
  const token = session?.authToken || session?.ssoToken;
  if (!token || token === 'valid_sso_session' || token.length < 20) {
    return { 
      success: false, 
      reason: 'unauthenticated', 
      message: 'Sign in with your Jio mobile number to access direct live streams.' 
    };
  }

  // Jio geturl strictly validates accesstoken as a 3-part JWT (header.payload.signature)
  const rawAccessToken = (session?.authToken && session.authToken.length > 20) ? session.authToken : token;
  if (typeof rawAccessToken !== 'string' || rawAccessToken.split('.').length !== 3) {
    return {
      success: false,
      reason: 'invalid_token',
      message: 'Subscriber token format is invalid. Please sign out and sign in again.'
    };
  }

  const cleanCid = String(channelId).replace('ch-', '');
  const deviceId = session?.deviceId || getOrCreateDeviceId();
  const endpoint = '/api/jio-user/playback/apis/v1.1/geturl';

  // Form URL encoded payload as required by JioTV getPlaybackURL API
  const formData = new URLSearchParams();
  formData.append('stream_type', 'LIVE');
  formData.append('channel_id', cleanCid);
  formData.append('programId', '');
  formData.append('showtime', '');
  formData.append('srno', '');
  formData.append('begin', '');
  formData.append('end', '');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'appkey': 'NzNiMDhlYzQyNjJm',
        'appName': 'RJIL_JioTV',
        'devicetype': 'phone',
        'os': 'android',
        'deviceId': deviceId,
        'isott': 'false',
        'accesstoken': rawAccessToken,
        'ssoToken': session?.ssoToken || rawAccessToken,
        'ssotoken': session?.ssoToken || rawAccessToken,
        'lbcookie': session?.lbCookie || '1'
      },
      body: formData.toString()
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 419) {
      return {
        success: false,
        reason: 'token_expired',
        message: 'Your JioTV subscriber session has expired. Please log in again.'
      };
    }

    if (!response.ok || data.code === 400 || data.code === 401 || data.code === 403) {
      return {
        success: false,
        reason: 'api_error',
        message: data.message || `Playback request returned status ${response.status}.`
      };
    }

    const liveUrl = data.result || data.url || data.playbackUrl;
    if (!liveUrl) {
      return {
        success: false,
        reason: 'no_stream',
        message: data.message || 'No stream available for this channel.'
      };
    }

    const isDrm = Boolean(data.isDRM);
    // Route through streaming proxy for User-Agent spoofing and CORS handling
    const proxiedStreamUrl = liveUrl.startsWith('http') 
      ? `/api/jio-stream/${liveUrl}` 
      : liveUrl;

    return {
      success: true,
      streamUrl: proxiedStreamUrl,
      rawUrl: liveUrl,
      isDRM: isDrm,
      playbackToken: data.playbackToken || null,
      bitrates: data.bitrates || [],
      message: 'Official Jio live stream resolved successfully.'
    };
  } catch (err) {
    console.warn(`Error resolving stream URL for channel ${channelId}:`, err);
    return {
      success: false,
      reason: 'network_error',
      message: 'Network error connecting to Jio playback service.'
    };
  }
}

