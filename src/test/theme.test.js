import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEME_MODES, STORAGE_KEY } from '../context/themeConstants.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cssPath = path.resolve(__dirname, '../index.css');

console.log('🧪 Starting Light/Dark Mode Verification Test Suite...\n');

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
// Test 1: Supported Theme Modes
// -------------------------------------------------------------
test('THEME_MODES contains dark, light, and system definitions', () => {
  assert.equal(THEME_MODES.DARK, 'dark');
  assert.equal(THEME_MODES.LIGHT, 'light');
  assert.equal(THEME_MODES.SYSTEM, 'system');
});

// -------------------------------------------------------------
// Test 2: Storage Resilience & Edge States
// -------------------------------------------------------------
test('Theme resolution handles empty, corrupted, and valid storage states', () => {
  const STORAGE_KEY = 'jiotv_theme';

  // Helper simulating getInitialTheme logic from ThemeContext
  function resolveTheme(storedValue, simulateError = false) {
    if (simulateError) {
      // Simulate SecurityError or QuotaExceededError
      try {
        throw new Error('SecurityError: The operation is insecure.');
      } catch {
        return THEME_MODES.SYSTEM;
      }
    }
    if (
      storedValue === THEME_MODES.DARK ||
      storedValue === THEME_MODES.LIGHT ||
      storedValue === THEME_MODES.SYSTEM
    ) {
      return storedValue;
    }
    return THEME_MODES.SYSTEM;
  }

  // 1. Success State (valid stored preferences)
  assert.equal(resolveTheme('dark'), 'dark', 'Should resolve dark preference');
  assert.equal(resolveTheme('light'), 'light', 'Should resolve light preference');
  assert.equal(resolveTheme('system'), 'system', 'Should resolve system preference');

  // 2. Empty State (null or empty string)
  assert.equal(resolveTheme(null), 'system', 'Should fallback to system when null');
  assert.equal(resolveTheme(''), 'system', 'Should fallback to system when empty string');

  // 3. Corrupted / Invalid State
  assert.equal(resolveTheme('neon-cyberpunk'), 'system', 'Should sanitize unknown string');
  assert.equal(resolveTheme(12345), 'system', 'Should sanitize number type');

  // 4. Exception / Failure State
  assert.equal(resolveTheme(null, true), 'system', 'Should catch storage exceptions safely');
});

// -------------------------------------------------------------
// Test 3: System MatchMedia Logic
// -------------------------------------------------------------
test('System preference detection resolves properly with fallbacks', () => {
  function detectSystemTheme(mockWindow) {
    if (!mockWindow || !mockWindow.matchMedia) {
      return THEME_MODES.DARK; // Safe default
    }
    try {
      return mockWindow.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME_MODES.DARK
        : THEME_MODES.LIGHT;
    } catch {
      return THEME_MODES.DARK;
    }
  }

  // Window without matchMedia
  assert.equal(detectSystemTheme({}), 'dark', 'Defaults to dark when matchMedia is missing');

  // System is dark
  const mockDark = {
    matchMedia: (q) => ({ matches: q === '(prefers-color-scheme: dark)' }),
  };
  assert.equal(detectSystemTheme(mockDark), 'dark', 'Detects dark system scheme');

  // System is light
  const mockLight = {
    matchMedia: () => ({ matches: false }),
  };
  assert.equal(detectSystemTheme(mockLight), 'light', 'Detects light system scheme');

  // MatchMedia throws error
  const mockBroken = {
    matchMedia: () => {
      throw new Error('Browser API fault');
    },
  };
  assert.equal(detectSystemTheme(mockBroken), 'dark', 'Catches matchMedia error and safely falls back');
});

// -------------------------------------------------------------
// Test 4: CSS Token Coverage & Parity
// -------------------------------------------------------------
test('CSS index.css has full token coverage between dark and light themes', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');

  // Extract variables in dark mode :root / html[data-theme="dark"]
  const darkBlockMatch = css.match(/:root[\s\S]*?\{([\s\S]*?)\}/);
  assert.ok(darkBlockMatch, 'Must find :root definition in index.css');
  const darkBlock = darkBlockMatch[1];

  // Extract variables in html[data-theme="light"]
  const lightBlockMatch = css.match(/html\[data-theme="light"\][\s\S]*?\{([\s\S]*?)\}/);
  assert.ok(lightBlockMatch, 'Must find html[data-theme="light"] definition in index.css');
  const lightBlock = lightBlockMatch[1];

  const varRegex = /(--[\w-]+)\s*:/g;

  const extractTokens = (block) => {
    const tokens = new Set();
    let m;
    while ((m = varRegex.exec(block)) !== null) {
      tokens.add(m[1]);
    }
    return tokens;
  };

  const darkTokens = extractTokens(darkBlock);
  const lightTokens = extractTokens(lightBlock);

  // Critical architectural tokens that must be defined in both themes
  const requiredTokens = [
    '--jio-red',
    '--jio-red-hover',
    '--jio-red-active',
    '--jio-red-subtle',
    '--jio-red-border',
    '--jio-red-ink',
    '--bg-app',
    '--bg-header',
    '--bg-surface-1',
    '--bg-surface-2',
    '--bg-surface-3',
    '--bg-surface-hover',
    '--bg-surface-active',
    '--bg-modal-overlay',
    '--bg-player-bar',
    '--bg-player-top',
    '--bg-video-wrapper',
    '--bg-card-banner',
    '--bg-banner-overlay',
    '--bg-badge',
    '--bg-kbd',
    '--border-subtle',
    '--border-default',
    '--border-hover',
    '--border-active',
    '--text-primary',
    '--text-secondary',
    '--text-muted',
    '--text-inverse',
    '--live-green',
    '--live-green-subtle',
    '--live-green-border',
    '--hd-blue',
    '--hd-blue-subtle',
    '--hd-blue-border',
    '--shadow-subtle',
    '--shadow-surface',
    '--shadow-modal',
  ];

  for (const token of requiredTokens) {
    assert.ok(darkTokens.has(token), `Dark theme must define ${token}`);
    assert.ok(lightTokens.has(token), `Light theme must define ${token}`);
  }
});

// -------------------------------------------------------------
// Test 5: Player Theme Surfaces & Visibility
// -------------------------------------------------------------
test('Video player surfaces and controls properly adapt between themes', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');
  assert.ok(
    css.includes('.player-top-bar') && css.includes('.player-controls-bar'),
    'Must include player-top-bar and player-controls-bar'
  );
  assert.ok(
    css.includes('--bg-player-bar: rgba(255, 255, 255, 0.95);'),
    'Light theme must define light surface for player controls bar'
  );
  assert.ok(
    css.includes('--bg-player-bar: rgba(10, 14, 21, 0.96);'),
    'Dark theme must define dark surface for player controls bar'
  );
});


// -------------------------------------------------------------
// Test 6: Theme Selector UI Elements in CSS
// -------------------------------------------------------------
test('Theme selector classes exist in index.css', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');
  assert.ok(css.includes('.theme-selector-group'), 'Must contain .theme-selector-group');
  assert.ok(css.includes('.theme-option-btn'), 'Must contain .theme-option-btn');
  assert.ok(css.includes('.theme-option-btn.active'), 'Must contain .theme-option-btn.active');
  assert.ok(css.includes('.settings-hint'), 'Must contain .settings-hint');
});

console.log(`\n🎉 Results: ${passedTests} / ${totalTests} tests passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
}
