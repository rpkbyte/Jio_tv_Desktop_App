import React, { useState, useEffect } from 'react';
import { 
  X, Phone, CheckCircle2, ShieldCheck, AlertCircle, 
  LogOut, ArrowRight, RefreshCw, Lock, Info, Sliders 
} from 'lucide-react';
import { 
  getActiveAuthProvider, 
  setActiveAuthProvider,
  localDevProvider,
  unconfiguredProvider,
  getStoredSession, 
  isAuthenticated, 
  logout 
} from '../services/jioAuthService.js';

export default function LoginModal({ isOpen, onClose }) {
  const [provider, setProvider] = useState(getActiveAuthProvider);
  const [session, setSession] = useState(getStoredSession);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [testSubscriberId, setTestSubscriberId] = useState('DEV_SUB_10098');
  const [testMobile, setTestMobile] = useState('9876543210');

  useEffect(() => {
    if (isOpen) {
      setProvider(getActiveAuthProvider());
      setSession(getStoredSession());
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleAuthChange = () => {
      setSession(getStoredSession());
    };
    window.addEventListener('jiotv-auth-change', handleAuthChange);
    return () => window.removeEventListener('jiotv-auth-change', handleAuthChange);
  }, []);

  if (!isOpen) return null;

  const isUserAuthenticated = Boolean(session && (session.isAuthenticated || session.authToken || session.ssoToken));

  // Handle Local Dev Provider Sign In
  const handleDevLogin = async (e, options = {}) => {
    e?.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const result = await provider.login({
        subscriberId: testSubscriberId,
        mobile: testMobile,
        ...options
      });

      setIsLoading(false);

      if (result.success) {
        setSession(result.profile);
        setSuccessMsg(result.message);
      } else {
        setErrorMsg(result.message || 'Authentication failed.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Unexpected authentication fault: ' + err.message);
    }
  };

  const handleSwitchToDevProvider = () => {
    setActiveAuthProvider(localDevProvider);
    setProvider(localDevProvider);
    setErrorMsg('');
    setSuccessMsg('Switched to Authorized Local Testing Provider.');
  };

  const handleSwitchToUnconfigured = () => {
    setActiveAuthProvider(unconfiguredProvider);
    setProvider(unconfiguredProvider);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLogout = () => {
    logout();
    setSession(null);
    setErrorMsg('');
    setSuccessMsg('You have been signed out.');
  };

  const maskedNumber = session?.maskedMobile || (session?.mobile 
    ? `+91 ${session.mobile.slice(0, 2)}•••• ••${session.mobile.slice(-2)}`
    : '+91 98•••• ••10');

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="modal-card jio-login-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-brand">
            <span className="jio-brand-badge">Jio</span>
            <h3 id="login-modal-title" className="modal-title">
              {isUserAuthenticated 
                ? 'JioTV Subscriber Account' 
                : 'Authentication Provider'}
            </h3>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Login Dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Status / Alert Messages */}
        {errorMsg && (
          <div className="jio-alert jio-alert-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="jio-alert jio-alert-success" role="status">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* View 1: Authenticated Subscriber Profile */}
        {isUserAuthenticated && (
          <div className="jio-profile-content">
            <div className="jio-profile-badge-card">
              <div className="jio-profile-avatar">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div className="jio-profile-info">
                <div className="jio-profile-title-row">
                  <span className="jio-profile-name">{session.displayName || session.commonName || 'Jio Subscriber'}</span>
                  <span className="jio-active-pill">
                    <span className="jio-status-dot" aria-hidden="true" />
                    Active Session
                  </span>
                </div>
                <span className="jio-profile-mobile">{maskedNumber}</span>
                <span className="jio-profile-subid">Subscriber ID: {session.subscriberId}</span>
              </div>
            </div>

            <div className="jio-profile-meta-list">
              <div className="jio-meta-row">
                <span className="jio-meta-label">Provider</span>
                <span className="jio-meta-val">{provider.name}</span>
              </div>
              <div className="jio-meta-row">
                <span className="jio-meta-label">Credential Isolation</span>
                <span className="jio-meta-val">Protected (Zero Plaintext Storage)</span>
              </div>
              <div className="jio-meta-row">
                <span className="jio-meta-label">Subscription Tier</span>
                <span className="jio-meta-val">{session.tier || 'JioTV HD & Catch-up Unlimited'}</span>
              </div>
            </div>

            <div className="jio-profile-actions">
              <button
                type="button"
                className="jio-btn-danger"
                onClick={handleLogout}
              >
                <LogOut size={15} aria-hidden="true" />
                <span>Sign Out Account</span>
              </button>
              <button
                type="button"
                className="category-pill active"
                onClick={onClose}
              >
                Continue Watching
              </button>
            </div>
          </div>
        )}

        {/* View 2: Unconfigured Provider State (Compliant Policy View) */}
        {!isUserAuthenticated && !provider.isConfigured && (
          <div className="jio-auth-form">
            <div className="settings-status-row" style={{ marginTop: '4px', marginBottom: '16px' }}>
              <div className="status-row-left">
                <Lock size={18} className="status-icon" aria-hidden="true" />
                <div>
                  <div className="status-row-label">Official Authentication Gateway</div>
                  <div className="status-row-desc">Security Policy Status: Unconfigured</div>
                </div>
              </div>
              <span className="status-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                Access Required
              </span>
            </div>

            <p className="jio-auth-desc" style={{ lineHeight: '1.6' }}>
              Official JioTV desktop subscriber authentication requires an authorized OAuth 2.0 / OIDC identity 
              gateway or official client SDK with verified partner credentials. 
            </p>

            <div className="jio-alert" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd' }}>
              <Info size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              <span>
                To protect subscriber accounts, this app does not collect personal credentials, passwords, or SMS OTPs through uncertified forms.
              </span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="jio-btn-primary"
                onClick={handleSwitchToDevProvider}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sliders size={16} aria-hidden="true" />
                <span>Switch to Authorized Local Testing Provider</span>
              </button>
            </div>
          </div>
        )}

        {/* View 3: Authorized Local Testing Provider Mode */}
        {!isUserAuthenticated && provider.isConfigured && (
          <form onSubmit={handleDevLogin} className="jio-auth-form">
            <div className="settings-status-row" style={{ marginTop: '4px', marginBottom: '16px' }}>
              <div className="status-row-left">
                <ShieldCheck size={18} className="status-icon" style={{ color: '#4ade80' }} aria-hidden="true" />
                <div>
                  <div className="status-row-label">Authorized Local Testing Provider</div>
                  <div className="status-row-desc">Safe in-memory session testing</div>
                </div>
              </div>
              <span className="status-badge">
                Ready
              </span>
            </div>

            <div className="jio-input-group">
              <label htmlFor="test-sub-id" className="jio-input-label">
                Test Subscriber ID
              </label>
              <input
                id="test-sub-id"
                type="text"
                className="jio-otp-input"
                style={{ width: '100%', textAlign: 'left', padding: '10px 14px' }}
                value={testSubscriberId}
                onChange={(e) => setTestSubscriberId(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="jio-input-group">
              <label htmlFor="test-phone-input" className="jio-input-label">
                Masked Test Mobile
              </label>
              <div className="jio-phone-wrapper">
                <span className="jio-country-code">+91</span>
                <input
                  id="test-phone-input"
                  type="tel"
                  className="jio-phone-input"
                  maxLength={10}
                  value={testMobile}
                  onChange={(e) => setTestMobile(e.target.value.replace(/\D/g, ''))}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Test Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              <button
                type="submit"
                className="jio-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" aria-hidden="true" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In Test Subscriber</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  className="ctrl-btn"
                  style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid var(--border-default)', borderRadius: '8px' }}
                  onClick={(e) => handleDevLogin(e, { cancelled: true })}
                  disabled={isLoading}
                  title="Test how the app handles user cancellation"
                >
                  Test Cancellation
                </button>
                <button
                  type="button"
                  className="ctrl-btn"
                  style={{ width: '100%', height: '36px', fontSize: '12px', border: '1px solid var(--border-default)', borderRadius: '8px' }}
                  onClick={(e) => handleDevLogin(e, { simulateNetworkError: true })}
                  disabled={isLoading}
                  title="Test network failure error state"
                >
                  Test Network Fault
                </button>
              </div>

              <button
                type="button"
                className="btn-text"
                style={{ fontSize: '12px', marginTop: '4px' }}
                onClick={handleSwitchToUnconfigured}
              >
                ← Return to Official Gateway Status
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
