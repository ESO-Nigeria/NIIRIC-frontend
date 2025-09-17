/**
 * Storage utility (SSR safe)
 */
"use client";

export type StorageType = {
  get: <T = any>(key: string) => T | null;
  set: <T = any>(key: string, value: T) => void;
  remove: (key: string) => void;
};

const isBrowser = typeof window !== "undefined";

const Storage: StorageType = {
  get<T = any>(key: string): T | null {
    if (!isBrowser) return null; // SSR-safe
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      console.error(`Error getting key "${key}" from localStorage:`, e);
      return null;
    }
  },

  set<T = any>(key: string, value: T): void {
    if (!isBrowser) return; // SSR-safe
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting key "${key}" in localStorage:`, e);
    }
  },

  remove(key: string): void {
    if (!isBrowser) return; // SSR-safe
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing key "${key}" from localStorage:`, e);
    }
  },
};

export default Storage;
