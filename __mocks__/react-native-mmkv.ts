const memoryStore = new Map<string, string>()

export const createMMKV = () => ({
	set: (key: string, value: string): void => {
		memoryStore.set(key, String(value))
	},
	getString: (key: string): string | undefined => memoryStore.get(key),
	delete: (key: string): void => {
		memoryStore.delete(key)
	},
	clearAll: (): void => {
		memoryStore.clear()
	},
	contains: (key: string): boolean => memoryStore.has(key)
})
