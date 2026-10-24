/**
 * Authentication Provider Interface & Data Contracts
 * Defines standard contracts for authorized subscriber authentication.
 */

/**
 * @typedef {Object} PublicSubscriberProfile
 * @property {string} subscriberId - Anonymized/masked subscriber identifier
 * @property {string} [displayName] - Public display name (e.g. "Jio Subscriber")
 * @property {string} [maskedMobile] - Masked phone number (e.g. "+91 98•••• ••10")
 * @property {string} [tier] - Broadcast subscription tier
 * @property {boolean} isAuthenticated - Whether the subscriber session is active
 * @property {number} [issuedAt] - Session start epoch timestamp
 * @property {number} [expiresAt] - Session expiry epoch timestamp
 */

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success - Operation success status
 * @property {string} message - Human-readable explanation
 * @property {string} [errorCode] - Error code if failed
 * @property {PublicSubscriberProfile} [profile] - Public profile if authenticated
 */

/**
 * Abstract base class for authentication providers.
 */
export class AuthProvider {
  /**
   * @param {string} id - Unique identifier for provider
   * @param {string} name - Human-readable name
   */
  constructor(id, name) {
    if (new.target === AuthProvider) {
      throw new TypeError('Cannot construct AuthProvider instances directly');
    }
    this.id = id;
    this.name = name;
  }

  /**
   * Check if provider has active and valid configuration
   * @returns {boolean}
   */
  get isConfigured() {
    return false;
  }

  /**
   * Explanation if provider is unconfigured or blocked
   * @returns {string|null}
   */
  get configurationBlocker() {
    return null;
  }

  /**
   * Initialize provider state
   * @returns {Promise<void>}
   */
  async initialize() {
    // Subclasses may implement
  }

  /**
   * Get current public subscriber session
   * @returns {Promise<PublicSubscriberProfile|null>}
   */
  async getSession() {
    throw new Error('getSession() must be implemented by subclass');
  }

  /**
   * Authenticate using an authorized flow
   * @param {Record<string, unknown>} [params]
   * @returns {Promise<AuthResult>}
   */
  async login(params = {}) {
    throw new Error('login() must be implemented by subclass');
  }

  /**
   * End the current subscriber session
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('logout() must be implemented by subclass');
  }
}
