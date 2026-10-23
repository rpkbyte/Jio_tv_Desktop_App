import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cssPath = path.resolve(__dirname, '../index.css');
const playerPath = path.resolve(__dirname, '../components/Player.jsx');
const appPath = path.resolve(__dirname, '../App.jsx');

console.log('🧪 Starting Video Player UI/UX & Fullscreen Test Suite...\n');

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
// Test 1: Fullscreen CSS Architecture
// -------------------------------------------------------------
test('CSS includes standard & vendor-prefixed fullscreen rules for video player', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');

  assert.ok(
    css.includes(':fullscreen.player-container'),
    'Must define standard :fullscreen.player-container'
  );
  assert.ok(
    css.includes(':-webkit-full-screen.player-container'),
    'Must define :-webkit-full-screen.player-container for WebKit/Edge'
  );
  assert.ok(
    css.includes('.player-container.is-fullscreen'),
    'Must define .player-container.is-fullscreen fallback class'
  );
});

// -------------------------------------------------------------
// Test 2: Video Wrapper Uncapped in Fullscreen
// -------------------------------------------------------------
test('Video wrapper removes max-height cap in fullscreen', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');

  assert.ok(
    css.includes('aspect-ratio: auto !important;'),
    'Video wrapper must set aspect-ratio: auto in fullscreen'
  );
  assert.ok(
    css.includes('max-height: 100vh !important;') || css.includes('max-height: none'),
    'Video wrapper must expand to 100vh in fullscreen'
  );
});

// -------------------------------------------------------------
// Test 3: Cursor Auto-Hide
// -------------------------------------------------------------
test('Cursor auto-hide class exists for idle playback in fullscreen', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');

  assert.ok(
    css.includes('.player-container.hide-cursor'),
    'Must include .player-container.hide-cursor'
  );
  assert.ok(
    css.includes('cursor: none !important;'),
    'Cursor must be set to none when hide-cursor class is active'
  );
});

// -------------------------------------------------------------
// Test 4: Live Badge & Animations
// -------------------------------------------------------------
test('Live badge button and animations are defined', () => {
  const css = fs.readFileSync(cssPath, 'utf-8');

  assert.ok(css.includes('.live-badge-btn'), 'Must include .live-badge-btn');
  assert.ok(css.includes('.live-pulse'), 'Must include .live-pulse');
  assert.ok(css.includes('@keyframes pulse-dot'), 'Must include @keyframes pulse-dot');
  assert.ok(css.includes('.spin-animation'), 'Must include .spin-animation');
});

// -------------------------------------------------------------
// Test 5: Fullscreen Event Listeners in Player.jsx
// -------------------------------------------------------------
test('Player.jsx attaches fullscreenchange listeners and handles idle timer', () => {
  const player = fs.readFileSync(playerPath, 'utf-8');

  assert.ok(
    player.includes("document.addEventListener('fullscreenchange'"),
    'Player.jsx must listen to fullscreenchange event'
  );
  assert.ok(
    player.includes("document.addEventListener('webkitfullscreenchange'"),
    'Player.jsx must listen to webkitfullscreenchange event'
  );
  assert.ok(
    player.includes('resetControlsTimeout'),
    'Player.jsx must implement idle auto-hide timer'
  );
  assert.ok(
    player.includes('handleVideoClick'),
    'Player.jsx must support double-click to fullscreen and single-click to play'
  );
  assert.ok(
    player.includes('{children}'),
    'Player.jsx must render children for ChannelZapper support in fullscreen'
  );
});

// -------------------------------------------------------------
// Test 6: App.jsx Nests ChannelZapper inside Player
// -------------------------------------------------------------
test('App.jsx nests ChannelZapper inside Player', () => {
  const app = fs.readFileSync(appPath, 'utf-8');

  assert.ok(
    app.includes('<Player') && app.includes('</Player>'),
    'Player in App.jsx must wrap ChannelZapper as children'
  );
});

console.log(`\n🎉 Results: ${passedTests} / ${totalTests} tests passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
}
