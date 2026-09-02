import { Keys, storage } from './mmkv'
import { Product } from '../domain'

export const writeFavoritesToStorage = (favorites: Product[]) => {
	storage.set(Keys.FAVORITES, JSON.stringify(favorites))
}
