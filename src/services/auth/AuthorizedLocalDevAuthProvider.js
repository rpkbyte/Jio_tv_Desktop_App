import { AuthProvider } from './AuthProvider.js';

/**
 * Authorized Local Development / Testing Authentication Provider
 * 
 * Used for local integration testing, automated tests, and authorized development.
 * Never collects or transmits user credentials over insecure channels.
 * Maintains session in-memory and supports session lifecycle testing (login, cancel, expiry, logout).
 */
export class AuthorizedLocalDevAuthProvider extends AuthProvider {
  /**
   * @param {Object} [options]
   * @param {boolean} [options.enabled=true]
   * @param {Object} [options.initialSession=null]
   */
  constructor(options = {}) {
    super('local-dev-auth', 'Authorized Local Testing Provider');
    this._enabled = options.enabled ?? true;
    this._activeSession = options.initialSession || null;
    this._sessionListeners = new Set();
  }

  get isConfigured() {
    return this._enabled;
  }

  get configurationBlocker() {
    return this._enabled ? null : 'Local testing authentication provider is disabled.';
  }

  async initialize() {
    // If running in an Electron bridge context with secure storage, sync session
    if (typeof window !== 'undefined' && window.electronAPI?.getAuthProfile) {
      try {
        const secureProfile = await window.electronAPI.getAuthProfile();
        if (secureProfile) {
          this._activeSession = secureProfile;
        }
      } catch (e) {
        console.warn('[LocalDevAuth] Electron secure profile lookup failed:', e);
      }
    }
  }

  /**
   * Subscribe to session changes
   * @param {Function} callback
   */
  onSessionChange(callback) {
    this._sessionListeners.add(callback);
    return () => this._sessionListeners.delete(callback);
  }

  _notifyListeners() {
    for (const listener of this._sessionListeners) {
      try {
        listener(this._activeSession);
      } catch (err) {
        console.error('[LocalDevAuth] Listener notification error:', err);
      }
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jiotv-auth-change', { detail: this._activeSession }));
    }
  }

  async getSession() {
    if (!this._activeSession) return null;

    // Check expiry
    if (this._activeSession.expiresAt && Date.now() > this._activeSession.expiresAt) {
      this._activeSession = null;
      this._notifyListeners();
      return null;
    }

    return this._activeSession;
  }

  /**
   * Authenticate with authorized development parameters
   * @param {Object} [params]
   * @param {boolean} [params.cancelled=false] - Simulates user cancellation
   * @param {boolean} [params.simulateNetworkError=false] - Simulates network failure
   * @param {string} [params.subscriberId]
   * @param {string} [params.mobile]
   */
  async login(params = {}) {
    if (params.cancelled) {
      return {
        success: false,
        errorCode: 'USER_CANCELLED',
        message: 'Authentication was cancelled by the user.'
      };
    }

    if (params.simulateNetworkError) {
      return {
        success: false,
        errorCode: 'NETWORK_ERROR',
        message: 'Network connection failed during authentication handshake.'
      };
    }

    const testSubscriberId = params.subscriberId || 'DEV_SUB_10098';
    const rawMobile = params.mobile || '9876543210';
    const cleanMobile = rawMobile.replace(/\D/g, '').slice(-10);
    const maskedMobile = `+91 ${cleanMobile.slice(0, 2)}•••• ••${cleanMobile.slice(-2)}`;

    const profile = {
      subscriberId: testSubscriberId,
      displayName: 'Authorized Test Subscriber',
      maskedMobile: maskedMobile,
      tier: 'JioTV HD & 7-Day Catchup (Developer)',
      isAuthenticated: true,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };

    this._activeSession = profile;

    // If Electron main process secure store bridge is available, store in main
    if (typeof window !== 'undefined' && window.electronAPI?.saveSecureAuthProfile) {
      try {
        await window.electronAPI.saveSecureAuthProfile(profile);
      } catch (e) {
        console.warn('[LocalDevAuth] Failed to sync with Electron safeStorage:', e);
      }
    }

    this._notifyListeners();

    return {
      success: true,
      message: 'Authenticated successfully with authorized development provider.',
      profile
    };
  }

  async logout() {
    this._activeSession = null;
    if (typeof window !== 'undefined' && window.electronAPI?.clearSecureAuthProfile) {
      try {
        await window.electronAPI.clearSecureAuthProfile();
      } catch (e) {
        console.warn('[LocalDevAuth] Failed to clear Electron safeStorage:', e);
      }
    }
    this._notifyListeners();
  }
}
