import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../domain'
import type { RootState } from '../index'
import { FavoritesState } from './favorites.slice.types'

const initialState: FavoritesState = { items: {} }

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<Product>): void => {
			const product = action.payload
			if (state.items[product.id]) {
				delete state.items[product.id]
			} else {
				state.items[product.id] = product
			}
		},
		removeFavorite: (state, action: PayloadAction<number>): void => {
			delete state.items[action.payload]
		}
	}
})

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions

export const selectIsFavorite =
	(productId: number) =>
	(state: RootState): boolean =>
		Boolean(state.favorites.items[productId])

const selectFavoriteItems = (state: RootState): Record<number, Product> =>
	state.favorites.items

// Memoized: Object.values(...) allocates a brand new array on every call, even
// when `items` hasn't actually changed. Without createSelector, useSelector
// sees a different reference on every unrelated store update (e.g. RTK Query
// cache updates from other screens) and re-renders anything reading this
// selector — that's exactly the "returned a different result" dev warning.
export const selectFavoriteProducts = createSelector(
	[selectFavoriteItems],
	(items): Product[] => Object.values(items)
)

export default favoritesSlice.reducer
