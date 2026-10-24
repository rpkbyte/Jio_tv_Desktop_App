import assert from 'node:assert/strict';
import { StreamingProvider } from '../services/streaming/StreamingProvider.js';
import { AuthorizedSampleStreamProvider, AUTHORIZED_TEST_STREAMS } from '../services/streaming/AuthorizedSampleStreamProvider.js';
import { JioTVStreamProvider } from '../services/streaming/JioTVStreamProvider.js';

console.log('🧪 Starting Streaming Provider & DRM Architecture Test Suite...\n');

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
// Test 1: Abstract StreamingProvider Integrity
// -------------------------------------------------------------
test('StreamingProvider prevents direct instantiation and returns base capabilities', () => {
  assert.throws(
    () => new StreamingProvider('test', 'Test'),
    /Cannot construct StreamingProvider instances directly/
  );
});

// -------------------------------------------------------------
// Test 2: Format Detection (HLS, DASH, MP4)
// -------------------------------------------------------------
test('AuthorizedSampleStreamProvider detects video container formats correctly', () => {
  const provider = new AuthorizedSampleStreamProvider();
  assert.strictEqual(provider.detectFormat('https://cdn.example.com/master.m3u8?token=123'), 'hls');
  assert.strictEqual(provider.detectFormat('https://cdn.example.com/manifest.mpd'), 'dash');
  assert.strictEqual(provider.detectFormat('https://cdn.example.com/trailer.mp4'), 'mp4');
  assert.strictEqual(provider.detectFormat(null), 'unknown');
});

// -------------------------------------------------------------
// Test 3: Authorized Sample Stream Resolution
// -------------------------------------------------------------
test('AuthorizedSampleStreamProvider resolves channel and custom test streams', async () => {
  const provider = new AuthorizedSampleStreamProvider();

  // Invalid channel
  const invalidRes = await provider.resolveStream(null);
  assert.strictEqual(invalidRes.success, false);
  assert.strictEqual(invalidRes.errorCode, 'INVALID_CHANNEL');

  // Channel with existing streamUrl
  const sampleChannel = {
    id: 'ch-144',
    name: 'Colors HD',
    streamUrl: AUTHORIZED_TEST_STREAMS.hlsLive
  };
  const channelRes = await provider.resolveStream(sampleChannel);
  assert.strictEqual(channelRes.success, true);
  assert.strictEqual(channelRes.streamUrl, AUTHORIZED_TEST_STREAMS.hlsLive);
  assert.strictEqual(channelRes.format, 'hls');

  // Custom user test stream
  provider.setCustomStreamUrl('http://127.0.0.1:8080/my-test-stream.m3u8');
  const customRes = await provider.resolveStream(sampleChannel);
  assert.strictEqual(customRes.success, true);
  assert.strictEqual(customRes.streamUrl, 'http://127.0.0.1:8080/my-test-stream.m3u8');
});

// -------------------------------------------------------------
// Test 4: JioTV Production Provider DRM & Entitlement Reporting
// -------------------------------------------------------------
test('JioTVStreamProvider requires authenticated subscriber and reports DRM blocker', async () => {
  const provider = new JioTVStreamProvider();

  const channel = { id: 'ch-144', name: 'Colors HD', streamUrl: 'https://jio.live/144.m3u8' };

  // 1. Unauthenticated request
  const unauthRes = await provider.resolveStream(channel, null);
  assert.strictEqual(unauthRes.success, false);
  assert.strictEqual(unauthRes.errorCode, 'AUTHENTICATION_REQUIRED');

  // 2. Authenticated, but Widevine DRM license server not configured
  const authSession = { subscriberId: 'SUB_101', isAuthenticated: true };
  const drmRes = await provider.resolveStream(channel, authSession);

  assert.strictEqual(drmRes.success, false);
  assert.strictEqual(drmRes.isDrm, true);
  assert.strictEqual(drmRes.errorCode, 'DRM_LICENSE_UNCONFIGURED');
  assert.ok(drmRes.message.includes('Bypassing DRM is strictly prohibited'));

  // Verify DRM documentation is cleanly exposed
  assert.ok(drmRes.documentation);
  assert.strictEqual(drmRes.documentation.keySystem, 'com.widevine.alpha');
  assert.ok(Array.isArray(drmRes.documentation.emeWorkflow));
});

console.log(`\n🎉 Results: ${passedTests} / ${totalTests} tests passed.\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
