import Storage from "@/lib/storage";

const createNoopStorage = () => ({
	getItem(_key: string): string | null {
		console.log("[persistStorage] SSR getItem");
		return null;
	},
	setItem(_key: string, _value: string): void {
		console.log("[persistStorage] SSR setItem");
	},
	removeItem(_key: string): void {
		console.log("[persistStorage] SSR removeItem");
	},
});

const persistStorage =
	typeof window !== "undefined"
		? {
				getItem(key: string): string | null {
					const value = Storage.get(key);
					console.log("[persistStorage] getItem", key, value);
					return value !== null ? JSON.stringify(value) : null;
				},
				setItem(key: string, value: string): void {
					console.log("[persistStorage] setItem", key, value);
					try {
						Storage.set(key, JSON.parse(value));
					} catch {
						Storage.set(key, value);
					}
				},
				removeItem(key: string): void {
					console.log("[persistStorage] removeItem", key);
					Storage.remove(key);
				},
			}
		: createNoopStorage();

export default persistStorage;
