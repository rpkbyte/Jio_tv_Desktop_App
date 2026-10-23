// JioTV Official Authentication & Subscriber Session Service
// Reverse engineered from JioTV DEX bytecode (classes6.dex & classes8.dex)

const STORAGE_SESSION_KEY = 'jiotv_user_session';
const STORAGE_DEVICE_KEY = 'jiotv_device_id';

// Base URL: In local dev & desktop runner, routed via proxy to avoid browser CORS
const isLocalEnv = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.protocol === 'http:'
);

const AUTH_BASE_URL = isLocalEnv ? '/api/jio-user' : 'https://jiotvapi.media.jio.com';

const APP_KEY = 'NzNiMDhlYzQyNjJm';
const APP_NAME = 'RJIL_JioTV';

/**
 * Generate or retrieve a persistent client device identifier
 */
export function getOrCreateDeviceId() {
  try {
    let id = localStorage.getItem(STORAGE_DEVICE_KEY);
    if (!id) {
      id = 'jio_dt_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(16);
      localStorage.setItem(STORAGE_DEVICE_KEY, id);
    }
    return id;
  } catch {
    return 'jio_dt_fallback_device_101';
  }
}

/**
 * Get current stored session from localStorage
 */
export function getStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && (session.ssoToken || session.authToken || session.mobile)) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if a legitimate Jio subscriber is logged in
 */
export function isAuthenticated() {
  const session = getStoredSession();
  return Boolean(session && (session.ssoToken || session.authToken || session.mobile));
}

/**
 * Save authenticated session to localStorage
 */
export function saveSession(sessionData) {
  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({
      ...sessionData,
      storedAt: Date.now()
    }));
    window.dispatchEvent(new Event('jiotv-auth-change'));
    return true;
  } catch (e) {
    console.error('Failed to store JioTV session:', e);
    return false;
  }
}

/**
 * Clear session and log out
 */
export function logout() {
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    window.dispatchEvent(new Event('jiotv-auth-change'));
    return true;
  } catch {
    return false;
  }
}

/**
 * Send OTP to the user's Jio mobile number
 * Verified: Jio API requires Base64 encoded "+91" + 10-digit mobile number
 * @param {string} rawMobile - 10-digit Indian mobile number
 */
export async function sendLoginOtp(rawMobile) {
  const cleanMobile = String(rawMobile).replace(/\D/g, '').slice(-10);
  if (cleanMobile.length !== 10) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit Jio mobile number.'
    };
  }

  const endpoint = `${AUTH_BASE_URL}/userservice/apis/v1/loginotp/send`;
  // Encode "+91" + cleanMobile into Base64 (Required by Jio API)
  const base64Number = btoa(`+91${cleanMobile}`);
  const deviceId = getOrCreateDeviceId();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'appkey': APP_KEY,
        'appName': APP_NAME,
        'devicetype': 'phone',
        'os': 'android',
        'deviceId': deviceId,
        'lbcookie': '1',
        'isott': 'false'
      },
      body: JSON.stringify({
        number: base64Number
      })
    });

    // Jio returns HTTP 204 No Content on successful OTP dispatch
    if (response.status === 204 || response.ok) {
      return {
        success: true,
        message: 'OTP has been dispatched to your Jio mobile number.',
        mobile: cleanMobile
      };
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: false,
      message: data.message || `Unable to send OTP (Code ${response.status}). Please check your Jio number.`
    };
  } catch (err) {
    console.warn('Network error calling sendLoginOtp:', err);
    return {
      success: false,
      message: 'Network error communicating with Jio auth gateway. Please check your connection.'
    };
  }
}

/**
 * Verify OTP entered by user and obtain subscriber tokens
 * @param {string} rawMobile - 10-digit Indian mobile number
 * @param {string} otp - 6-digit OTP code received via SMS
 */
export async function verifyLoginOtp(rawMobile, otp) {
  const cleanMobile = String(rawMobile).replace(/\D/g, '').slice(-10);
  const cleanOtp = String(otp).trim();

  if (cleanMobile.length !== 10) {
    return { success: false, message: 'Invalid mobile number.' };
  }
  if (!cleanOtp || cleanOtp.length < 4) {
    return { success: false, message: 'Please enter a valid OTP code.' };
  }

  const endpoint = `${AUTH_BASE_URL}/userservice/apis/v2/loginotp/verify`;
  const deviceId = getOrCreateDeviceId();
  // Base64 encoded "+91" + mobile number
  const base64Number = btoa(`+91${cleanMobile}`);

  const payload = {
    number: base64Number,
    otp: cleanOtp,
    deviceInfo: {
      consumptionDeviceName: 'JioTV Desktop Client',
      info: {
        type: 'android',
        platform: {
          name: 'jiotv'
        },
        androidId: deviceId
      }
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'appkey': APP_KEY,
        'appName': APP_NAME,
        'devicetype': 'phone',
        'os': 'android',
        'deviceId': deviceId,
        'lbcookie': '1',
        'isott': 'false'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && (data.ssoToken || data.authToken || data.sessionAttributes)) {
      const userObj = data.sessionAttributes?.user || {};
      const session = {
        mobile: cleanMobile,
        ssoToken: data.ssoToken || '',
        authToken: data.authToken || '',
        jToken: data.jToken || '',
        refreshToken: data.refreshToken || '',
        lbCookie: data.lbCookie || '',
        subscriberId: userObj.subscriberId || `SUB_${cleanMobile}`,
        commonName: userObj.commonName || `Jio Subscriber`,
        isVerified: true
      };

      saveSession(session);
      return {
        success: true,
        message: 'Successfully authenticated with JioTV!',
        session: session
      };
    } else {
      return {
        success: false,
        message: data.message || 'Invalid OTP code. Please re-check and try again.'
      };
    }
  } catch (err) {
    console.warn('Network error in verifyLoginOtp:', err);
    return {
      success: false,
      message: 'Network verification failed. Please verify your connection.'
    };
  }
}
