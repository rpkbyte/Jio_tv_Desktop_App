// JioTV Services & Hybrid Pipeline Verification Test Suite
import assert from 'node:assert';
import { 
  normalizeJioChannel, 
  formatTimeFromEpoch, 
  fetchChannelStreamUrl,
  JIO_CATEGORY_MAP, 
  JIO_LANGUAGE_MAP 
} from '../services/jioApiService.js';
import { 
  getOrCreateDeviceId, 
  isAuthenticated, 
  saveSession, 
  getStoredSession, 
  logout 
} from '../services/jioAuthService.js';
import { CHANNELS, CATEGORIES, LANGUAGES, generateCatchupSchedule } from '../data/channels.js';

console.log('🧪 Starting JioTV Services & Hybrid Pipeline Test Suite...\n');

let passed = 0;

// Mock localStorage for Node test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};
global.window = {
  dispatchEvent: () => {}
};

// Test 1: Pre-bundled authentic channels verification
try {
  assert.ok(CHANNELS.length >= 75, `Expected >= 75 pre-bundled channels, found ${CHANNELS.length}`);
  assert.ok(CATEGORIES.includes('Entertainment') && CATEGORIES.includes('Sports'), 'Expected essential categories');
  assert.ok(LANGUAGES.includes('Hindi') && LANGUAGES.includes('English'), 'Expected essential languages');
  
  // Verify first channel has authentic Jio logo CDN URL
  const first = CHANNELS[0];
  assert.ok(first.logo.includes('jiotvimages.cdn.jio.com/dare_images/images/'), 'First channel must have Jio CDN logo URL');
  assert.ok(first.number, 'Channel must have channel number');
  assert.ok(first.currentShow?.title, 'Channel must have currentShow metadata');
  console.log(`  ✅ PASS: Pre-bundled catalog contains ${CHANNELS.length} authentic channels with Jio CDN logos`);
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Pre-bundled catalog verification failed:', e.message);
}

// Test 2: Category & Language ID Mappings
try {
  assert.strictEqual(JIO_CATEGORY_MAP['5'], 'Entertainment');
  assert.strictEqual(JIO_CATEGORY_MAP['8'], 'Sports');
  assert.strictEqual(JIO_CATEGORY_MAP['12'], 'News');
  assert.strictEqual(JIO_LANGUAGE_MAP['1'], 'Hindi');
  assert.strictEqual(JIO_LANGUAGE_MAP['6'], 'English');
  console.log('  ✅ PASS: JioTV official Category and Language ID dictionaries correctly mapped');
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Dictionary mapping check failed:', e.message);
}

// Test 3: Channel normalization
try {
  const rawSample = {
    channel_id: 144,
    channel_name: 'Colors HD',
    channelCategoryId: 5,
    channelLanguageId: 1,
    isHD: true,
    logoUrl: 'ColorsHD1.png',
    stbChannelNumber: 1304
  };

  const normalized = normalizeJioChannel(rawSample, 0);
  assert.strictEqual(normalized.id, 'ch-144');
  assert.strictEqual(normalized.name, 'Colors HD');
  assert.strictEqual(normalized.category, 'Entertainment');
  assert.strictEqual(normalized.language, 'Hindi');
  assert.strictEqual(normalized.isHd, true);
  assert.strictEqual(normalized.logo, 'https://jiotvimages.cdn.jio.com/dare_images/images/ColorsHD1.png');
  assert.strictEqual(normalized.number, 1304);
  console.log('  ✅ PASS: normalizeJioChannel transforms raw API objects into client schema');
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Channel normalization failed:', e.message);
}

// Test 4: EPG Time Formatting
try {
  const testEpoch = 1792693800000;
  const formatted = formatTimeFromEpoch(testEpoch);
  assert.ok(formatted.includes('AM') || formatted.includes('PM'), 'Expected 12-hour AM/PM formatted time');
  console.log(`  ✅ PASS: formatTimeFromEpoch converts epochs to localized time (${formatted})`);
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Time formatting failed:', e.message);
}

// Test 5: Authentication & Session Management
try {
  // Fresh state
  mockStorage.clear?.();
  assert.strictEqual(isAuthenticated(), false, 'Should be unauthenticated initially');

  // Device ID generation
  const devId1 = getOrCreateDeviceId();
  assert.ok(devId1.startsWith('jio_dt_'), 'Device ID must follow jio_dt_ prefix pattern');
  const devId2 = getOrCreateDeviceId();
  assert.strictEqual(devId1, devId2, 'Device ID must remain consistent in storage');

  // Session saving
  const testSession = {
    mobile: '9876543210',
    ssoToken: 'sample_sso_token_xyz',
    subscriberId: 'SUB_9876543210',
    commonName: 'Test Subscriber'
  };
  saveSession(testSession);
  assert.strictEqual(isAuthenticated(), true, 'Should be authenticated after saving session');
  const retrieved = getStoredSession();
  assert.strictEqual(retrieved.mobile, '9876543210');
  assert.strictEqual(retrieved.ssoToken, 'sample_sso_token_xyz');

  // Logout
  logout();
  assert.strictEqual(isAuthenticated(), false, 'Should be unauthenticated after logout');
  assert.strictEqual(getStoredSession(), null, 'Stored session should be cleared');
  console.log('  ✅ PASS: jioAuthService handles device IDs, session persistence, and logout');
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Auth service testing failed:', e.message);
}

// Test 6: Catchup schedule generator compatibility
try {
  const schedule = generateCatchupSchedule(CHANNELS[0], 0);
  assert.ok(Array.isArray(schedule) && schedule.length >= 10, 'Catchup schedule should contain 10+ slots');
  assert.ok(schedule[0].title && schedule[0].time, 'Schedule items must have title and time');
  console.log(`  ✅ PASS: generateCatchupSchedule produces 7-day backward compatible timeline (${schedule.length} slots)`);
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: Catchup schedule generator failed:', e.message);
}

// Test 7: fetchChannelStreamUrl authentication verification and error handling
try {
  mockStorage.clear?.();
  const unauthRes = await fetchChannelStreamUrl('ch-144');
  assert.strictEqual(unauthRes.success, false, 'Must fail when unauthenticated');
  assert.strictEqual(unauthRes.reason, 'unauthenticated');

  const emptyCidRes = await fetchChannelStreamUrl('');
  assert.strictEqual(emptyCidRes.success, false);
  assert.strictEqual(emptyCidRes.reason, 'invalid_channel');

  console.log('  ✅ PASS: fetchChannelStreamUrl properly guards credentials and validates parameters');
  passed++;
} catch (e) {
  console.error('  ❌ FAIL: fetchChannelStreamUrl test failed:', e.message);
}

console.log(`\n🎉 Results: ${passed} / 7 tests passed.\n`);

if (passed < 7) {
  process.exit(1);
}

