import { Product } from '../../domain'

export interface FavoritesState {
	items: Record<number, Product>
}
