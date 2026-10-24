import { AuthProvider } from './AuthProvider.js';

/**
 * Unconfigured JioTV Desktop Authentication Provider
 * 
 * Complies with application security and third-party API terms:
 * - JioTV does not provide a public, documented OAuth/OIDC client for third-party desktop apps.
 * - Collecting Jio mobile credentials and OTPs via unauthorized forms violates platform policies.
 * - Therefore, this provider explicitly reports itself as unconfigured, explains the blocker,
 *   and refuses to fabricate logins or extract private session credentials.
 */
export class UnconfiguredJioAuthProvider extends AuthProvider {
  constructor() {
    super('jiotv-official', 'Official JioTV Authentication Gateway');
  }

  get isConfigured() {
    return false;
  }

  get configurationBlocker() {
    return (
      'Official JioTV desktop subscriber authentication requires an authorized OAuth 2.0 / OIDC ' +
      'identity provider or an official desktop SDK with verified client certificates. ' +
      'Third-party credential collection (OTP/password scraping) is disabled for subscriber safety ' +
      'and regulatory compliance.'
    );
  }

  async initialize() {
    // Provider is unconfigured by design
  }

  async getSession() {
    return null;
  }

  async login() {
    return {
      success: false,
      errorCode: 'PROVIDER_UNCONFIGURED',
      message: this.configurationBlocker
    };
  }

  async logout() {
    // No-op for unconfigured provider
  }
}
