import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, KeyRound, CheckCircle2, ShieldCheck, AlertCircle, LogOut, ArrowRight, RefreshCw } from 'lucide-react';
import { 
  getStoredSession, 
  isAuthenticated, 
  sendLoginOtp, 
  verifyLoginOtp, 
  logout 
} from '../services/jioAuthService.js';

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'profile'
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [session, setSession] = useState(getStoredSession);

  const phoneInputRef = useRef(null);
  const otpInputRef = useRef(null);

  // Sync session state whenever modal opens or storage changes
  useEffect(() => {
    if (isOpen) {
      const current = getStoredSession();
      setSession(current);
      if (current && (current.ssoToken || current.mobile)) {
        setStep('profile');
      } else {
        setStep('phone');
        setErrorMsg('');
        setSuccessMsg('');
      }
    }
  }, [isOpen]);

  // Handle countdown timer for Resend OTP
  useEffect(() => {
    let timer = null;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Autofocus input on step changes
  useEffect(() => {
    if (!isOpen) return;
    if (step === 'phone') {
      setTimeout(() => phoneInputRef.current?.focus(), 80);
    } else if (step === 'otp') {
      setTimeout(() => otpInputRef.current?.focus(), 80);
    }
  }, [step, isOpen]);

  if (!isOpen) return null;

  // Handle phone submission & OTP request
  const handleRequestOtp = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanNum = mobileNumber.replace(/\D/g, '');
    if (cleanNum.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Jio mobile number.');
      return;
    }

    setIsLoading(true);
    const result = await sendLoginOtp(cleanNum);
    setIsLoading(false);

    if (result.success) {
      setStep('otp');
      setResendTimer(30);
      setSuccessMsg(result.message);
    } else {
      setErrorMsg(result.message);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (otp.trim().length < 4) {
      setErrorMsg('Please enter the verification code received via SMS.');
      return;
    }

    setIsLoading(true);
    const result = await verifyLoginOtp(mobileNumber, otp);
    setIsLoading(false);

    if (result.success) {
      setSession(result.session);
      setStep('profile');
      setSuccessMsg('Authentication successful! Welcome to JioTV.');
      setOtp('');
    } else {
      setErrorMsg(result.message);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    setSession(null);
    setStep('phone');
    setMobileNumber('');
    setOtp('');
    setErrorMsg('');
    setSuccessMsg('You have been signed out.');
  };

  const maskedNumber = session?.mobile 
    ? `+91 ${session.mobile.slice(0, 2)}•••• ••${session.mobile.slice(-2)}`
    : '';

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
              {step === 'profile' ? 'JioTV Subscriber Account' : 'Sign In with Jio'}
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

        {/* Step 1: Mobile Number Input */}
        {step === 'phone' && (
          <form onSubmit={handleRequestOtp} className="jio-auth-form">
            <p className="jio-auth-desc">
              Enter your registered Jio mobile number to access live broadcasts, synchronized catch-up, and account preferences.
            </p>

            <div className="jio-input-group">
              <label htmlFor="jio-mobile-input" className="jio-input-label">
                Jio Mobile Number
              </label>
              <div className="jio-phone-wrapper">
                <span className="jio-country-code">+91</span>
                <input
                  id="jio-mobile-input"
                  ref={phoneInputRef}
                  type="tel"
                  className="jio-phone-input"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setMobileNumber(val);
                    if (errorMsg) setErrorMsg('');
                  }}
                  disabled={isLoading}
                  autoComplete="tel-national"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="jio-btn-primary"
              disabled={isLoading || mobileNumber.replace(/\D/g, '').length !== 10}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="spin-icon" aria-hidden="true" />
                  <span>Requesting OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="jio-auth-form">
            <p className="jio-auth-desc">
              Enter the 6-digit one-time password sent to <strong className="jio-highlight-number">+91 {mobileNumber}</strong>.
              <button
                type="button"
                className="jio-btn-inline-change"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setErrorMsg('');
                }}
              >
                Change
              </button>
            </p>

            <div className="jio-input-group">
              <label htmlFor="jio-otp-input" className="jio-input-label">
                Verification Code (OTP)
              </label>
              <div className="jio-otp-wrapper">
                <KeyRound size={16} className="jio-field-icon" aria-hidden="true" />
                <input
                  id="jio-otp-input"
                  ref={otpInputRef}
                  type="text"
                  className="jio-otp-input"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.trim());
                    if (errorMsg) setErrorMsg('');
                  }}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                  required
                />
              </div>
            </div>

            <div className="jio-resend-row">
              {resendTimer > 0 ? (
                <span className="jio-timer-text">Resend code in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  className="jio-resend-btn"
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="jio-btn-primary"
              disabled={isLoading || otp.trim().length < 4}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="spin-icon" aria-hidden="true" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify &amp; Sign In</span>
                  <ShieldCheck size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 3: Authenticated Profile Details */}
        {step === 'profile' && session && (
          <div className="jio-profile-content">
            <div className="jio-profile-badge-card">
              <div className="jio-profile-avatar">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div className="jio-profile-info">
                <div className="jio-profile-title-row">
                  <span className="jio-profile-name">{session.commonName || 'Jio Subscriber'}</span>
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
                <span className="jio-meta-label">Session Status</span>
                <span className="jio-meta-val">Verified SSO Token</span>
              </div>
              <div className="jio-meta-row">
                <span className="jio-meta-label">Local Token Storage</span>
                <span className="jio-meta-val">localStorage (Encrypted Session)</span>
              </div>
              <div className="jio-meta-row">
                <span className="jio-meta-label">Broadcast Tier</span>
                <span className="jio-meta-val">JioTV HD &amp; Catch-up Unlimited</span>
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
      </div>
    </div>
  );
}
