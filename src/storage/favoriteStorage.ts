import { Keys, storage } from './mmkv'
import { Product } from '../domain'

export const writeFavoritesToStorage = (favorites: Product[]): void => {
	storage.set(Keys.FAVORITES, JSON.stringify(favorites))
}

export const readFavoritesFromStorage = (): Product[] => {
	const raw = storage.getString(Keys.FAVORITES)
	if (!raw) return []
	try {
		return JSON.parse(raw) as Product[]
	} catch {
		return []
	}
}
