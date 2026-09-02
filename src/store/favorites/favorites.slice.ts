import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const selectFavoriteProducts = (state: RootState): Product[] =>
	Object.values(state.favorites.items)

export default favoritesSlice.reducer
