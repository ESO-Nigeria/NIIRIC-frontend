/**
 * Storage utility
 */
"use client";

export type StorageType = {
	get: <T = any>(key: string) => T | null;
	set: <T = any>(key: string, value: T) => void;
	remove: (key: string) => void;
};

const Storage: StorageType = {
	get<T = any>(key: string): T | null {
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		} catch (e) {
			console.error(`Error getting key "${key}" from localStorage:`, e);
			return null;
		}
	},

	set<T = any>(key: string, value: T): void {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.error(`Error setting key "${key}" in localStorage:`, e);
		}
	},

	remove(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (e) {
			console.error(`Error removing key "${key}" from localStorage:`, e);
		}
	},
};

export default Storage;
