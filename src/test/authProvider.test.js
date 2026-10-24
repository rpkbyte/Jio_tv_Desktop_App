import assert from 'node:assert/strict';
import { AuthProvider } from '../services/auth/AuthProvider.js';
import { UnconfiguredJioAuthProvider } from '../services/auth/UnconfiguredJioAuthProvider.js';
import { AuthorizedLocalDevAuthProvider } from '../services/auth/AuthorizedLocalDevAuthProvider.js';

console.log('🧪 Starting Authentication Provider Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// Test 1: Abstract AuthProvider Class Integrity
// -------------------------------------------------------------
test('AuthProvider prevents direct instantiation and defines interface', () => {
  assert.throws(
    () => new AuthProvider('test', 'Test Provider'),
    /Cannot construct AuthProvider instances directly/,
    'Should not allow direct instantiation'
  );
});

// -------------------------------------------------------------
// Test 2: Unconfigured Provider Compliance & Blocker Messaging
// -------------------------------------------------------------
test('UnconfiguredJioAuthProvider reports unconfigured state and explains blocker', async () => {
  const provider = new UnconfiguredJioAuthProvider();
  assert.strictEqual(provider.id, 'jiotv-official');
  assert.strictEqual(provider.isConfigured, false, 'Provider must be unconfigured without official SDK');
  assert.ok(
    provider.configurationBlocker.includes('authorized OAuth 2.0 / OIDC'),
    'Must explain requirement for authorized identity provider'
  );

  const session = await provider.getSession();
  assert.strictEqual(session, null, 'Unconfigured provider must return null session');

  const loginRes = await provider.login();
  assert.strictEqual(loginRes.success, false);
  assert.strictEqual(loginRes.errorCode, 'PROVIDER_UNCONFIGURED');
  assert.ok(loginRes.message.includes('regulatory compliance'));
});

// -------------------------------------------------------------
// Test 3: Authorized Local Testing Provider Lifecycle
// -------------------------------------------------------------
test('AuthorizedLocalDevAuthProvider authenticates test subscriber and sanitizes profile', async () => {
  const provider = new AuthorizedLocalDevAuthProvider();
  assert.strictEqual(provider.isConfigured, true);

  const initialSession = await provider.getSession();
  assert.strictEqual(initialSession, null);

  const loginRes = await provider.login({
    subscriberId: 'TEST_SUB_442',
    mobile: '9812345678'
  });

  assert.strictEqual(loginRes.success, true);
  assert.ok(loginRes.profile);
  assert.strictEqual(loginRes.profile.subscriberId, 'TEST_SUB_442');
  assert.strictEqual(loginRes.profile.maskedMobile, '+91 98•••• ••78');
  assert.strictEqual(loginRes.profile.isAuthenticated, true);

  // Check active session retrieval
  const activeSession = await provider.getSession();
  assert.ok(activeSession);
  assert.strictEqual(activeSession.subscriberId, 'TEST_SUB_442');
});

// -------------------------------------------------------------
// Test 4: Login Cancellation & Network Fault Handling
// -------------------------------------------------------------
test('AuthorizedLocalDevAuthProvider handles cancellation and network errors', async () => {
  const provider = new AuthorizedLocalDevAuthProvider();

  // Test cancellation
  const cancelRes = await provider.login({ cancelled: true });
  assert.strictEqual(cancelRes.success, false);
  assert.strictEqual(cancelRes.errorCode, 'USER_CANCELLED');
  assert.ok(cancelRes.message.includes('cancelled'));

  // Test network failure
  const netRes = await provider.login({ simulateNetworkError: true });
  assert.strictEqual(netRes.success, false);
  assert.strictEqual(netRes.errorCode, 'NETWORK_ERROR');
  assert.ok(netRes.message.includes('failed'));
});

// -------------------------------------------------------------
// Test 5: Session Expiry & Logout
// -------------------------------------------------------------
test('AuthorizedLocalDevAuthProvider handles session expiry and explicit logout', async () => {
  const expiredSession = {
    subscriberId: 'EXPIRED_SUB',
    isAuthenticated: true,
    expiresAt: Date.now() - 5000 // Expired 5 seconds ago
  };

  const provider = new AuthorizedLocalDevAuthProvider({ initialSession: expiredSession });
  const session = await provider.getSession();
  assert.strictEqual(session, null, 'Expired session must resolve to null');

  // Login fresh session
  await provider.login({ subscriberId: 'ACTIVE_SUB' });
  const active = await provider.getSession();
  assert.strictEqual(active.subscriberId, 'ACTIVE_SUB');

  // Explicit logout
  await provider.logout();
  const afterLogout = await provider.getSession();
  assert.strictEqual(afterLogout, null, 'Session must be null after logout');
});

console.log(`\n🎉 Results: ${passedTests} / ${totalTests} tests passed.\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
