import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { THEME_MODES, STORAGE_KEY } from './themeConstants.js';

export { THEME_MODES, STORAGE_KEY };


/**
 * Safely query the system dark mode preference with fallback.
 */
function getSystemPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return THEME_MODES.DARK;
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME_MODES.DARK
      : THEME_MODES.LIGHT;
  } catch (error) {
    console.warn('ThemeContext: Failed to read system preference, defaulting to dark', error);
    return THEME_MODES.DARK;
  }
}

/**
 * Safely retrieve initial theme from localStorage with fallback and validation.
 */
function getInitialTheme() {
  if (typeof window === 'undefined') {
    return THEME_MODES.SYSTEM;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === THEME_MODES.DARK || saved === THEME_MODES.LIGHT || saved === THEME_MODES.SYSTEM) {
      return saved;
    }
  } catch (error) {
    console.warn('ThemeContext: localStorage read failure, falling back to system preference', error);
  }
  return THEME_MODES.SYSTEM;
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [systemPreference, setSystemPreference] = useState(getSystemPreference);

  // Compute effective theme (resolves 'system' to concrete 'dark' | 'light')
  const effectiveTheme = useMemo(() => {
    if (theme === THEME_MODES.SYSTEM) {
      return systemPreference;
    }
    return theme === THEME_MODES.LIGHT ? THEME_MODES.LIGHT : THEME_MODES.DARK;
  }, [theme, systemPreference]);

  // Listen to OS system color scheme changes with safe event listener cleanup
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    let mediaQuery;
    try {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    } catch {
      return;
    }

    const handleChange = (e) => {
      setSystemPreference(e.matches ? THEME_MODES.DARK : THEME_MODES.LIGHT);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Synchronize effective theme with DOM root and native color-scheme
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveTheme);
    root.style.colorScheme = effectiveTheme;
  }, [effectiveTheme]);

  // Set theme with safe persistence to localStorage
  const setTheme = useCallback((newTheme) => {
    if (
      newTheme !== THEME_MODES.DARK &&
      newTheme !== THEME_MODES.LIGHT &&
      newTheme !== THEME_MODES.SYSTEM
    ) {
      console.warn(`ThemeContext: Invalid theme mode "${newTheme}". Expected dark, light, or system.`);
      return;
    }

    setThemeState(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('ThemeContext: Failed to persist theme to localStorage', error);
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      effectiveTheme,
      setTheme,
      isDark: effectiveTheme === THEME_MODES.DARK,
    }),
    [theme, effectiveTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to access theme context with safety assertion.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
